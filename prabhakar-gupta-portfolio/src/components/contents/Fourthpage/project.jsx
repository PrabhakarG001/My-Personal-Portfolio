import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import "./project.css";

const projects = [
  {
    title: "IntellixAI",
    image: "/IntellixAI.png",
    description:
      "IntellixAI is an AI-powered application that delivers intelligent responses using the Nvidia Nemotron API and Firebase. It is designed to provide fast, context-aware outputs with a smooth and responsive user experience, showcasing my ability to integrate modern AI services into real-world applications.",
    liveLink: "#typewriter",
    codeLink: "#contact",
  },
  {
    title: "MeetSphere",
    image: "/Meetsphere.png",
    description:
      "MeetSphere is a real-time video conferencing application developed using the MERN stack, WebRTC, and Socket.io. It enables users to join virtual meetings with live audio-video communication, demonstrating my skills in building scalable real-time systems.",
    liveLink: "#typewriter",
    codeLink: "#contact",
  },
  {
    title: "StayVerse",
    image: "/StayVerse.png",
    description:
      "StayVerse is a smart hotel discovery platform built using Node.js, Express, EJS, and MongoDB. It features a clean, responsive UI with dynamic data rendering and an optimized backend for fast and reliable performance. The platform allows users to seamlessly explore, search, and interact with hotel listings, highlighting strong full-stack development, efficient data handling, and user-focused design.",
    liveLink: "#typewriter",
    codeLink: "#contact",
  },
  {
    title: "My Personal Portfolio Website",
    image: "/Portfolio.png",
    description:
      "A fully responsive and modern portfolio website built using React, Tailwind CSS and JavaScript. It includes animated scroll effects, reusable components, and a clean layout that highlights my technical skills and projects.",
    liveLink: "#typewriter",
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

const ProjectCard = ({ project, index }) => {
  return (
    <motion.article
      className="universal-card project-container"
      variants={projectReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.22 }}
      custom={index}
    >
      <img src={project.image} alt={project.title} className="project-img" />

      <div className="project-info">
        <h2>{project.title}</h2>
        <p>{project.description}</p>

        <div className="buttons-wrapper">
          <a
            href={project.liveLink}
            className="gradient-border-btn arrow-btn-container eyeball-target"
            target={project.liveLink.startsWith("http") ? "_blank" : undefined}
            rel={project.liveLink.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            <FiExternalLink className="arrow-icon eyeball-icon" /> Live Demo
          </a>

          <a
            href={project.codeLink}
            className="button-2 eyeball-target"
            target={project.codeLink.startsWith("http") ? "_blank" : undefined}
            rel={project.codeLink.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            <FaGithub className="eyeball-icon" /> GitHub
          </a>
        </div>
      </div>
    </motion.article>
  );
};

const Project = () => {
  return (
    <div className="project-wrapper">
      {projects.map((project, index) => (
        <ProjectCard key={project.title} project={project} index={index} />
      ))}
    </div>
  );
};

export default Project;
