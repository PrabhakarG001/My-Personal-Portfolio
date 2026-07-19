"use client";
import "./project.css";
import { FiExternalLink } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

const StayVerse = () => (
  <div className="project-container one">
    <img src="/stayverse.png" alt="StayVerse" className="project-img" />
    <div className="project-info">
      <h2>StayVerse</h2>
      <p>StayVerse is a collaborative virtual workspace platform that enables teams to create immersive rooms, share screens, and brainstorm in real‑time. Built with React, Three.js, and WebRTC for seamless video and 3D interactions.</p>
      <div className="buttons-wrapper">
        <a href="#" className="gradient-border-btn"><FiExternalLink /> Live Demo</a>
        <a href="#" className="button-2"><FaGithub /> Github</a>
      </div>
    </div>
  </div>
);

const MeetSphere = () => (
  <div className="project-container two">
    <img src="/meetsphere.png" alt="MeetSphere" className="project-img" />
    <div className="project-info">
      <h2>MeetSphere</h2>
      <p>MeetSphere is an AI‑powered meeting assistant that records, transcribes, and summarizes video calls. Developed using Next.js, OpenAI APIs, and Tailwind CSS for a clean UI.</p>
      <div className="buttons-wrapper">
        <a href="#" className="gradient-border-btn"><FiExternalLink /> Live Demo</a>
        <a href="#" className="button-2"><FaGithub /> Github</a>
      </div>
    </div>
  </div>
);

const IntellixAI = () => (
  <div className="project-container three">
    <img src="/intellixai.png" alt="IntellixAI" className="project-img" />
    <div className="project-info">
      <h2>IntellixAI</h2>
      <p>IntellixAI is a predictive analytics platform that ingests time‑series data and provides AI‑driven forecasts. Powered by Python FastAPI backend, React frontend, and TensorFlow models.</p>
      <div className="buttons-wrapper">
        <a href="#" className="gradient-border-btn"><FiExternalLink /> Live Demo</a>
        <a href="#" className="button-2"><FaGithub /> Github</a>
      </div>
    </div>
  </div>
);

const Portfolio = () => (
  <div className="project-container four">
    <img src="/portfolio.png" alt="Portfolio" className="project-img" />
    <div className="project-info">
      <h2>My Personal Portfolio</h2>
      <p>A modern, responsive portfolio showcasing my skills, projects, and achievements. Built with React, Tailwind CSS, and GSAP animations for a premium experience.</p>
      <div className="buttons-wrapper">
        <a href="#" className="gradient-border-btn"><FiExternalLink /> Live Demo</a>
        <a href="#" className="button-2"><FaGithub /> Github</a>
      </div>
    </div>
  </div>
);

const Project = () => (
  <div className="project-wrapper">
    <StayVerse />
    <MeetSphere />
    <IntellixAI />
    <Portfolio />
  </div>
);

export default Project;