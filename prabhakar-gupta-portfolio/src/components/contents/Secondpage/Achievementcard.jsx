import "./Achievementcard.css";
import { FaTrophy, FaLaptopCode, FaMedal, FaAward } from "react-icons/fa";
import InteractiveCard from "../../InteractiveCard.jsx";

const Achievementcard = ({ delay = 0 }) => {
  return (
    <InteractiveCard
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
        <FaTrophy className="icon blue" />
        <p className="text">
          Secured <strong>2nd Runner-Up</strong> position in Hack The Beginning ’2K26 among 150+ teams.{" "}
          <a
            href="https://drive.google.com/drive/folders/1DIi-"
            target="_blank"
            rel="noopener noreferrer"
            className="achievement-link"
          >
            [Link]
          </a>
        </p>
      </div>

      <div className="card-option">
        <FaMedal className="icon cyan" />
        <p className="text">
          Earned <strong>LeetCode 50 and 100 Days Badges</strong> through consistent problem-solving.
        </p>
      </div>

      <div className="card-option">
        <FaLaptopCode className="icon green" />
        <p className="text">
          <strong>Solved 150+</strong> problems on LeetCode across diverse topics including arrays, trees and graphs.
        </p>
      </div>
      <div className="card-option">
        <FaAward className="icon gradient" />
        <p className="text">
          Smart India Hackathon
          <br />
          <span>Cleared Internal Round 1 & 2</span>
          <br />
          <a
            href="https://drive.google.com/file/d/1GxtyxuaYWuZKiRPKckke1EG8uhQDaC8U/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#3b82f6", textDecoration: "underline", textUnderlineOffset: "3px" }}
          >
            [Link]
          </a>
        </p>
      </div>
    </InteractiveCard>
  );
};

export default Achievementcard;
