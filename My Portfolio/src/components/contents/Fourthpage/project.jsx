"use client";
import "./project.css";
import { FiExternalLink } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

const ProjectOne = () => (
  <div className="project-container one">
    <img src="/project1.png" alt="Project One" className="project-img"/>
    <div className="project-info">
      <h2>My Personal Porfolio Website</h2>
      <p>
  A fully responsive and modern portfolio website built using <span className="highlight-white"> React, Tailwind CSS</span> and <span className="highlight-white">JavaScript. </span> It includes animated scroll effects, reusable components, and clean layout design. The site highlights my technical skills, personal projects, certifications, and contact details. It also features smooth navigation, interactive hover effects, and optimized loading for better performance. Ideal for recruiters and collaborators to explore my work and connect professionally.
</p> <div className="buttons-wrapper">
      <a href="#projects" className="gradient-border-btn"><FiExternalLink /> Live Demo</a>
      <a href="#contact" className="button-2"> <FaGithub /> Github</a>
    </div>
    </div>
  </div>
);

const ProjectTwo = () => (
  <div className="project-container two">
    <img
      src="projecttwo.png"
      alt="Project Two"
      className="project-img"
    />
    <div className="project-info">
      <h2>Classis Tic-Toc-Toe Game</h2>
      <p>This Tic Tac Toe game was developed using <span className="highlight-white">only HTML, CSS, </span> and <span className="highlight-white">JavaScript. </span> It supports two-player gameplay with turn tracking, win condition detection, and an automatic reset option. The layout adapts to various screen sizes, providing a smooth experience on mobile and desktop devices. The project highlights core JavaScript logic handling and DOM manipulation without any external libraries.</p>
      <div className="buttons-wrapper">
      <a href="https://prabhakarg001.github.io/Tic-Toc-Toe-Game/" target="_blank" rel="noopener noreferrer"  className="gradient-border-btn"> <FiExternalLink /> Live Demo</a>
       <a href="https://github.com/PrabhakarG001/Tic-Toc-Toe-Game" target="_blank" rel="noopener noreferrer" className="button-2"> <FaGithub /> Github</a>
    </div>
    </div>
  </div>
);

const Project = () => {
  return (
    <div className="project-wrapper">
      <ProjectOne />
      <ProjectTwo />
    </div>
  );
};

export default Project;