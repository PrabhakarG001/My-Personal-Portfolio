// import React from "react";
import "./Meabout.css";
// import devImage from "./components/contents/Home/BlurText.jsx';"; 
import devImage from "../../../assets/dev.png";
import { FaHandPointRight } from "react-icons/fa";

const Meabout = () => {
  return (
    <div className="meabout-container">
      <div className="meabout-card">
        <div className="meabout-text">
          <p><span className="highlight-white">Hi Everyone, I am</span> <span className="highlight-gradient"><i>Prabhakar Gupta</i></span> <span className="highlight-white">from</span> <span className="highlight-gradient">Uttar Pradesh, India.</span></p>

          <p>I Am Thrilled For Being Enrolled In Software Engineering.</p>
          <p>I'M pursuing B.Tech ( Computer Science and Engineering ) from Dr. A.P.J Abdul Kalam Technical University.</p>
<br/>
<p>I’m a passionate <span className="highlight-gradient"><i>Aspiring Software Engineer </i></span> skilled in <span className="highlight-gradient"><i>Full Stack Development </i></span>  using the <span className="highlight-gradient"><i>MERN Stack.</i></span></p>
<p>With a learning strong foundation in<span className="highlight-gradient"><i> C++, DSA, and both SQL </i></span> and <span className="highlight-gradient"><i>MongoDB,</i></span> I enjoy crafting scalable web solutions.</p>
<p>I love turning ideas into <span className="highlight-gradient"><i>real-world products</i></span> that are both <span className="highlight-gradient"><i>elegant </i></span> and <span className="highlight-gradient"><i>efficient. </i></span></p><br/>


          <p>Apart from <span className="highlight-white">Coding & Brainstorming,</span> some other activities that I love to do!</p>
          <ul>
            <li><FaHandPointRight size={14} color="ffffff"/>  Thinking beyond lines of code.</li>
            <li><FaHandPointRight size={14} color="ffffff"/>  Growing through every challenge.</li>
            <li><FaHandPointRight size={14} color="ffffff"/>  Refining skills, mastering tools mindfully.</li>
          </ul>

          <p className="quote">"Curiosity is my compass, and code is my language of exploration."<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— Prabhakar Gupta</p>
        </div>
        <div className="meabout-image">
          <img src={devImage} alt="Developer" />
        </div>
      </div>
    </div>
  );
};

export default Meabout;