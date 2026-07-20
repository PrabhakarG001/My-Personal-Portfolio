import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import "./TechStackCard.css";

import html from "../../../assets/html.svg";
import css3 from "../../../assets/css3.svg";
import javascript from "../../../assets/javascript.svg";
import mongodb from "../../../assets/mongodb.svg";
import expressjs from "../../../assets/expressjs.svg";
import reactjs from "../../../assets/reactjs.svg";
import nodejs from "../../../assets/nodejs.svg";
import java from "../../../assets/java.svg";
import cpp from "../../../assets/cpp.svg";
import windows from "../../../assets/windows.svg";
import vscode from "../../../assets/vscode.svg";
import render from "../../../assets/render.svg";
import mysql from "../../../assets/mysql.svg";
import python from "../../../assets/python.svg";
import vercel from "../../../assets/vercel.svg";
import tailwindcss from "../../../assets/tailwindcss.svg";
import firebase from "../../../assets/firebase.svg";


const techStack1 = [
  { name: " ", logo: html, type: "" },
  { name: "", logo: css3, type: "" },
  { name: "", logo: javascript, type: "" },
  { name: "", logo: mongodb, type: "" },
  { name: "", logo: expressjs, type: "" },
  { name: "", logo: reactjs, type: "" },
  { name: "", logo: nodejs, type: "" },
  { name: "", logo: java, type: "" },
  { name: "", logo: cpp, type: "" },
  { name: "", logo: python, type: "" },
  { name: "", logo: tailwindcss, type: "" },
];

const techStack2 = [
  { name: "", logo: render },
  { name: "", logo: firebase },
  { name: "", logo: vercel },
  { name: "", logo: vscode },
  { name: "", logo: windows },
  { name: "", logo: mysql },
];

const techCardReveal = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] },
  }),
};

const TechCard = ({ logo, name, type, index = 0 }) => {
  return (
    <motion.article
      className="universal-card tech-card"
      variants={techCardReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      custom={index}
      whileTap={{ scale: 0.98 }}
    >
      <img src={logo} alt={name} className="tech-logo" />
      <p className="tech-name">{name}</p>
      {type ? <span className="tech-type">{type}</span> : null}
    </motion.article>
  );
};

const TechStackCard = () => {
  return (
    <div className="techstack-layout">
      <motion.div
        className="techstack-section"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.26 }}
        transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className="techstack-title">Core Stack</h3>
        <div className="techstack-grid core-grid">
          {techStack1.map((tech, index) => (
            <TechCard key={index} index={index} {...tech} />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="techstack-section"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.26 }}
        transition={{ duration: 0.58, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className="techstack-title">Tools I Use</h3>
        <div className="techstack-grid tools-grid">
          {techStack2.map((tech, index) => (
            <TechCard key={index} index={4 + index} {...tech} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TechStackCard;
