import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import "./project.css";

const projects = [
  
  // {
  //   title: "Classic Tic-Tac-Toe Game",
  //   image: "/projecttwo.png",
  //   description:
  //     "This Tic Tac Toe game was developed using only HTML, CSS, and JavaScript. It supports two-player gameplay with turn tracking, win condition detection, and smooth responsiveness across mobile and desktop screens.",
  //   liveLink: "https://prabhakarg001.github.io/Tic-Toc-Toe-Game/",
  //   codeLink: "https://github.com/PrabhakarG001/Tic-Toc-Toe-Game",
  // },
    {
    title: "StayVerse",
    image: "/StayVerse.png",
    description:
      "Currently building StayVerse — an innovative rental and stay-booking platform designed to simplify property discovery, seamless bookings, secure payments, and a modern travel experience for users and hosts. ",
    liveLink: "#typewriter",
    codeLink: "#contact",
  },
  {
    title: "My Personal Portfolio Website",
    image: "/project1.png",
    description:
      "A fully responsive and modern portfolio website built using React, Tailwind CSS and JavaScript. It includes animated scroll effects, reusable components, and a clean layout that highlights my technical skills and projects.",
    liveLink: "#typewriter",
    codeLink: "#contact",
  },
    {
    title: "ApproveX",
    image: "/ApproveX.png",
    description:
      "ApproveX — an innovative approval and verification platform designed to streamline student activity requests through smart automation, AI-based validation, secure workflows, and verified digital certifications.",
    liveLink: "",
    codeLink: "#contact",
  },
];

const projectReveal = {
  hidden: { opacity: 0, y: 34, scale: 0.98 },
  show: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.62, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Project = () => {
  return (
    <div className="project-wrapper">
      {projects.map((project, index) => (
        <motion.article
          key={project.title}
          className="project-container"
          variants={projectReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.22 }}
          custom={index}
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 250, damping: 18 }}
        >
          <img src={project.image} alt={project.title} className="project-img" />

          <div className="project-info">
            <h2>{project.title}</h2>
            <p>{project.description}</p>

            <div className="buttons-wrapper">
              <motion.a
                href={project.liveLink}
                className="gradient-border-btn"
                target={project.liveLink.startsWith("http") ? "_blank" : undefined}
                rel={project.liveLink.startsWith("http") ? "noopener noreferrer" : undefined}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
              >
                <FiExternalLink /> Live Demo
              </motion.a>

              <motion.a
                href={project.codeLink}
                className="button-2"
                target={project.codeLink.startsWith("http") ? "_blank" : undefined}
                rel={project.codeLink.startsWith("http") ? "noopener noreferrer" : undefined}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
              >
                <FaGithub /> GitHub
              </motion.a>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
};

export default Project;
