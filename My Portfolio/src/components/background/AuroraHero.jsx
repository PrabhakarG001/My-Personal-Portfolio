import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { FiEye} from "react-icons/fi";
import { FiDownload} from "react-icons/fi";
import { FiMail} from "react-icons/fi"

import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import "./AuroraHero.css";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  const buttonStyle = {
    border,
    boxShadow,
  };

  return (<>
    <motion.section style={{ backgroundImage }} className="aurora-hero">
      <div className="aurora-canvas">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>


 <div className="button-container">
    <div><motion.button
        style={{ ...buttonStyle, marginTop: "31.2rem", marginLeft: "36.5%" }}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        className="aurora-button"
        onClick={() => {
        const section = document.getElementById("projects");
        if (section) section.scrollIntoView({ behavior: "smooth" });
        }}>View Projects
        <FiArrowRight className="aurora-icon" />
        </motion.button>

        <motion.button
        style={{ ...buttonStyle, marginTop: "31.2rem", marginLeft: "52.2%" }}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        className="aurora-button"
        onClick={() => {
        const section = document.getElementById("contact");
        if (section) section.scrollIntoView({ behavior: "smooth" });
         }}>Let's Connect
       <FiMail className="aurora-icon" />
        </motion.button>

        <motion.button onClick={()=> window.open("https://drive.google.com/file/d/1eAxQg-FIbvEfF6uRT-5J3akm_JvbOhFz/view")
        }
          // style={{ ...buttonStyle, marginTop: "340rem", marginLeft: "38%" }}
          
           style={{ ...buttonStyle, marginTop: "342rem", marginLeft: "38%" }}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="aurora-button" >Veiw Online
          <FiEye className="aurora-icon" />
        </motion.button>

        <motion.button
          // style={{ ...buttonStyle, marginTop: "340rem", marginLeft: "54%"  }}
          style={{ ...buttonStyle, marginTop: "342rem", marginLeft: "54%"  }}

          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="aurora-button">Download CV 
          <FiDownload className="aurora-icon" />
        </motion.button></div></div>
    </>
  );
};

export default AuroraHero;