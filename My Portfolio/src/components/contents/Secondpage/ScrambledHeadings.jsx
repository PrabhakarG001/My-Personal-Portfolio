import ScrambledText from "./ScrambledText.jsx";
const ScrambledHeadings = () => {
  return (
  <>
    <div className="relative h-screen w-full">
      <ScrambledText className="text-block" style={{ top: "42.2rem" }}>
        About Me
      </ScrambledText>

      <ScrambledText className="text-block" style={{ top: "120rem" }}>
        My Skills
      </ScrambledText>
      <ScrambledText className="text-block" style={{ top: "180rem"}}>
       Soft Skills
      </ScrambledText>
      <ScrambledText className="text-block" style={{ top: "214rem" }}>
      Featured Projects
      </ScrambledText>
      <ScrambledText className="text-block" style={{ top: "279.5rem" }}>
       Career Goals
      </ScrambledText>
      <ScrambledText className="text-block" style={{ top: "319.5rem" }}>
      Resume
      </ScrambledText>
      <ScrambledText className="text-block" style={{ top: "353rem" }}>
    Get In Touch
      </ScrambledText>
    </div></>
  );
};

export default ScrambledHeadings;