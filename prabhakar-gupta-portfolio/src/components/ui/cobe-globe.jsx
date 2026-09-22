import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import "./cobe-globe.css";

/*
 * COBE globe wrapper (vanilla `cobe` package — no extra dependencies).
 *
 * - Auto-rotates via cobe's update() in a rAF loop; pauses when the globe is
 *   off-screen (IntersectionObserver) so it never burns GPU in the background.
 * - Drag-to-rotate: pointer events (mouse + touch + pen). Horizontal drag
 *   spins phi, vertical drag tilts theta (clamped), with gentle inertia on
 *   release that hands back to the auto-spin. Cursor switches grab/grabbing.
 * - HTML labels are synced to markers/arcs every frame using the exact same
 *   projection math cobe uses internally (toVector / projectPoint /
 *   projectArc mirror cobe's U() / O() / X() helpers), positioned in % of
 *   the canvas box — so labels stay glued to their markers at any size.
 * - Respects prefers-reduced-motion: renders one static frame, no spin.
 * - The canvas is a normal in-flow element (not absolutely positioned), so
 *   the parent container sizes to the globe — no overflow, no layout shifts.
 */

const GLOBE_RADIUS = 0.8; // cobe's internal sphere radius constant
const DEG = Math.PI / 180;

// lat/lng (degrees) -> unit vector, matching cobe's internal U() helper
const toVector = ([lat, lng]) => {
  const latR = lat * DEG;
  const lngR = lng * DEG - Math.PI;
  const cosLat = Math.cos(latR);
  return [-cosLat * Math.cos(lngR), Math.sin(latR), cosLat * Math.sin(lngR)];
};

// Screen position + front/back-face visibility of a rotated point.
// Mirrors cobe's internal O() helper exactly: rotate around Y by phi, tilt
// around X by theta, then ortho-project around radius 0.8.
const GLOBE_SCALE = 1; // keep in sync with the `scale` option passed to cobe

const projectPoint = (v, theta, phi) => {
  const ct = Math.cos(theta);
  const st = Math.sin(theta);
  const cp = Math.cos(phi);
  const sp = Math.sin(phi);
  const x = cp * v[0] + sp * v[2];
  const y = sp * st * v[0] + ct * v[1] - cp * st * v[2];
  const z = -sp * ct * v[0] + st * v[1] + cp * st * v[2];
  const visible = z >= 0 || x * x + y * y >= 0.64;
  // Flip y: cobe's projection grows upward, screen % grows downward
  return { x: x * GLOBE_SCALE, y: -y * GLOBE_SCALE, visible };
};

// Marker position: pushed above the surface by markerElevation
const projectMarker = (location, theta, phi, elevation) => {
  const v = toVector(location);
  const r = GLOBE_RADIUS + elevation;
  return projectPoint([v[0] * r, v[1] * r, v[2] * r], theta, phi);
};

