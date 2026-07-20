import { motion } from "framer-motion";
import { MdMyLocation, MdRocketLaunch, MdTimeline } from "react-icons/md";
import "./Goals.css";
import InteractiveCard from "../../InteractiveCard.jsx";

const goals = [
  {
    title: "Short-Term Goal",
    description:
      "I aim to actively participate in hackathons to challenge myself with real-world problems and collaborate with diverse teams. These experiences will boost my problem-solving skills and expose me to new technologies.",
    Icon: MdRocketLaunch,
  },
  {
    title: "Mid-Term Goal",
    description:
      "I am focused on building impactful projects and securing internships that offer real-world exposure. These experiences will help me sharpen my skills, adapt to team workflows, and grow through mentorship.",
    Icon: MdTimeline,
  },
  {
    title: "Long-Term Goal",
    description:
      "My long-term vision is to evolve into a top-performing software engineer who drives high-impact solutions and contributes through open-source, thought leadership, and mentorship.",
    Icon: MdMyLocation,
  },
];

const goalReveal = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  show: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.62, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Goals = () => {
  return (
    <div className="goals-grid">
      {goals.map(({ title, description, Icon }, index) => (
        <InteractiveCard
          key={title}
          className="goal-card"
          variants={goalReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.22 }}
          custom={index}
        >
          <div className="goal-title-row">
            <Icon className="goal-icon" aria-hidden="true" />
            <h3>{title}</h3>
          </div>
          <p>{description}</p>
        </InteractiveCard>
      ))}
    </div>
  );
};

export default Goals;
