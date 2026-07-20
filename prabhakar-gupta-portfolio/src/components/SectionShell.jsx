import React from "react";
import "./SectionShell.css";

/** Simple layout wrapper */
export default function SectionShell({ id, chip, title, children }) {
  return (
    <section id={id} className="section-shell">
      {chip && (
        <div className="section-chip">{chip}</div>
      )}
      {title && (
        <h2 className="section-title">{title}</h2>
      )}
      {children}
    </section>
  );
}
