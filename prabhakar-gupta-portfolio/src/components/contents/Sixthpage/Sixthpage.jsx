import { motion } from "framer-motion";
import { FiDownload, FiEye } from "react-icons/fi";
import { AuroraButton } from "../../background/AuroraHero.jsx";
import "./Sixthpage.css";

const Sixthpage = () => {
  return (
    <motion.div
      className="resume-shell"
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="para">
        Take a look at my professional experience and skills. You can view it directly in your
        browser or download a PDF copy for your convenience.
      </p>

      <div className="resume-actions">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <AuroraButton
            href="https://drive.google.com/file/d/16tnbepZlDVjNbiyZ9bZLln4AaZ6AbbSE/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            icon={FiEye}
          >
            View Online
          </AuroraButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <AuroraButton
            href="https://drive.google.com/file/d/16tnbepZlDVjNbiyZ9bZLln4AaZ6AbbSE/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            icon={FiDownload}
          >
            Download CV
          </AuroraButton>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sixthpage;
