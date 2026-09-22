import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

/*
 * Floating glass "pill" navigation bar.
 * - Sticky/fixed, centered near the top of the viewport
 * - Pure Flexbox layout inside the pill
 * - CSS hover dropdowns (About / Profiles) with :focus-within support
 * - Active section tracking (scroll-spy) with a floating highlight
 * - Mobile: hamburger toggles a dropdown overlay
 */

const NAV_ITEMS = [
  {
    key: "about",
    label: "About",
    sectionId: "about",
    activeIds: ["about", "experience", "skills", "edge", "goals"],
    children: [
      { id: "experience", label: "Experience" },
      { id: "skills", label: "Skills" },
      { id: "goals", label: "Goals" },
    ],
  },
  { key: "projects", label: "Projects", sectionId: "projects" },
  {
    key: "profiles",
    label: "Profiles",
    sectionId: "coding-profiles",
    activeIds: ["coding-profiles", "courses", "certifications"],
    children: [
      { id: "courses", label: "Courses" },
      { id: "certifications", label: "Certifications" },
      { id: "coding-profiles", label: "Coding Profiles" },
    ],
  },
  { key: "resume", label: "Resume", sectionId: "resume" },
];

const SPY_IDS = [
  "typewriter",
  "about",
  "experience",
  "skills",
  "edge",
  "projects",
  "coding-profiles",
  "courses",
  "certifications",
  "goals",
  "resume",
  "contact",
];

const MOBILE_GROUPS = [
  {
    label: "About",
    links: [
      { id: "about", label: "About Me" },
      { id: "experience", label: "Experience" },
      { id: "skills", label: "Skills" },
      { id: "goals", label: "Goals" },
    ],
  },
  { label: "Explore", links: [{ id: "projects", label: "Projects" }] },
  {
    label: "Profiles",
    links: [
      { id: "coding-profiles", label: "Coding Profiles" },
      { id: "courses", label: "Courses" },
      { id: "certifications", label: "Certifications" },
    ],
  },
  { label: "More", links: [{ id: "resume", label: "Resume" }] },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("typewriter");
  const [scrolled, setScrolled] = useState(false);

  // Scroll-spy across all sections
  useEffect(() => {
    let ticking = false;

    const updateActiveFromScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setScrolled(scrollY > 40);

      const sections = SPY_IDS.map((id) => ({ id, element: document.getElementById(id) })).filter(
        (section) => section.element
      );
      if (!sections.length) return;

      const viewportHeight = window.innerHeight || 0;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY <= 2) {
        setActiveSection("typewriter");
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
        if (sectionTop <= probeY) nextActiveId = id;
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

  // Lock body scroll while the mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const isItemActive = (item) =>
    item.sectionId === activeSection || item.activeIds?.includes(activeSection);

  return (
    <header className={styles.header}>
      <nav
        className={`${styles.pill} ${scrolled ? styles.pillScrolled : ""}`}
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <button
          type="button"
          className={styles.logo}
          onClick={() => scrollToSection("typewriter")}
          aria-label="Prabhakar Gupta — back to top"
        >
          Prabhakar&nbsp;Gupta
        </button>

        {/* Desktop center links */}
        <ul className={styles.centerLinks}>
          <li className={styles.centerItem}>
            <button
              type="button"
              className={`${styles.link} ${
                activeSection === "typewriter" ? styles.linkActive : ""
              }`}
              onClick={() => scrollToSection("typewriter")}
            >
              Home
            </button>
          </li>

          {NAV_ITEMS.map((item) =>
            item.children ? (
              <li key={item.key} className={`${styles.centerItem} ${styles.hasDropdown}`}>
                <button
                  type="button"
                  className={`${styles.link} ${isItemActive(item) ? styles.linkActive : ""}`}
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={() => scrollToSection(item.sectionId)}
                >
                  {item.label}
                  <span className={styles.caret} aria-hidden="true" />
                </button>

                {/* Pure CSS hover / focus dropdown */}
                <div className={styles.dropdown} role="menu">
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      type="button"
                      role="menuitem"
                      className={`${styles.dropdownLink} ${
                        activeSection === child.id ? styles.dropdownLinkActive : ""
                      }`}
                      onClick={() => scrollToSection(child.id)}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              </li>
            ) : (
              <li key={item.key} className={styles.centerItem}>
                <button
                  type="button"
                  className={`${styles.link} ${isItemActive(item) ? styles.linkActive : ""}`}
                  onClick={() => scrollToSection(item.sectionId)}
                >
                  {item.label}
                </button>
              </li>
            )
          )}
        </ul>

        {/* Desktop CTA */}
        <button
          type="button"
          className={styles.cta}
          onClick={() => scrollToSection("contact")}
        >
          Contact
        </button>

        {/* Mobile hamburger */}
        <button
          type="button"
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-overlay"
        >
          <span className={styles.hamburgerLine} aria-hidden="true" />
          <span className={styles.hamburgerLine} aria-hidden="true" />
        </button>
      </nav>

      {/* Mobile dropdown overlay */}
      <div
        id="mobile-nav-overlay"
        className={`${styles.mobileOverlay} ${menuOpen ? styles.mobileOverlayOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileInner}>
          <button
            type="button"
            className={`${styles.mobileLink} ${
              activeSection === "typewriter" ? styles.mobileLinkActive : ""
            }`}
            onClick={() => scrollToSection("typewriter")}
            tabIndex={menuOpen ? 0 : -1}
          >
            Home
          </button>

          {MOBILE_GROUPS.map((group) => (
            <div key={group.label} className={styles.mobileGroup}>
              <p className={styles.mobileGroupLabel}>{group.label}</p>
              {group.links.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  className={`${styles.mobileLink} ${
                    activeSection === link.id ? styles.mobileLinkActive : ""
                  }`}
                  onClick={() => scrollToSection(link.id)}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {link.label}
                </button>
              ))}
            </div>
          ))}

          <button
            type="button"
            className={styles.mobileCta}
            onClick={() => scrollToSection("contact")}
            tabIndex={menuOpen ? 0 : -1}
          >
            Contact
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
