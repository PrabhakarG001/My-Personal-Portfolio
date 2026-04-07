import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("typewriter");

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const sectionIds = [
      "typewriter",
      "about",
      "skills",
      "projects",
      "goals",
      "resume",
      "contact",
    ];

    const handleScroll = () => {
      let current = "";
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top >= 0 && top < window.innerHeight / 2) {
            current = id;
          }
        }
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav className={menuOpen ? "open" : ""}>
        <a href="#home" className="title">
          Prabhakar Gupta
        </a>
        <div className="menu" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <a
              className={activeSection === "typewriter" ? "active" : ""}
              onClick={() => scrollToSection("typewriter")}
            >
              Home
            </a>
          </li>
          <li>
            <a
              className={activeSection === "about" ? "active" : ""}
              onClick={() => scrollToSection("about")}
            >
              About
            </a>
          </li>
          <li>
            <a
              className={activeSection === "skills" ? "active" : ""}
              onClick={() => scrollToSection("skills")}
            >
              Skills
            </a>
          </li>
          <li>
            <a
              className={activeSection === "projects" ? "active" : ""}
              onClick={() => scrollToSection("projects")}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              className={activeSection === "goals" ? "active" : ""}
              onClick={() => scrollToSection("goals")}
            >
              Goals
            </a>
          </li>
          <li>
            <a
              className={activeSection === "resume" ? "active" : ""}
              onClick={() => scrollToSection("resume")}
            >
              Resume
            </a>
          </li>
          <li>
            <a
              className={activeSection === "contact" ? "active" : ""}
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;