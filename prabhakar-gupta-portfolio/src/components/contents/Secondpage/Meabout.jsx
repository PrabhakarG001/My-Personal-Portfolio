import "./Meabout.css";
import { motion } from "framer-motion";
import devImage from "../../../assets/dev.png";
import { FaHandPointRight } from "react-icons/fa";

const Meabout = ({ delay = 0 }) => {
  return (
    <motion.div
      className="meabout-container"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="meabout-card">
        <motion.div
          className="meabout-text"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.56, delay: delay + 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>
            <span className="highlight-white">Hi Everyone, I am </span>
            <span className="highlight-gradient">
              <i>Prabhakar Gupta</i>
            </span>
            <span className="highlight-white"> from </span>
            <span className="highlight-gradient">Uttar Pradesh, India.</span>
          </p>

          <p>I am thrilled to be enrolled in Software Engineering.</p>
          <p>
            I am pursuing B.Tech (Computer Science and Engineering) from Dr. A.P.J Abdul Kalam
            Technical University.
          </p>

          <p>
            I am a passionate <span className="highlight-gradient"><i>Aspiring Software Engineer</i></span>{" "}
            skilled in <span className="highlight-gradient"><i>Full Stack Development</i></span> using the{" "}
            <span className="highlight-gradient"><i>MERN Stack.</i></span>
          </p>
          <p>
            With a strong foundation in <span className="highlight-gradient"><i>C++, DSA, and both SQL</i></span>{" "}
            and <span className="highlight-gradient"><i>MongoDB,</i></span> I enjoy crafting scalable web
            solutions.
          </p>
          <p>
            I love turning ideas into <span className="highlight-gradient"><i>real-world products</i></span>{" "}
            that are both <span className="highlight-gradient"><i>elegant</i></span> and{" "}
            <span className="highlight-gradient"><i>efficient.</i></span>
          </p>

          <p>
            Apart from <span className="highlight-white">Coding &amp; Brainstorming,</span> here are some
            other activities that I love to do.
          </p>
          <ul>
            <li>
              <FaHandPointRight size={14} /> Thinking beyond lines of code.
            </li>
            <li>
              <FaHandPointRight size={14} /> Growing through every challenge.
            </li>
            <li>
              <FaHandPointRight size={14} /> Refining skills and mastering tools mindfully.
            </li>
          </ul>

          <p className="quote">
            "Curiosity is my compass, and code is my language of exploration."
            <span className="quote-author">        - Prabhakar Gupta</span>
          </p>
        </motion.div>

        <motion.div
          className="meabout-image"
          initial={{ opacity: 0, x: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.58, delay: delay + 0.14, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={devImage} alt="Developer" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Meabout;
