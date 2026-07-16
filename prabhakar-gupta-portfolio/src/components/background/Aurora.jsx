import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { FiArrowRight, FiDownload, FiEye, FiMail } from "react-icons/fi";

import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import "./Aurora.css";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
const BUTTON_AURA = ["#22d3ee", "#38bdf8", "#60a5fa", "#22d3ee"];

const RESUME_FILE_ID = "1eAxQg-FIbvEfF6uRT-5J3akm_JvbOhFz";

const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  const buttonAura = useMotionValue(BUTTON_AURA[0]);

  useEffect(() => {
    const controls = animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
    return () => controls.stop();
  }, [color]);

  useEffect(() => {
    const controls = animate(buttonAura, BUTTON_AURA, {
      ease: "easeInOut",
      duration: 5.5,
      repeat: Infinity,
      repeatType: "mirror",
    });
    return () => controls.stop();
  }, [buttonAura]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${buttonAura}`;
  const boxShadow = useMotionTemplate`0 0 0 1px rgba(125, 211, 252, 0.4) inset, 0 8px 20px rgba(2, 6, 23, 0.46), 0 0 16px ${buttonAura}`;
  const sweepGlow = useMotionTemplate`radial-gradient(ellipse at center, ${buttonAura} 0%, rgba(255,255,255,0.28) 34%, rgba(255,255,255,0) 70%)`;

  const buttonStyle = {
    border,
    boxShadow,
    background: "linear-gradient(180deg, rgba(17, 75, 166, 0.88) 0%, rgba(7, 29, 79, 0.94) 100%)",
  };

  const buttonContentStyle = {
    position: "relative",
    zIndex: 2,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.45rem",
  };

  const buttonSurfaceStyle = {
    position: "absolute",
    inset: "1.5px",
    borderRadius: "9999px",
    background: "linear-gradient(180deg, rgba(20, 48, 112, 0.46) 0%, rgba(2, 9, 29, 0.72) 100%)",
    pointerEvents: "none",
    zIndex: 0,
  };

  const buttonSweepTrackStyle = {
    position: "absolute",
    inset: "0",
    borderRadius: "9999px",
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: 1,
  };

  const buttonSweepStyle = {
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

  return (
    <>
    <style>{`
      .aurora-button--match::before,
      .aurora-button--match::after {
        content: none !important;
      }

      .aurora-button--match {
        overflow: hidden;
        transform: translateZ(0);
      }
    `}</style>
    <motion.section style={{ backgroundImage }} className="aurora-hero" data-scroll="fade">
      <div className="aurora-canvas">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>

    <div className="button-container" data-scroll="up" style={{ "--scroll-delay": "120ms" }}>
      <div className="aurora-button-row aurora-button-row--hero">
        <motion.button
        type="button"
        style={buttonStyle}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.985 }}
        className="aurora-button aurora-button--match"
        onClick={() => {
        const section = document.getElementById("projects");
        if (section) section.scrollIntoView({ behavior: "smooth" });
        }}
        >
          <span aria-hidden="true" style={buttonSurfaceStyle} />
          <span aria-hidden="true" style={buttonSweepTrackStyle}>
            <motion.span
              style={buttonSweepStyle}
              animate={{ x: ["0%", "230%"] }}
              transition={{ duration: 3.8, ease: "linear", repeat: Infinity, repeatDelay: 0.45 }}
            />
          </span>
          <span style={buttonContentStyle}>
            <span className="aurora-label">View Projects</span>
            <FiArrowRight className="aurora-icon" />
          </span>
        </motion.button>

        <motion.button
        type="button"
        style={buttonStyle}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.985 }}
        className="aurora-button aurora-button--match"
        onClick={() => {
        const section = document.getElementById("contact");
        if (section) section.scrollIntoView({ behavior: "smooth" });
         }}
        >
          <span aria-hidden="true" style={buttonSurfaceStyle} />
          <span aria-hidden="true" style={buttonSweepTrackStyle}>
            <motion.span
              style={buttonSweepStyle}
              animate={{ x: ["0%", "230%"] }}
              transition={{ duration: 3.8, ease: "linear", repeat: Infinity, repeatDelay: 0.45 }}
            />
          </span>
          <span style={buttonContentStyle}>
            <span className="aurora-label">Let&apos;s Connect</span>
            <FiMail className="aurora-icon" />
          </span>
        </motion.button>
      </div>

      <div className="aurora-button-row aurora-button-row--resume">
        <motion.button
        type="button"
        onClick={() =>
          window.open(`https://drive.google.com/file/d/${RESUME_FILE_ID}/view`, "_blank", "noopener,noreferrer")
        }
           style={buttonStyle}
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.985 }}
          className="aurora-button aurora-button--match"
        >
          <span aria-hidden="true" style={buttonSurfaceStyle} />
          <span aria-hidden="true" style={buttonSweepTrackStyle}>
            <motion.span
              style={buttonSweepStyle}
              animate={{ x: ["0%", "230%"] }}
              transition={{ duration: 3.8, ease: "linear", repeat: Infinity, repeatDelay: 0.45 }}
            />
          </span>
          <span style={buttonContentStyle}>
            <span className="aurora-label">Veiw Online</span>
            <FiEye className="aurora-icon" />
          </span>
        </motion.button>

        <motion.button
          type="button"
          onClick={() =>
            window.open(
              `https://drive.google.com/uc?export=download&id=${RESUME_FILE_ID}`,
              "_blank",
              "noopener,noreferrer"
            )
          }
          style={buttonStyle}
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.985 }}
          className="aurora-button aurora-button--match"
        >
          <span aria-hidden="true" style={buttonSurfaceStyle} />
          <span aria-hidden="true" style={buttonSweepTrackStyle}>
            <motion.span
              style={buttonSweepStyle}
              animate={{ x: ["0%", "230%"] }}
              transition={{ duration: 3.8, ease: "linear", repeat: Infinity, repeatDelay: 0.45 }}
            />
          </span>
          <span style={buttonContentStyle}>
            <span className="aurora-label">Download CV</span>
            <FiDownload className="aurora-icon" />
          </span>
        </motion.button>
      </div>
    </div>
    </>
  );
};

export default AuroraHero;
