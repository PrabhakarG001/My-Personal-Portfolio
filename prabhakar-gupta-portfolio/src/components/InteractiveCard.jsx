import { motion } from "framer-motion";

const InteractiveCard = ({ children, className = "", style = {}, ...props }) => {
  return (
    <motion.article
      className={`universal-card ${className}`}
      style={style}
      {...props}
    >
      <div className="hover-bubble">
        <svg 
          className="hover-arrow" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>
      {children}
    </motion.article>
  );
};

export default InteractiveCard;
