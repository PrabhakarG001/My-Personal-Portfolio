import "./SoftSkills.css";
import { motion } from "framer-motion";

const SoftSkills = () => {
  const skills = [
    "Team Work",
    "Time Management",
    "Responsive",
    "Dynamic",
    "Scalable",
    "Work Ethic",
    "Decision Making",
    "Conflict Resolution",
    "Collaborative",
    "Adaptable",
    "Creative",
    "Critical Thinking",
    "Leadership",
    "Emotional Intelligence",
    "Patience",
  ];

  return (
    <motion.div
      className="universal-card softskills-wrapper"
      role="list"
      aria-label="Soft skills"
      initial={{ opacity: 0, y: 24, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="softskills-track">
        {Array(2)
          .fill(skills)
          .flat()
          .map((skill, index) => (
            <div key={`${skill}-${index}`} className="softskills-item" role="listitem">
              {skill}
              <span className="star">*</span>
            </div>
          ))}
      </div>
    </motion.div>
  );
};

export default SoftSkills;
