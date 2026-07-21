import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import "./project.css";

const projects = [
  {
    title: "IntellixAI",
    image: "/IntellixAI.png",
    description:
      "IntellixAI is an AI-powered application that delivers intelligent responses using the Nvidia Nemotron API and Firebase. It is designed to provide fast, context-aware outputs with a smooth and responsive user experience, showcasing my ability to integrate modern AI services into real-world applications. It reflects strong skills in API integration, performance optimization, and intelligent system design. The project demonstrates my understanding of building AI-driven solutions with modern cloud technologies and scalable architectures.",
    liveLink: "#typewriter",
    codeLink: "#contact",
  },
  {
    title: "MeetSphere",
    image: "/Meetsphere.png",
    description:
      "MeetSphere is a real-time video conferencing application developed using the MERN stack, WebRTC, and Socket.io. It enables seamless live audio-video communication with efficient data handling and low latency, demonstrating my ability to build scalable and interactive real-time systems. It showcases expertise in real-time networking, synchronization, and user-centric application design. The project highlights my experience in implementing complex communication features and developing reliable real-time applications.",
    liveLink: "#typewriter",
    codeLink: "https://github.com/PrabhakarG001/MeetSphere",
  },
  {
    title: "StayVerse",
    image: "/StayVerse.png",
    description:
      "StayVerse is a smart hotel discovery platform built using Node.js, Express, EJS, and MongoDB. It is designed to deliver a seamless browsing experience with dynamic data rendering, efficient backend processing, and a clean, responsive interface, highlighting my ability to build scalable full-stack applications. It emphasizes performance, usability, and structured data management in a real-world use case. The project showcases my ability to design complete web solutions with interactive features and optimized user experiences.",
    liveLink: "#typewriter",
    codeLink: "#contact",
  },
  {
    title: "My Personal Portfolio Website",
    image: "/Portfolio.png",
    description:
      "My portfolio website is a personal project built to showcase my skills, projects, and development journey. It features a modern UI, responsive design, smooth interactions, and EmailJS integration for communication, demonstrating my focus on user experience and professional frontend development. It also reflects my attention to detail, design consistency, and clean code practices. The website represents my personal brand while providing an interactive platform to highlight my technical expertise and achievements.",
    liveLink: "#typewriter",
    codeLink: "https://github.com/PrabhakarG001/My-Personal-Portfolio",
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
