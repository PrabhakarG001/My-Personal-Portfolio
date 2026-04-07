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
import c from "../../../assets/c.svg";
import windows from "../../../assets/windows.svg";
import vscode from "../../../assets/vscode.svg";
import hoppscotch from "../../../assets/hoppscotch.svg";
import figma from "../../../assets/figma.svg";
// import sql from "../../../assets/sql.svg";
import mysql from "../../../assets/mysql.svg";
// import python from "../../../assets/python.svg";
// import typescript from "../../../assets/typescript.svg";
// import vercel from "../../../assets/vercel.svg";


const techStack1 = [
  { name: "HTML 5 -", logo: html, type: "Frontend" },
  { name: "CSS 3 -", logo: css3, type: "Frontend" },
  { name: "JavaScript-", logo: javascript, type: "Frontend" },
  { name: "MongoDB -", logo: mongodb, type: "Database" },
  { name: "Express -", logo: expressjs, type: "Backend" },
  { name: "Reactjs -", logo: reactjs, type: "Frontend" },
  { name: "Nodejs -", logo: nodejs, type: "Backend" },
  { name: "Java -", logo: java, type: "Language" },
  { name: "C++ ", logo: cpp, type: "Language" },
   { name: "C ", logo: c, type: "Language" },
  // { name: "Python -", logo: python, type: "Language" },
  // { name: "Typescript ", logo: typescript, type: "Language" },
  

];

const techStack2 = [
  { name: "Figma ", logo: figma },
  { name: "Windows", logo: windows },
  { name: "Vscode", logo: vscode},
  // { name: "vercel", logo: vercel},
  { name: "Hoppscotch", logo: hoppscotch},
  // { name: "sql", logo: sql },
  { name: "mysql", logo: mysql },
];

const TechStackCard = () => {
  return (
    <>
      <div className="techstack-container">
        {techStack1.map((tech, index) => (
          <div className="tech-card" key={index}>
         <div className="tech-inner">
         <div className="tech-front">
         <img src={tech.logo} alt={tech.name} className="tech-logo" />
         </div>
         </div>
         </div>
        ))}
      </div>

      <div className="extra-tech-container">
        {techStack2.map((tech, index) => (
        <div className="tech-card" key={index}>
        <div className="tech-inner">
        <div className="tech-front">
        <img src={tech.logo} alt={tech.name} className="tech-logo" />
        </div>
        </div>
        </div>
        ))}
      </div>
    </>
  );
};

export default TechStackCard;