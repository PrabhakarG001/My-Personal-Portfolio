import "./CertificateCard.css";
import { FaAward, FaLaptopCode, FaCode } from "react-icons/fa";

const CertificateCard = () => {
  return (
    <>
    <div className="certificate-card">
      <div className="header">
        <FaAward className="icon gradient" />
        <h2 className="title">Certificates</h2>
      </div>

      <div className="card-option">
        <FaLaptopCode className="icon green" />
        <p className="text">
          Full Stack Web Development - Apna College<br />
          <span>Issued: October 2025</span><br />
          🔗 <a href="#">Coming Soon</a>
        </p>
      </div>

      <div className="card-option">
        <FaCode className="icon cyan" />
        <p className="text">
          Data Structures & Algorithms - Apna College<br />
          <span>Issued: February 2026</span><br />
          🔗 <a href="#">Coming Soon</a>
        </p>
      </div>
    </div>
    </>
  );
};

export default CertificateCard;