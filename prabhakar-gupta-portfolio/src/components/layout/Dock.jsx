import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./Dock.css";

export default function Dock() {
  return (
    <div className="dock">
      
      
      
      <a href="https://in.linkedin.com/in/prabhakar-gupta-800383279"target="_blank" rel="noopener noreferrer"  >
        <FaLinkedin className="icon2" />
        <span className="tooltip">LinkedIn</span>
      </a>

      
          <a href="https://github.com/PrabhakarG001" target="_blank" rel="noopener noreferrer">
        <FaGithub className="icon1" />
        <span className="tooltip">GitHub</span>
        </a>

        
    
      <a href="mailto:prabhakarg465@email.com" target="_blank" rel="noopener noreferrer" >
        <FaEnvelope className="icon3" />
        <span className="tooltip">Email</span>
      </a>
    </div>
    
  );
}