import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FiArrowRight, FiMail } from "react-icons/fi";
import "./App.css";

import SplashCursor from "./components/splashcursor/splashcursor.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import CardNav from "./components/CardNav.jsx";
import Dock from "./components/layout/Dock.jsx";
import Footer from "./components/layout/footer.jsx";
import Scrollbar from "./components/contents/Home/scrollbar.jsx";
import Loader from "./components/Loader.jsx";
import AuroraHero, { AuroraButton } from "./components/background/AuroraHero.jsx";
import SectionShell from "./components/SectionShell.jsx";

import GradientText from "./components/contents/Home/GradientText.jsx";
import Typewriter from "./components/contents/Home/Typewriter.jsx";
import BlurText from "./components/contents/Home/BlurText.jsx";

import Meabout from "./components/contents/Secondpage/Meabout.jsx";
import Certificatecard from "./components/contents/Secondpage/Certificatecard.jsx";
import Achievementcard from "./components/contents/Secondpage/Achievementcard.jsx";
import Availablecard from "./components/contents/Secondpage/Availablecard.jsx";

import TechStackCard from "./components/contents/Thirdpage/TechStackCard.jsx";
import SoftSkills from "./components/contents/Thirdpage/SoftSkills.jsx";


import Project from "./components/contents/Fourthpage/project.jsx";
import Goals from "./components/contents/Fifthpage/Goals.jsx";
import Sixthpage from "./components/contents/Sixthpage/Sixthpage.jsx";

import Form from "./components/contents/Seventhpage/Form.jsx";
import Touchcard from "./components/contents/Seventhpage/Touchcard.jsx";

const sectionReveal = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

function App() {


  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const navItems = [
    {
      label: "Professional Profile",
      bgColor: "rgba(255, 255, 255, 0.05)",
      textColor: "#fff",
      links: [
        { label: "About Me", href: "#about", ariaLabel: "About Me" },
        { label: "Skills", href: "#skills", ariaLabel: "Skills" },
        { label: "Resume", href: "#resume", ariaLabel: "Resume" },
      ],
    },
    {
      label: "Projects and Goals",
      bgColor: "rgba(255, 255, 255, 0.08)",
      textColor: "#fff",
      links: [
        { label: "Featured", href: "#projects", ariaLabel: "Featured Projects" },
        { label: "Goals", href: "#goals", ariaLabel: "Career Goals" },
      ],
    },
    {
      label: "Get In Touch",
      bgColor: "rgba(255, 255, 255, 0.05)",
      textColor: "#fff",
      links: [{ label: "Connect", href: "#contact", ariaLabel: "Connect" }],
    },
  ];

  // Loader overlay state – show on initial load
  const [showLoader, setShowLoader] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 2000); // match total loop duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-shell">
      {/* Scroll progress indicators */}
      <motion.div className="scroll-progress-desktop" style={{ scaleY: scaleProgress }} />
      <motion.div className="scroll-progress-mobile" style={{ scaleX: scaleProgress }} />

      {/* Loader overlay – appears on page open */}
      {showLoader && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}

      <AuroraHero />
      <SplashCursor />
      <Navbar />
      <CardNav
        logo="/logo.png"
        logoAlt="Prabhakar Gupta"
        items={navItems}
        baseColor="rgba(15, 23, 42, 0.85)"
        menuColor="#fff"
        buttonBgColor="#2dd4bf"
        buttonTextColor="#0f172a"
        ease="power3.out"
        className="glass-nav-card"
      />
      <Dock />
      <Scrollbar />

      <main className="app-content">
        <motion.section
          id="typewriter"
          className="hero-shell"
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.45 }}
        >
          <div className="hero-panel">
            <Typewriter />

            <GradientText
              colors={["#40ffaa", "#2dd4bf", "#38bdf8", "#3b82f6", "#40ffaa"]}
              animationSpeed={6}
              showBorder={false}
              className="hero-gradient"
            >
              I Build Modern &amp; Intuitive
              <br />
              <span className="hero-gradient-line">Web Experiences.</span>
            </GradientText>

            <BlurText
              text="I fell in love with programming and kept falling deeper with every bug and breakthrough. I code with passion and design with heart."
              delay={120}
              animateBy="words"
              direction="top"
              className="hero-blur-text"
            />

            <div className="hero-actions">
              <AuroraButton onClick={() => scrollToSection("projects")} icon={FiArrowRight}>
                View Projects
              </AuroraButton>

              <AuroraButton onClick={() => scrollToSection("contact")} icon={FiMail}>
                Let&apos;s Connect
              </AuroraButton>
            </div>
          </div>
        </motion.section>

        <SectionShell id="about" chip="Get to know me" title="About Me">
          <Meabout />

          <div className="about-cards-grid">
            <Certificatecard delay={0.04} />
            <Achievementcard delay={0.14} />
            <Availablecard delay={0.24} />
          </div>
        </SectionShell>

        <SectionShell id="skills" chip="Tech Arsenal" title="My Skills">
          <TechStackCard />
        </SectionShell>

        <SectionShell id="edge" chip="The other edge" title="Soft Skills">
          <SoftSkills />
        </SectionShell>

        <SectionShell id="projects" chip="My recent works" title="Featured Projects">
          <Project />
        </SectionShell>

        <SectionShell id="goals" chip="My Roadmap" title="Career Goals">
          <Goals />
        </SectionShell>

        <SectionShell id="resume" chip="My Professional Background" title="Resume">
          <Sixthpage />
        </SectionShell>

        <SectionShell id="contact" chip="Let&apos;s work together" title="Get In Touch">
          <div className="contact-grid">
            <Touchcard delay={0.04} />
            <Form delay={0.14} />
          </div>
        </SectionShell>
      </main>

      <Footer />
    </div>
  );
}

export default App;
