import "./Achievementcard.css";
import { FaTrophy, FaLaptopCode, FaUsers } from "react-icons/fa";

const Achievementcard = () => {
  return (
    <div className="achievement-card">
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
        <p className="text">Levelling Up Every Day</p>
      </div>
    </div>
  );
};

export default Achievementcard;