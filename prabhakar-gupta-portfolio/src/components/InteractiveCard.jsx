import { motion } from "framer-motion";

const InteractiveCard = ({ children, className = "", style = {}, ...props }) => {
  return (
    <motion.article
      className={`universal-card ${className}`}
      style={style}
      {...props}
    >
      {children}
    </motion.article>
  );
};

export default InteractiveCard;
