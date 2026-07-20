import "./Certificatecard.css";
import { FaAward, FaCode, FaLaptopCode } from "react-icons/fa";
import InteractiveCard from "../../InteractiveCard.jsx";

const CertificateCard = ({ delay = 0 }) => {
  return (
    <InteractiveCard
      className="certificate-card"
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="header">
        <FaAward className="icon gradient" />
        <h2 className="title">Certificates</h2>
      </div>

      <div className="card-option">
        <FaLaptopCode className="icon green" />
        <p className="text">
          Full Stack Web Development - Apna College
          <br />
          <span>Issued: October 2025</span>
          <br />
          <a href="#">Link: Coming Soon</a>
        </p>
      </div>

      <div className="card-option">
        <FaCode className="icon cyan" />
        <p className="text">
          Data Structures &amp; Algorithms - Apna College
          <br />
          <span>Issued: February 2026</span>
          <br />
          <a href="#">Link: Coming Soon</a>
        </p>
      </div>
    </InteractiveCard>
  );
};

export default CertificateCard;
