import { useEffect } from "react";

export const useEyeballEffect = () => {
  useEffect(() => {
    let animationFrameId = null;
    let targetX = 0;
    let targetY = 0;

    // Disable on mobile devices
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updateEyeballs);
      }
    };

    const updateEyeballs = () => {
      const eyeballTargets = document.querySelectorAll('.eyeball-target');

      eyeballTargets.forEach((target) => {
        const icon = target.querySelector('.eyeball-icon') || target;
        const rect = icon.getBoundingClientRect();
        
        // Calculate center of the icon
        const iconCenterX = rect.left + rect.width / 2;
        const iconCenterY = rect.top + rect.height / 2;

        // Calculate angle from center to mouse cursor
        const deltaX = targetX - iconCenterX;
        const deltaY = targetY - iconCenterY;
        const angleRad = Math.atan2(deltaY, deltaX);
        let angleDeg = (angleRad * 180) / Math.PI;

        // Instead of rotating (which requires knowing the icon's original orientation),
        // we'll apply a subtle 3D-like translation shift (max 4px) towards the cursor.
        const maxShift = 4;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Calculate shift amounts (capped at maxShift)
        const shiftX = (deltaX / distance) * Math.min(distance / 50, maxShift);
        const shiftY = (deltaY / distance) * Math.min(distance / 50, maxShift);

        icon.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
      });

      animationFrameId = null;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);
};
