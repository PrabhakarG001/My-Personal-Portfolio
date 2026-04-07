import "./Availablecard.css";
import { FaRocket, FaCheckCircle, FaUser, FaClock } from "react-icons/fa";

const Availablecard = () => {
  return (
    <div className="available-card">
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
    </div>
  );
};

export default Availablecard;