import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import "./Navbar.css";

const navItems = [
  { id: "typewriter", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "edge", label: "Edge" },
  { id: "projects", label: "Projects" },
  { id: "goals", label: "Goals" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("typewriter");

  useEffect(() => {
    let ticking = false;

    const updateActiveFromScroll = () => {
      const sections = navItems
        .map((item) => ({ id: item.id, element: document.getElementById(item.id) }))
        .filter((section) => section.element);

      if (!sections.length) return;

      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight || 0;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY <= 2) {
        setActiveSection(sections[0].id);
        return;
      }

      if (scrollY + viewportHeight >= docHeight - 2) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      const probeY = scrollY + Math.max(120, viewportHeight * 0.28);
      let nextActiveId = sections[0].id;

      sections.forEach(({ id, element }) => {
        const sectionTop = element.getBoundingClientRect().top + scrollY;
        if (sectionTop <= probeY) {
          nextActiveId = id;
        }
      });

      setActiveSection((previous) => (previous === nextActiveId ? previous : nextActiveId));
    };

    const handleScrollChange = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        updateActiveFromScroll();
        ticking = false;
      });
    };

    updateActiveFromScroll();
    window.addEventListener("scroll", handleScrollChange, { passive: true });
    window.addEventListener("resize", handleScrollChange);

    return () => {
      window.removeEventListener("scroll", handleScrollChange);
      window.removeEventListener("resize", handleScrollChange);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 940) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <nav className="site-nav glass-nav">
        <button type="button" className="brand" onClick={() => scrollToSection("typewriter")}
          aria-label="Go to Home"
        >
          Prabhakar Gupta
        </button>

        <ul className="desktop-nav">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <motion.button
          type="button"
          className="mobile-toggle"
          whileTap={{ scale: 0.93 }}
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.div
              className="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              className="mobile-menu glass-nav"
              initial={{ opacity: 0, y: -18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`mobile-link ${activeSection === item.id ? "active" : ""}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
