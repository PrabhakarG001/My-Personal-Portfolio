import "./SoftSkills.css";

const SoftSkills = () => {
  const skills = [
    "TEAM WORK",
    "TIME MANAGEMENT",
    "RESPONSIVE",
    "DYNAMIC",
    "SCALABLE",
    "WORK ETHIC",
    "DICISION MAKING",
    "CONFLICT RESOLUTION",
    "COLLABORATIVE",
    "ADAPTABLE",
    "CREATIVE",
    "CRITICAL THINKING",
    "LEADERSHIP",
    "EMOTIONAL INTELLIGENCE",
    "PATIENCE",


  ];

  return (
    <>
    <div className="softskills-wrapper">
      <div className="softskills-track">
        {Array(2).fill(skills).flat().map((skill, index) => (
          <div key={index} className="softskills-item">
            {skill} <span className="star">✦</span>
          </div>
        ))}
      </div>
    </div>
    <div className="stip"></div>
    </>
  );
};

export default SoftSkills;