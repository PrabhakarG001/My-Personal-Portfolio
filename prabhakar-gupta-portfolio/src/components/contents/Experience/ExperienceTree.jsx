import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaBuilding, FaFlask, FaUsers } from "react-icons/fa";
import InteractiveCard from "../../InteractiveCard.jsx";
import { experiences } from "../../../config/experienceConfig.js";
import "./ExperienceTree.css";

// Sequential growth timing (seconds) — trunk -> node -> branch -> card
const NODE_DELAY = 0.5;
const BRANCH_DELAY = 0.68;
const CARD_DELAY = 0.84;
const ROW_STAGGER = 0.95;

const ORG_ICONS = {
  "orbitron-labs": FaFlask,
  "ecell-itsec": FaUsers,
};

const TRUNK_VARIANTS = {
  hidden: { scaleY: 0 },
  show: {
    scaleY: 1,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};

const NODE_VARIANTS = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  },
};

const BRANCH_VARIANTS = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const CARD_VARIANTS = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === "left" ? -34 : 34,
  }),
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function ExperienceContent({ item, compact }) {
  const Icon = ORG_ICONS[item.id] || FaBuilding;
  return (
    <div className="experience-card-inner">
      <div className="experience-card-head">
        <span className="experience-org-icon" aria-hidden="true">
          <Icon />
        </span>
        <div className="experience-head-text">
          <h3 className="experience-org">{item.organization}</h3>
          <p className="experience-role">{item.role}</p>
        </div>
      </div>

      <div className="experience-meta-row">
        <span className="experience-date-pill">
          {item.startDate} – {item.endDate}
        </span>
        {item.isCurrent && (
          <span className="experience-present" aria-label="Currently ongoing">
            <span className="present-dot" aria-hidden="true" />
            Present
          </span>
        )}
      </div>

      <p className="experience-summary">{item.summary}</p>

      {!compact && (
        <ul className="experience-points">
          {item.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

const useIsCompact = () => {
  const [isCompact, setIsCompact] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 860px)").matches
  );

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 860px)");
    const handler = (e) => setIsCompact(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isCompact;
};

const ExperienceTree = () => {
  const reduceMotion = useReducedMotion();
  const isCompact = useIsCompact();

  if (reduceMotion) {
    // Clean static tree when the user prefers reduced motion
    return (
      <div className="experience-tree" data-layout={isCompact ? "mobile" : "desktop"}>
        <span className="experience-trunk" aria-hidden="true" />
        {experiences.map((item, index) => (
          <div
            key={item.id}
            className={`experience-row ${index % 2 === 0 ? "side-left" : "side-right"}`}
          >
            <span
              className={`experience-node${item.isCurrent ? " is-current" : ""}`}
              aria-hidden="true"
            >
              <span className="node-core" />
            </span>
            <span className="experience-branch" aria-hidden="true" />
            <div className="experience-card-wrap">
              <InteractiveCard className="experience-card">
                <ExperienceContent item={item} compact={isCompact} />
              </InteractiveCard>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="experience-tree"
      data-layout={isCompact ? "mobile" : "desktop"}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.15 }}
    >
      {/* Main vertical trunk — progressively draws top to bottom */}
      <motion.span
        className="experience-trunk"
        aria-hidden="true"
        variants={TRUNK_VARIANTS}
        style={{ transformOrigin: "top" }}
      />

      {experiences.map((item, index) => {
        const side = index % 2 === 0 ? "left" : "right";
        const nodeDelay = NODE_DELAY + index * ROW_STAGGER;

        return (
          <div key={item.id} className={`experience-row side-${side}`}>
            {/* Timeline node on the trunk */}
            <motion.span
              className={`experience-node${item.isCurrent ? " is-current" : ""}`}
              aria-hidden="true"
              variants={NODE_VARIANTS}
              transition={{ delay: nodeDelay }}
            >
              <span className="node-core" />
            </motion.span>

            {/* Branch grows outward from the trunk toward its side */}
            <motion.span
              className="experience-branch"
              aria-hidden="true"
              variants={BRANCH_VARIANTS}
              style={{ transformOrigin: side === "left" ? "right" : "left" }}
              transition={{ delay: nodeDelay + (BRANCH_DELAY - NODE_DELAY) }}
            />

            {/* Card reveals after the branch, sliding in from its side */}
            <motion.div
              className="experience-card-wrap"
              variants={CARD_VARIANTS}
              custom={side}
              transition={{ delay: nodeDelay + (CARD_DELAY - NODE_DELAY) }}
            >
              <InteractiveCard className="experience-card">
                <ExperienceContent item={item} compact={isCompact} />
              </InteractiveCard>
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default ExperienceTree;
