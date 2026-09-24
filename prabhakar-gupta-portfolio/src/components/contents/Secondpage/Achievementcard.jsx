import "./Achievementcard.css";
import { FaTrophy, FaLaptopCode, FaMedal, FaAward, FaGithub } from "react-icons/fa";
import InteractiveCard from "../../InteractiveCard.jsx";
import { useProfileStats } from "../../../context/ProfileStatsContext.jsx";

const Achievementcard = ({ delay = 0 }) => {
  const { stats, loading } = useProfileStats();
  const lcSolved = stats?.leetcode?.solvedProblem || 0;
  const cdSolved = stats?.codolio?.totalSolved || 0;
  const ghData = stats?.github;

  // Use the maximum of Codolio or LeetCode total, fallback to a loading placeholder
  const solvedText = loading.leetcode ? "..." : Math.max(lcSolved, cdSolved);

  return (
    <InteractiveCard
      className="achievement-card"
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.18 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="header">
        <FaTrophy className="icon trophy" />
        <h2 className="title">Achievements</h2>
      </div>

      <div className="achievement-options">
        <div className="card-option">
          <FaTrophy className="icon blue" />
          <p className="text">
            Secured <strong>2nd Runner-Up</strong> position in Hack The Beginning &rsquo;2K26 among 150+ teams.{" "}
            <a
              href="https://drive.google.com/drive/folders/1DIi-bXqJc4s9x8qNTq3hR_s0g7h39VN3"
              target="_blank"
              rel="noopener noreferrer"
              className="achievement-link"
            >
              [Link]
            </a>
          </p>
        </div>

        <div className="card-option">
          <FaMedal className="icon cyan" />
          <p className="text">
            Earned <strong>Code 50, 100, and 200 Days Badges</strong> on LeetCode through consistent
            problem-solving.
          </p>
        </div>

        <div className="card-option">
          <FaAward className="icon gradient" />
          <p className="text">
            Successfully cleared <strong>Internal Rounds 1 &amp; 2</strong> of the{" "}
            <strong>Smart India Hackathon (SIH)</strong> in both 1st and 2nd year.{" "}
            <a
              href="https://drive.google.com/file/d/1GxtyxuaYWuZKiRPKckke1EG8uhQDaC8U/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="achievement-link"
            >
              [Link]
            </a>
          </p>
        </div>

        <div className="card-option">
          <FaLaptopCode className="icon green" />
          <p className="text">
            <strong>{solvedText} Problems Solved</strong> on LeetCode across diverse topics including arrays,
            trees and graphs.
          </p>
        </div>

        {/* GitHub badges + live activity — real numbers from the live GitHub API, no fabrication */}
        {!ghData?.error && (
          <div className="card-option">
            <FaGithub className="icon" style={{ color: "#a78bfa" }} />
            <div className="gh-badge-block">
              <p className="text">
                {loading.github ? (
                  <strong>Loading GitHub activity...</strong>
                ) : (
                  <>
                    <strong>{ghData?.totalContribs} Contributions</strong> and{" "}
                    <strong>{ghData?.publicRepos} public repos</strong> on GitHub
                    {ghData?.totalStars > 0 && (
                      <>
                        {" "}
                        &bull; <strong>{ghData?.totalStars} stars</strong> earned
                      </>
                    )}
                  </>
                )}
              </p>
              <div className="gh-badges" aria-label="GitHub achievement badges">
                <span className="gh-badge" title="GitHub Pull Shark ×2 achievement">
                  <FaGithub aria-hidden="true" /> Pull Shark &times;2
                </span>
                <span className="gh-badge" title="GitHub YOLO achievement">
                  <FaGithub aria-hidden="true" /> YOLO
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </InteractiveCard>
  );
};

export default Achievementcard;
