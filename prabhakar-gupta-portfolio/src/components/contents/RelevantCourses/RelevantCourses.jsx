import { motion } from "framer-motion";
import { FaBookOpen } from "react-icons/fa";
import { FaCode, FaServer, FaBrain, FaInfinity } from "react-icons/fa";
import InteractiveCard from "../../InteractiveCard.jsx";
import { relevantCourses } from "../../../config/relevantCoursesConfig.js";
import "./RelevantCourses.css";

const COURSE_ICONS = {
  "full-stack-development": FaCode,
  dsa: FaInfinity,
  "ai-ml": FaBrain,
  devops: FaServer,
};

const cardReveal = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: (index = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay: (index % 4) * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
};

const RelevantCourses = () => {
  return (
    <div className="relevant-courses-grid">
      {relevantCourses.map((course, index) => {
        const Icon = COURSE_ICONS[course.id] || FaBookOpen;
        return (
          <InteractiveCard
            key={course.id}
            className="course-card"
            variants={cardReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.18, margin: "-20px" }}
            custom={index}
          >
            <div className="course-head">
              <span className="course-icon" aria-hidden="true">
                <Icon />
              </span>
              <div className="course-head-text">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-period">{course.period}</p>
              </div>
              <span
                className={`course-status ${course.status === "Ongoing" ? "ongoing" : "completed"}`}
              >
                {course.status}
              </span>
            </div>

            <p className="course-desc">{course.description}</p>

            <div className="course-tags">
              {course.tags.map((tag) => (
                <span key={tag} className="course-tag">
                  {tag}
                </span>
              ))}
            </div>
          </InteractiveCard>
        );
      })}
    </div>
  );
};

export default RelevantCourses;
