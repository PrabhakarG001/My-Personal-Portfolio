import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";

import {
  motionValue,
  useMotionTemplate,
  motion,
  animate,
} from "framer-motion";
import "./AuroraHero.css";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
const AURORA_COLOR = motionValue(COLORS_TOP[0]);
let auroraColorUsers = 0;
let auroraColorControls = null;

const syncAuroraColorAnimation = () => {
  if (!auroraColorControls) {
    auroraColorControls = animate(AURORA_COLOR, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }
};

const useAuroraSharedColor = () => {
  useEffect(() => {
    auroraColorUsers += 1;
    syncAuroraColorAnimation();

    return () => {
      auroraColorUsers -= 1;
      if (auroraColorUsers <= 0 && auroraColorControls) {
        auroraColorControls.stop();
        auroraColorControls = null;
      }
    };
  }, []);

  return AURORA_COLOR;
};

export const AuroraButton = ({
  href,
  onClick,
  icon: Icon,
  children,
  target,
  rel,
  className = "",
  type = "button",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const aura = useAuroraSharedColor();

  const border = useMotionTemplate`1px solid ${aura}`;
  const baseBoxShadow = useMotionTemplate`0 0 0 1px rgba(148, 163, 184, 0.2) inset, 0 8px 20px rgba(2, 6, 23, 0.46), 0 0 16px ${aura}`;
  const hoverBoxShadow = useMotionTemplate`0 0 0 1px rgba(148, 163, 184, 0.32) inset, 0 14px 30px rgba(2, 6, 23, 0.56), 0 0 24px ${aura}`;
  const sweepGlow = useMotionTemplate`radial-gradient(ellipse at center, ${aura} 0%, rgba(255,255,255,0.28) 34%, rgba(255,255,255,0) 70%)`;
  const baseBackground = useMotionTemplate`linear-gradient(180deg, rgba(2, 6, 23, 0.65) 0%, rgba(2, 6, 23, 0.85) 100%), radial-gradient(140% 190% at 18% 0%, ${aura}60 0%, rgba(255,255,255,0) 58%)`;
  const hoverBackground = useMotionTemplate`linear-gradient(180deg, rgba(2, 6, 23, 0.75) 0%, rgba(2, 6, 23, 0.95) 100%), radial-gradient(140% 190% at 18% 0%, ${aura}80 0%, rgba(255,255,255,0) 58%)`;
  const baseSurface = useMotionTemplate`linear-gradient(180deg, rgba(148, 163, 184, 0.25) 0%, rgba(2, 6, 23, 0.45) 100%), radial-gradient(120% 160% at 24% 0%, ${aura}44 0%, rgba(255,255,255,0) 52%)`;
  const hoverSurface = useMotionTemplate`linear-gradient(180deg, rgba(148, 163, 184, 0.15) 0%, rgba(2, 6, 23, 0.55) 100%), radial-gradient(120% 160% at 24% 0%, ${aura}55 0%, rgba(255,255,255,0) 52%)`;

  const style = {
    border,
    boxShadow: isHovered ? hoverBoxShadow : baseBoxShadow,
    background: isHovered ? hoverBackground : baseBackground,
  };

  const surfaceStyle = {
    position: "absolute",
    inset: "1.5px",
    borderRadius: "9999px",
    background: isHovered ? hoverSurface : baseSurface,
    pointerEvents: "none",
    zIndex: 0,
  };

  const sweepTrackStyle = {
    position: "absolute",
    inset: "0",
    borderRadius: "9999px",
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: 1,
  };

  const sweepStyle = {
    position: "absolute",
    top: "-170%",
    left: "-120%",
    width: "70%",
    height: "440%",
    borderRadius: "9999px",
    background: sweepGlow,
    filter: "blur(7px)",
    opacity: 0.72,
  };

  const sharedProps = {
    className: `aurora-action-button ${className}`.trim(),
    style,
    whileHover: { scale: 1.03, y: -1 },
    whileTap: { scale: 0.985 },
    onHoverStart: () => setIsHovered(true),
    onHoverEnd: () => setIsHovered(false),
    onFocus: () => setIsHovered(true),
    onBlur: () => setIsHovered(false),
  };

  const content = (
    <>
      <span aria-hidden="true" style={surfaceStyle} />
      <span aria-hidden="true" style={sweepTrackStyle}>
        <motion.span
          style={sweepStyle}
          animate={{ x: ["0%", "230%"] }}
          transition={{ duration: 3.8, ease: "linear", repeat: Infinity, repeatDelay: 0.45 }}
        />
      </span>
      <span className="aurora-action-content">
        <span className="aurora-action-label">{children}</span>
        {Icon ? <Icon className="aurora-action-icon eyeball-icon" /> : null}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} {...sharedProps} className={`${sharedProps.className} eyeball-target`}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} {...sharedProps} className={`${sharedProps.className} eyeball-target`}>
      {content}
    </motion.button>
  );
};

const AuroraHero = () => {
  const color = useAuroraSharedColor();

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 40%, ${color})`;

  return (
    <motion.section style={{ backgroundImage }} className="aurora-hero" aria-hidden="true">
      <div className="aurora-canvas">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  );
};

export default AuroraHero;
