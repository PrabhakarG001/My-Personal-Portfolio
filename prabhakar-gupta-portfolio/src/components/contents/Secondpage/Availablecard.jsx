import { useEffect, useRef } from "react";
import "./Availablecard.css";
import InteractiveCard from "../../InteractiveCard.jsx";

/*
 * "Based in India, available globally" globe card.
 * - Dotted wireframe globe slowly rotating (requestAnimationFrame, paused off-screen)
 * - City tags fan out around the globe; connector lines converge on the India hub
 * - Static layout, GPU-light: only cx/cy/opacity attributes are updated per frame
 * - Respects prefers-reduced-motion (renders one static frame)
 */

const START_ANGLE = -(77 * Math.PI) / 180; // India faces the viewer at load
const ROTATION_SPEED = 0.22; // radians per second — slow drift
const GLOBE_R = 46; // % of the 100x100 viewBox

const CITIES = [
  { name: "New Delhi", home: true, style: { top: "4%", left: "9%" }, anchor: [24, 8] },
  { name: "Bengaluru", home: true, style: { top: "4%", right: "9%" }, anchor: [76, 8] },
  { name: "San Francisco", style: { top: "33%", left: "2%" }, anchor: [13, 37] },
  { name: "Seattle", style: { top: "56%", left: "2%" }, anchor: [12, 60] },
  { name: "London", style: { top: "79%", left: "5%" }, anchor: [15, 82] },
  { name: "Tokyo", style: { top: "33%", right: "2%" }, anchor: [87, 37] },
  { name: "Singapore", style: { top: "60%", right: "2%" }, anchor: [88, 64] },
];

// Dotted sphere points (denser ring spacing at the poles)
const GLOBE_DOTS = (() => {
  const dots = [];
  for (let lat = -60; lat <= 60; lat += 15) {
    const cols = Math.max(6, Math.round(24 * Math.cos((lat * Math.PI) / 180)));
    for (let i = 0; i < cols; i++) {
      const lng = -180 + (360 / cols) * i;
      const home = lat >= 5 && lat <= 35 && lng >= 65 && lng <= 90;
      dots.push({ lat, lng, home });
    }
  }
  return dots;
})();

// Initial projection so the first paint is already correct
const project = (latDeg, lngDeg, angle) => {
  const lat = (latDeg * Math.PI) / 180;
  const lng = (lngDeg * Math.PI) / 180 + angle;
  return {
    x: 50 + Math.cos(lat) * Math.sin(lng) * GLOBE_R,
    y: 50 - Math.sin(lat) * GLOBE_R,
    z: Math.cos(lat) * Math.cos(lng),
  };
};

const Availablecard = ({ delay = 0 }) => {
  const stageRef = useRef(null);

  useEffect(() => {
    const svg = stageRef.current;
    if (!svg) return undefined;

    const dotEls = Array.from(svg.querySelectorAll("[data-lat]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const placeDots = (angle) => {
      dotEls.forEach((dot) => {
        const { x, y, z } = project(+dot.dataset.lat, +dot.dataset.lng, angle);
        dot.setAttribute("cx", x.toFixed(2));
        dot.setAttribute("cy", y.toFixed(2));
        dot.setAttribute("opacity", (z > 0 ? 0.14 + z * 0.6 : 0).toFixed(2));
        dot.setAttribute("r", (z > 0 ? 0.75 + z * 0.45 : 0).toFixed(2));
      });
    };

    if (reduceMotion) {
      placeDots(START_ANGLE);
      return undefined;
    }

    let raf = 0;
    let angle = START_ANGLE;
    let last = performance.now();
    let visible = true;

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (visible) {
        angle += dt * ROTATION_SPEED;
        placeDots(angle);
      }
      raf = requestAnimationFrame(tick);
    };

    // Pause the loop while the card is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(svg);

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <InteractiveCard
      className="available-card"
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.18 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="header">
        <h2 className="title">Available for Hire</h2>
        <span className="hire-status-pill" role="status" aria-label="Open to work">
          <span className="hire-status-dot" aria-hidden="true" />
          Open to work
        </span>
      </div>

      <p className="globe-mini-heading">Flexible with timezones</p>
      <p className="globe-headline">Based in India, available globally</p>

      <div className="globe-stage" ref={stageRef} role="img" aria-label="Rotating globe with Prabhakar's location in India and cities he can collaborate with worldwide">
        <svg className="globe-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {CITIES.map((city) => (
            <line
              key={`line-${city.name}`}
              x1={city.anchor[0]}
              y1={city.anchor[1]}
              x2="50"
              y2="50"
              className={city.home ? "globe-line home" : "globe-line"}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <svg className="globe-svg" viewBox="0 0 100 100" aria-hidden="true">
          {/* Static wireframe base */}
          <circle cx="50" cy="50" r={GLOBE_R} className="globe-outline" />
          <ellipse cx="50" cy="50" rx="30" ry={GLOBE_R} className="globe-graticule" />
          <ellipse cx="50" cy="50" rx="14" ry={GLOBE_R} className="globe-graticule" />
          <line x1={50 - GLOBE_R} y1="50" x2={50 + GLOBE_R} y2="50" className="globe-graticule" />

          {/* Rotating dot field */}
          {GLOBE_DOTS.map((dot, i) => {
            const { x, y } = project(dot.lat, dot.lng, START_ANGLE);
            return (
              <circle
                key={i}
                data-lat={dot.lat}
                data-lng={dot.lng}
                className={dot.home ? "globe-dot home" : "globe-dot"}
                cx={x.toFixed(2)}
                cy={y.toFixed(2)}
                r="1"
              />
            );
          })}

          {/* India hub */}
          <circle cx="50" cy="50" r="1.6" className="globe-hub" />
          <circle cx="50" cy="50" r="2.2" className="globe-hub-ring" />
        </svg>

        {CITIES.map((city) => (
          <span
            key={city.name}
            className={city.home ? "globe-tag home" : "globe-tag"}
            style={city.style}
          >
            {city.name}
          </span>
        ))}
      </div>
    </InteractiveCard>
  );
};

export default Availablecard;
