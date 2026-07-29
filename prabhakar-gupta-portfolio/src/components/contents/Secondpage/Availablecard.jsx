import "./Availablecard.css";
import { FaRocket, FaCheckCircle, FaUser, FaClock, FaBriefcase } from "react-icons/fa";
import InteractiveCard from "../../InteractiveCard.jsx";

const Availablecard = ({ delay = 0 }) => {
  return (
    <InteractiveCard
      className="available-card"
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="header">
        <FaRocket className="icon aqua" style={{ color: "#f97316" }}/>
        <h2 className="title">Available for Hire</h2>
      </div>

      <div className="card-option">
        <FaCheckCircle className="icon green" />
        <p className="text"><strong>Open to Opportunities:</strong> Full-time roles and internships</p>
      </div>

      <div className="card-option">
        <FaUser className="icon cyan" />
        <p className="text"><strong>Adaptable:</strong> Eager to embrace training & new technologies</p>
      </div>

      <div className="card-option">
        <FaClock className="icon blue" />
        <p className="text"><strong>Flexible Work:</strong> Remote, hybrid, & on-site availability</p>
      </div>

      <div className="card-option">
        <FaBriefcase className="icon purple" style={{ color: "#a855f7" }} />
        <p className="text"><strong>Target Roles:</strong> Seeking Full-Stack / SDE positions</p>
      </div>
    </InteractiveCard>
  );
};

export default Availablecard;
