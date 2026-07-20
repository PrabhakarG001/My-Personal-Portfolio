import "./Touchcard.css";
import { motion } from "framer-motion";
import InteractiveCard from "../../InteractiveCard.jsx";

const Touchcard = ({ delay = 0 }) => {
  return (
    <InteractiveCard
      className="card"
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        src="https://uiverse.io/astronaut.png"
        alt="PG"
        className="image"
        initial={{ opacity: 0, y: 12, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.52, delay: delay + 0.08, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="heading"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.44, delay: delay + 0.14, ease: [0.22, 1, 0.36, 1] }}
      >
        Connect with Me
      </motion.div>
      <motion.p
        className="subtext"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.44, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        Open to collaborations, internships, and exciting product ideas.
      </motion.p>

      <motion.div
        className="icons"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45, delay: delay + 0.26, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.a
          href="https://www.linkedin.com/in/prabhakar-gupta-800383279/?originalSubdomain=in"
          target="_blank"
          rel="noopener noreferrer"
          className="linkedin"
          aria-label="LinkedIn"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.35, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3 9.5h4v12H3v-12Zm7 0h3.6v1.6h.05a4 4 0 0 1 3.6-2c3.85 0 4.55 2.54 4.55 5.85v6.55h-4v-5.8c0-1.38-.03-3.15-2-3.15s-2.3 1.5-2.3 3.05v5.9H10v-12Z" />
          </svg>
        </motion.a>

        <motion.a
          href="https://github.com/PrabhakarG001"
          target="_blank"
          rel="noopener noreferrer"
          className="github"
          aria-label="GitHub"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.35, delay: delay + 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.93c.57.11.78-.25.78-.56v-2c-3.2.69-3.87-1.54-3.87-1.54a3.05 3.05 0 0 0-1.28-1.68c-1.05-.72.08-.71.08-.71a2.43 2.43 0 0 1 1.77 1.19 2.48 2.48 0 0 0 3.4.97c.05-.63.29-1.07.53-1.32-2.56-.29-5.26-1.28-5.26-5.7a4.46 4.46 0 0 1 1.17-3.1 4.15 4.15 0 0 1 .11-3.06s.97-.31 3.18 1.18a10.94 10.94 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18a4.15 4.15 0 0 1 .11 3.06 4.46 4.46 0 0 1 1.17 3.1c0 4.43-2.7 5.41-5.27 5.7.3.26.56.77.56 1.56v2.3c0 .31.2.67.78.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
          </svg>
        </motion.a>

        <motion.a
          href="mailto:prabhakarg465@email.com"
          target="_blank"
          rel="noopener noreferrer"
          className="email"
          aria-label="Email"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.35, delay: delay + 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M4 4h16c1.1 0 2 .9 2 2v1.8l-10 5.7L2 7.8V6c0-1.1.9-2 2-2Zm16 16H4c-1.1 0-2-.9-2-2V9.3l10 5.7 10-5.7V18c0 1.1-.9 2-2 2Z" />
          </svg>
        </motion.a>
      </motion.div>
    </InteractiveCard>
  );
};

export default Touchcard;
