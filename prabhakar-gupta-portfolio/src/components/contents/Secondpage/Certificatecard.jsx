import "./Certificatecard.css";
import { FaAward, FaRobot, FaPython, FaCloud } from "react-icons/fa";
import InteractiveCard from "../../InteractiveCard.jsx";
import { certifications } from "../../../config/certificationsConfig.js";

// Compact featured-certificates card for the About grid.
// Links come straight from the central certifications config — real ones open,
// the rest show "Coming Soon" (no fake URLs).
const CERT_ICONS = {
  "aws-cloud-foundation": FaCloud,
  "python-programming": FaPython,
  "ai-certificate": FaRobot,
};

const CertificateCard = ({ delay = 0 }) => {
  const featured = ["aws-cloud-foundation", "python-programming", "ai-certificate"];

  return (
    <InteractiveCard
      className="certificate-card"
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.18 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="header">
        <FaAward className="icon gradient" />
        <h2 className="title">Featured Certificates</h2>
      </div>

      {featured.map((id) => {
        const cert = certifications.find((c) => c.id === id);
        const Icon = CERT_ICONS[id];
        const shortTitle = cert.title
          .replace(" Certificate", "")
          .replace("AWS Academy Cloud Foundation Course", "AWS Cloud Foundation");

        return (
          <div className="card-option" key={id}>
            <Icon className="icon cyan" aria-hidden="true" />
            <p className="text">
              {shortTitle} — {cert.provider.split(" / ")[0]}
              <br />
              {cert.link ? (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#3b82f6", textDecoration: "underline", textUnderlineOffset: "3px" }}
                >
                  [View]
                </a>
              ) : (
                <span>Coming Soon</span>
              )}
            </p>
          </div>
        );
      })}
    </InteractiveCard>
  );
};

export default CertificateCard;
