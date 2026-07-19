import "./Achievementcard.css";
import { motion } from "framer-motion";
import { FaTrophy, FaLaptopCode, FaUsers } from "react-icons/fa";

const Achievementcard = ({ delay = 0 }) => {
  return (
    <motion.div
      className="achievement-card"
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="header">
        <FaTrophy className="icon trophy" />
        <h2 className="title">Achievements</h2>
      </div>

      <div className="card-option">
        <FaLaptopCode className="icon green" />
        <p className="text">Combining structured education with self-practice</p>
      </div>

      <div className="card-option">
        <FaUsers className="icon cyan" />
        <p className="text">Built projects using team-style structure & Git</p>
      </div>

      <div className="card-option">
        <FaTrophy className="icon blue" />
        <p className="text">2nd Runner-Up among 150+ Teams at Hack The Beginning ’26 </p>
      </div>
    </motion.div>
  );
};

export default Achievementcard;
