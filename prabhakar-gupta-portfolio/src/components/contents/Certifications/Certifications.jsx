import { motion } from "framer-motion";
import { FiExternalLink, FiDownload } from "react-icons/fi";
import { FaAws, FaPython, FaRobot, FaCode, FaLayerGroup } from "react-icons/fa";
import InteractiveCard from "../../InteractiveCard.jsx";
import { certifications } from "../../../config/certificationsConfig.js";
import "./Certifications.css";

const PROVIDER_LOGOS = {
  "aws-cloud-foundation": { Icon: FaAws, color: "#f97316" },
  "python-programming": { Icon: FaPython, color: "#3b82f6" },
  "ai-certificate": { Icon: FaRobot, color: "#a78bfa" },
  "dsa-certificate": { Icon: FaCode, color: "#22c55e" },
  "full-stack-certificate": { Icon: FaLayerGroup, color: "#22d3ee" },
};

const cardReveal = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: (index = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function ProviderLogoArea({ certId, provider }) {
  const logo = PROVIDER_LOGOS[certId];

  return (
    <div className="cert-logo-area">
      <span className="cert-logo-ring" style={{ borderColor: `${logo.color}55` }}>
        {logo ? (
          <logo.Icon className="cert-logo-icon" style={{ color: logo.color }} aria-hidden="true" />
        ) : (
          <span className="cert-logo-placeholder" aria-hidden="true">
            {provider.charAt(0)}
          </span>
        )}
        <span className="cert-logo-glow" style={{ background: logo.color }} aria-hidden="true" />
      </span>
      <p className="cert-provider">{provider}</p>
    </div>
  );
}

function CertActions({ link, title }) {
  if (!link) {
    // Coming Soon — non-actionable, clearly communicated, still keyboard accessible
    return (
      <div className="cert-actions">
        <button type="button" className="cert-btn" disabled aria-disabled="true">
          <FiExternalLink aria-hidden="true" />
          <span>Coming Soon</span>
        </button>
        <button type="button" className="cert-btn secondary" disabled aria-disabled="true">
          <FiDownload aria-hidden="true" />
          <span>Coming Soon</span>
        </button>
      </div>
    );
  }

  // Google Drive's direct-download endpoint for the exact same file ID —
  // not a fabricated endpoint. View keeps the supplied link untouched.
  const fileId = link.split("/file/d/")[1]?.split("/")[0];
  const driveDownloadUrl = fileId
    ? `https://drive.google.com/uc?export=download&id=${fileId}`
    : link;

  return (
    <div className="cert-actions">
      <a
        className="cert-btn"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View certificate: ${title}`}
      >
        <FiExternalLink aria-hidden="true" />
        <span>View Certificate</span>
      </a>
      <a
        className="cert-btn secondary"
        href={driveDownloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Download certificate: ${title}`}
      >
        <FiDownload aria-hidden="true" />
        <span>Download</span>
      </a>
    </div>
  );
}

const Certifications = () => {
  return (
    <div className="certifications-grid">
      {certifications.map((cert, index) => (
        <InteractiveCard
          key={cert.id}
          className={`cert-card${cert.link ? "" : " coming-soon"}`}
          variants={cardReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.15, margin: "-20px" }}
          custom={index}
        >
          <ProviderLogoArea certId={cert.id} provider={cert.provider} />

          <h3 className="cert-title">{cert.title}</h3>
          <p className="cert-desc">{cert.description}</p>

          <div className="cert-tags">
            {cert.tags.map((tag) => (
              <span key={tag} className="cert-tag">
                {tag}
              </span>
            ))}
          </div>

          <CertActions link={cert.link} title={cert.title} />
        </InteractiveCard>
      ))}
    </div>
  );
};

export default Certifications;