// Arc apex: elevated midpoint of the quadratic-bezier arc (matches cobe's X())
const projectArc = (arc, theta, phi, elevation, arcHeight) => {
  const a = toVector(arc.from);
  const b = toVector(arc.to);
  // cobe sums (not averages) the endpoints, then scales by the elevation blend
  const mid = [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const midLen = Math.hypot(mid[0], mid[1], mid[2]);
  if (midLen < 0.001) return { x: 0, y: 0, visible: false };
  const h =
    0.25 * (GLOBE_RADIUS + elevation) +
    0.5 * ((GLOBE_RADIUS + arcHeight + elevation) / midLen);
  return projectPoint([mid[0] * h, mid[1] * h, mid[2] * h], theta, phi);
};

const CobeGlobe = ({
  markers = [],
  arcs = [],
  markerColor = [0.3, 0.45, 0.85],
  baseColor = [1, 1, 1],
  glowColor = [0.94, 0.93, 0.91],
  arcColor = [0.3, 0.45, 0.85],
  dark = 0,
  mapBrightness = 10,
  markerSize = 0.025,
  markerElevation = 0.01,
  arcWidth = 0.5,
  arcHeight = 0.3,
  rotateSpeed = 0.0026,
  className = "",
  ariaLabel = "Interactive globe showing locations around the world",
}) => {
  const canvasRef = useRef(null);
  const labelsRef = useRef(null);
  const containerRef = useRef(null);

  // Latest rotation values shared between the spin loop and drag handlers
  const rotationRef = useRef({ phi: 0, theta: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const labelsEl = labelsRef.current;
    if (!canvas || !container) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let destroyed = false;
    let globe = null;
    let width = 0;
    let height = 0;
    let spinRaf = 0;
    let onScreen = true;
    let resizeTimer = 0;
    let resizeCleanup = null;

    // Cache label DOM nodes once
    const markerEls = new Map();
    const arcEls = new Map();
    labelsEl?.querySelectorAll("[data-marker-id]").forEach((el) => {
      markerEls.set(el.dataset.markerId, el);
    });
    labelsEl?.querySelectorAll("[data-arc-id]").forEach((el) => {
      arcEls.set(el.dataset.arcId, el);
    });

    const place = (el, x, y, visible) => {
      el.style.left = `${(0.5 + x * 0.5) * 100}%`;
      el.style.top = `${(0.5 + y * 0.5) * 100}%`;
      el.style.opacity = visible ? "1" : "0";
      el.style.visibility = visible ? "visible" : "hidden";
    };

    const paintLabels = (theta, phi) => {
      if (!labelsEl) return;
      markerEls.forEach((el, id) => {
        const marker = markers.find((m) => m.id === id);
        if (!marker) return;
        const p = projectMarker(marker.location, theta, phi, markerElevation);
        place(el, p.x, p.y, p.visible);
      });
      arcEls.forEach((el, id) => {
        const arc = arcs.find((a) => a.id === id);
        if (!arc) return;
        const p = projectArc(arc, theta, phi, markerElevation, arcHeight);
        place(el, p.x, p.y, p.visible);
      });
    };

    // Initial rotation that faces India (the "home" marker) to the viewer
    const PHI_START = 3.37;
    const THETA = 0.24; // slight downward tilt; shared by paintLabels + globe

    rotationRef.current.phi = PHI_START;
    rotationRef.current.theta = THETA;

    // Single place where rotation is pushed to the canvas + labels
    const applyRotation = (phi, theta) => {
      globe?.update({ phi, theta });
      paintLabels(theta, phi);
    };

    // ── Drag-to-rotate (pointer events: mouse + touch + pen) ────────────
    const PHI_PER_PX = 0.005; // rad per px ≈ 2× the auto-spin speed per frame
    const THETA_PER_PX = 0.003;
    const THETA_LIMIT = 1.1; // clamp so the globe can't flip over the poles

    const drag = { active: false, pointerId: null, lastX: 0, lastY: 0, vx: 0, vy: 0 };
    let inertiaRaf = 0;

    const startAutoSpin = () => {
      if (reduceMotion || drag.active || spinRaf) return;
      const spin = () => {
        if (destroyed || drag.active) return;
        if (onScreen) {
          const r = rotationRef.current;
          r.phi += rotateSpeed;
          applyRotation(r.phi, r.theta);
        }
        spinRaf = requestAnimationFrame(spin);
      };
      spinRaf = requestAnimationFrame(spin);
    };

    const onPointerDown = (e) => {
      if (drag.active || e.button > 0) return; // primary button / touch only
      drag.active = true;
      drag.pointerId = e.pointerId;
      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      drag.vx = 0;
      drag.vy = 0;
      cancelAnimationFrame(inertiaRaf); // stop any release glide
      inertiaRaf = 0;
      cancelAnimationFrame(spinRaf); // pause auto-spin while dragging
      spinRaf = 0;
      container.classList.add("is-dragging");
      try {
        // Keep move/up events flowing even when the pointer leaves the element
        container.setPointerCapture(e.pointerId);
      } catch {
        /* pointer capture unsupported — drag still works inside the element */
      }
    };

    const onPointerMove = (e) => {
      if (!drag.active || e.pointerId !== drag.pointerId) return;
      const dx = e.clientX - drag.lastX;
      const dy = e.clientY - drag.lastY;
      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      const r = rotationRef.current;
      r.phi += dx * PHI_PER_PX;
      r.theta = Math.max(-THETA_LIMIT, Math.min(THETA_LIMIT, r.theta - dy * THETA_PER_PX));
      drag.vx = dx;
      drag.vy = dy;
      applyRotation(r.phi, r.theta);
    };

    const endDrag = () => {
      if (!drag.active) return;
      drag.active = false;
      drag.pointerId = null;
      container.classList.remove("is-dragging");
      if (reduceMotion) return; // static globe: no glide, no auto-spin
      // Gentle inertia glide that decays into the regular auto-spin
      const vx0 = drag.vx * PHI_PER_PX;
      const vy0 = drag.vy * THETA_PER_PX;
      if (Math.abs(vx0) < 0.0001 && Math.abs(vy0) < 0.0001) {
        startAutoSpin(); // plain click/tap — just resume the auto-spin
        return;
      }
      let vx = vx0;
      let vy = vy0;
      const glide = () => {
        if (destroyed || drag.active) return;
        const r = rotationRef.current;
        r.phi += vx;
        r.theta = Math.max(-THETA_LIMIT, Math.min(THETA_LIMIT, r.theta - vy));
        vx *= 0.94; // exponential decay
        vy *= 0.94;
        applyRotation(r.phi, r.theta);
        if (Math.abs(vx) > 0.0001 || Math.abs(vy) > 0.0001) {
          inertiaRaf = requestAnimationFrame(glide);
        } else {
          inertiaRaf = 0;
          startAutoSpin(); // hand back to the normal rotation
        }
      };
      glide();
    };

    const onPointerUp = () => endDrag();
    const onPointerCancel = () => endDrag();

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerCancel);

    const startSpin = () => {
      if (reduceMotion) {
        // Static frame at a pleasant angle, India near the center
        paintLabels(THETA, PHI_START);
        return;
      }
      startAutoSpin();
    };

    const createGlobeInstance = () => {
      if (destroyed) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      if (!canvas.isConnected) return;

      // cobe wraps the canvas in its own positioning div; unwrap any leftover
      // wrapper from a previous instance before creating a new one
      if (canvas.parentElement && canvas.parentElement !== container) {
        canvas.parentElement.replaceWith(canvas);
      }

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: width * dpr,
        height: height * dpr,
        phi: PHI_START,
        theta: THETA,
        dark,
        diffuse: 1.15,
        mapSamples: 16000,
        mapBrightness,
        baseColor,
        markerColor,
        glowColor,
        markers: markers.map((m) => ({
          location: m.location,
          size: m.size ?? markerSize,
          color: m.color,
          id: m.id,
        })),
        arcs: arcs.map((a) => ({ from: a.from, to: a.to, color: a.color, id: a.id })),
        arcColor,
        arcWidth,
        arcHeight,
        markerElevation,
        scale: GLOBE_SCALE,
      });
      startSpin();

      if (!reduceMotion) {
        // Pause the spin while the globe is off-screen
        const observer = new IntersectionObserver(
          ([entry]) => {
            onScreen = entry.isIntersecting;
          },
          { threshold: 0.02 }
        );
        observer.observe(container);
        resizeCleanup = () => observer.disconnect();
      }
    };

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (destroyed) return;
        const rect = container.getBoundingClientRect();
        const nextW = Math.max(1, Math.round(rect.width));
        const nextH = Math.max(1, Math.round(rect.height));
        if (nextW === width && nextH === height) return;
        globe?.destroy();
        globe = null;
        cancelAnimationFrame(spinRaf);
        spinRaf = 0;
        createGlobeInstance();
      }, 200);
    };

    // Wait one frame so the container has its settled layout size
    const initRaf = requestAnimationFrame(() => {
      createGlobeInstance();
      window.addEventListener("resize", onResize);
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(initRaf);
      cancelAnimationFrame(spinRaf);
      cancelAnimationFrame(inertiaRaf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerCancel);
      resizeCleanup?.();
      globe?.destroy();
      globe = null;
    };
  }, [
    markers,
    arcs,
    markerColor,
    baseColor,
    glowColor,
    arcColor,
    dark,
    mapBrightness,
    markerSize,
    markerElevation,
    arcWidth,
    arcHeight,
    rotateSpeed,
  ]);

  return (
    <div className={`cobe-globe ${className}`} ref={containerRef} role="img" aria-label={ariaLabel}>
      <canvas ref={canvasRef} className="cobe-globe-canvas" />
      <div className="cobe-globe-labels" ref={labelsRef} aria-hidden="true">
        {markers.map((m) => (
          <span key={m.id || m.label} className="cobe-marker-label" data-marker-id={m.id}>
            <span className="cobe-marker-dot" aria-hidden="true" />
            {m.label}
          </span>
        ))}
        {arcs.map((a) => (
          <span key={a.id} className="cobe-arc-label" data-arc-id={a.id}>
            {a.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CobeGlobe;
