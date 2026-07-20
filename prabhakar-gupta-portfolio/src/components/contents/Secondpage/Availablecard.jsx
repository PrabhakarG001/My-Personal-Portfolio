import "./Availablecard.css";
import { FaRocket, FaCheckCircle, FaUser, FaClock } from "react-icons/fa";
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
        <p className="text">Open to New Opportunities</p>
      </div>

      <div className="card-option">
        <FaUser className="icon cyan" />
        <p className="text">Open to Training & Learning</p>
      </div>

      <div className="card-option">
        <FaClock className="icon blue" />
        <p className="text">Remote & On-site Available</p>
      </div>
    </InteractiveCard>
  );
};

export default Availablecard;
