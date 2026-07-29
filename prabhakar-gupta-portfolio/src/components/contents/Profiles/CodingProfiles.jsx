import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaArrowRight } from "react-icons/fa";
import { SiLeetcode, SiCodeforces } from "react-icons/si";
import InteractiveCard from "../../InteractiveCard.jsx";
import AuroraHero, { AuroraButton } from "../../background/AuroraHero.jsx";
import "./CodingProfiles.css";

const profileReveal = {
  hidden: { opacity: 0, y: 34, scale: 0.98 },
  show: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.62, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const formatDate = (timestamp) => {
  if (!timestamp) return "N/A";
  const date = new Date(timestamp * 1000);
  return date.toLocaleString("default", { month: "short", year: "numeric" });
};

const CodingProfiles = () => {
  const [lcData, setLcData] = useState(null);
  const [cfData, setCfData] = useState(null);

  const [loading, setLoading] = useState({
    lc: true,
    cf: true,
  });

  const USERNAME = "PrabhakarG001"; // Unified username

  useEffect(() => {
    const safeJson = async (res) => {
      if (!res || !res.ok) return {};
      try {
        return await res.json();
      } catch {
        return {};
      }
    };

    const fetchLeetCode = async () => {
      try {
        const timestamp = Date.now();
        
        // Primary API for stable, high-rate-limit stats
        const mainRes = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${USERNAME}`).catch(() => null);
        const mainData = await safeJson(mainRes);
        
        // Secondary API for contest data (often rate limited, handled gracefully)
        const contestRes = await fetch(`https://alfa-leetcode-api.onrender.com/${USERNAME}/contest?t=${timestamp}`).catch(() => null);
        const contestData = await safeJson(contestRes);

        let acceptance = "N/A";
        let recentAC = mainData?.recentSubmissions?.length || 0;
        
        if (mainData && mainData.totalSubmissions && mainData.totalSubmissions[0]) {
           const allDiff = mainData.totalSubmissions[0];
           if (allDiff.submissions > 0) {
              acceptance = ((allDiff.count / allDiff.submissions) * 100).toFixed(1) + "%";
           }
        }

        setLcData({
          solvedProblem: mainData?.totalSolved || 0,
          easySolved: mainData?.easySolved || 0,
          mediumSolved: mainData?.mediumSolved || 0,
          hardSolved: mainData?.hardSolved || 0,
          globalRank: mainData?.ranking || "N/A",
          contestRating: contestData?.contestRating ? Math.round(contestData.contestRating) : "-",
          totalContests: contestData?.contestAttend || 0,
          acceptance,
          recentAC
        });
      } catch (err) {
        console.error("Error fetching LeetCode:", err);
      } finally {
        setLoading((prev) => ({ ...prev, lc: false }));
      }
    };

    const fetchCodeforces = async () => {
      try {
        const timestamp = Date.now();
        const res = await fetch(`https://codeforces.com/api/user.info?handles=${USERNAME}&t=${timestamp}`);
        const data = await safeJson(res);
        if (data.status === "OK" && data.result?.length > 0) {
          const user = data.result[0];
          setCfData({
            rating: user.rating || 0,
            maxRating: user.maxRating || 0,
            rank: user.rank || "unrated",
            friendOfCount: user.friendOfCount || 0,
            joined: formatDate(user.registrationTimeSeconds),
            lastActive: formatDate(user.lastOnlineTimeSeconds),
          });
        }
      } catch (err) {
        console.error("Error fetching Codeforces:", err);
      } finally {
        setLoading((prev) => ({ ...prev, cf: false }));
      }
    };

    fetchLeetCode();
    fetchCodeforces();

    const interval = setInterval(() => {
      fetchLeetCode();
      fetchCodeforces();
    }, 300000); // Poll every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="coding-profiles-wrapper">

      {/* LeetCode Card */}
      <InteractiveCard
        className="profile-card-new leetcode-card"
        variants={profileReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.22 }}
        custom={1}
      >
        <div className="card-content-new">
          <div className="profile-header-new" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="header-icon-wrapper" style={{ borderColor: 'rgba(234, 179, 8, 0.3)' }}>
                <SiLeetcode style={{ color: '#eab308' }} />
              </div>
              <div className="profile-titles" style={{ marginBottom: 0 }}>
                <h2>LeetCode</h2>
                <p>@{USERNAME}</p>
              </div>
            </div>
            <span className="live-badge">LIVE NOW</span>
          </div>

          {loading.lc ? (
            <div className="skeleton-primary skeleton-box"></div>
          ) : (
            <div className="primary-stat">{lcData?.solvedProblem} solved</div>
          )}

          {loading.lc ? (
            <div className="sub-stats-grid">
              <div className="skeleton-box" style={{height: 50}}></div>
              <div className="skeleton-box" style={{height: 50}}></div>
              <div className="skeleton-box" style={{height: 50}}></div>
            </div>
          ) : (
            <div className="sub-stats-grid">
              <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(34, 197, 94, 0.5)' }}>
                <span className="sub-stat-label">EASY</span>
                <span className="sub-stat-value" style={{ color: '#22c55e' }}>{lcData?.easySolved}</span>
              </div>
              <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(234, 179, 8, 0.5)' }}>
                <span className="sub-stat-label">MEDIUM</span>
                <span className="sub-stat-value" style={{ color: '#eab308' }}>{lcData?.mediumSolved}</span>
              </div>
              <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(239, 68, 68, 0.5)' }}>
                <span className="sub-stat-label">HARD</span>
                <span className="sub-stat-value" style={{ color: '#ef4444' }}>{lcData?.hardSolved}</span>
              </div>
            </div>
          )}

          <p className="desc-text">
            DSA practice snapshot with ranking and contest context.
          </p>

          <div className="skills-tags" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <span style={{ padding: '4px 10px', background: 'rgba(234, 179, 8, 0.1)', color: '#eab308', borderRadius: '12px', fontSize: '0.75rem', border: '1px solid rgba(234, 179, 8, 0.2)' }}>Algorithms</span>
            <span style={{ padding: '4px 10px', background: 'rgba(234, 179, 8, 0.1)', color: '#eab308', borderRadius: '12px', fontSize: '0.75rem', border: '1px solid rgba(234, 179, 8, 0.2)' }}>Data Structures</span>
            <span style={{ padding: '4px 10px', background: 'rgba(234, 179, 8, 0.1)', color: '#eab308', borderRadius: '12px', fontSize: '0.75rem', border: '1px solid rgba(234, 179, 8, 0.2)' }}>Dynamic Programming</span>
          </div>

          <div className="divider-container">
            <div className="divider-dots">
              <div className="dot green"></div>
              <div className="dot yellow"></div>
              <div className="dot red"></div>
            </div>
            <span className="divider-label">DIFFICULTY SPLIT SYNCED</span>
          </div>

          <div className="details-box">
             {loading.lc ? (
              <div className="skeleton-box" style={{height: 60}}></div>
            ) : (
              <>
                <p>Global rank: <strong>#{lcData?.globalRank}</strong></p>
                <p>Contest rating: <strong>{lcData?.contestRating}</strong> | Contests: <strong>{lcData?.totalContests}</strong></p>
                <p>Acceptance: <strong>{lcData?.acceptance}</strong> | Recent AC: <strong>{lcData?.recentAC}</strong></p>
              </>
            )}
          </div>

          <div className="card-footer-new">
            <AuroraButton href={`https://leetcode.com/${USERNAME}/`} target="_blank" rel="noopener noreferrer" icon={FaArrowRight} className="profile-aurora-btn">
              Open Profile
            </AuroraButton>
          </div>
        </div>
      </InteractiveCard>

      {/* Codeforces Card */}
      <InteractiveCard
        className="profile-card-new codeforces-card"
        variants={profileReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.22 }}
        custom={2}
      >
        <div className="card-content-new">
          <div className="profile-header-new" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="header-icon-wrapper" style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}>
                <SiCodeforces style={{ color: '#3b82f6' }} />
              </div>
              <div className="profile-titles" style={{ marginBottom: 0 }}>
                <h2>Codeforces</h2>
                <p>@{USERNAME}</p>
              </div>
            </div>
            <span className="live-badge">LIVE NOW</span>
          </div>

          {loading.cf ? (
            <div className="skeleton-primary skeleton-box"></div>
          ) : (
            <div className="primary-stat" style={{ color: '#3b82f6', fontSize: cfData?.rating > 0 ? '2.2rem' : '1.8rem' }}>{cfData?.rating > 0 ? `${cfData.rating} Rating` : "Starting Soon..."}</div>
          )}

          {loading.cf ? (
            <div className="sub-stats-grid">
              <div className="skeleton-box" style={{height: 50}}></div>
              <div className="skeleton-box" style={{height: 50}}></div>
              <div className="skeleton-box" style={{height: 50}}></div>
            </div>
          ) : (
            <div className="sub-stats-grid">
              <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(59, 130, 246, 0.5)' }}>
                <span className="sub-stat-label">RANK</span>
                <span className="sub-stat-value" style={{ textTransform: 'capitalize', color: '#3b82f6' }}>{cfData?.rank || "N/A"}</span>
              </div>
              <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(168, 85, 247, 0.5)' }}>
                <span className="sub-stat-label">PEAK</span>
                <span className="sub-stat-value" style={{ color: '#a855f7' }}>{cfData?.maxRating || "N/A"}</span>
              </div>
              <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(236, 72, 153, 0.5)' }}>
                <span className="sub-stat-label">FRIENDS</span>
                <span className="sub-stat-value" style={{ color: '#ec4899' }}>{cfData?.friendOfCount || 0}</span>
              </div>
            </div>
          )}

          <p className="desc-text">
            Competitive programming presence and account activity.
          </p>

          <div className="skills-tags" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <span style={{ padding: '4px 10px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '12px', fontSize: '0.75rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>Competitive Programming</span>
            <span style={{ padding: '4px 10px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '12px', fontSize: '0.75rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>Math</span>
            <span style={{ padding: '4px 10px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '12px', fontSize: '0.75rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>Graph Theory</span>
          </div>

          <div className="divider-container">
            <div className="divider-dots">
              <div className="dot red"></div>
              <div className="dot red"></div>
              <div className="dot red"></div>
            </div>
            <span className="divider-label">CONTEST TRACE AVAILABLE</span>
          </div>

          <div className="details-box">
            {loading.cf ? (
              <div className="skeleton-box" style={{height: 40}}></div>
            ) : (
              <>
                <p>Status: <strong>{cfData?.rank !== 'unrated' ? 'Active' : 'Practice Mode'}</strong></p>
                <p>Member since: <strong>{cfData?.joined}</strong></p>
                <p>Last seen: <strong>{cfData?.lastActive}</strong></p>
              </>
            )}
          </div>

          <div className="card-footer-new">
            <AuroraButton href={`https://codeforces.com/profile/${USERNAME}`} target="_blank" rel="noopener noreferrer" icon={FaArrowRight} className="profile-aurora-btn">
              Open Profile
            </AuroraButton>
          </div>
        </div>
      </InteractiveCard>


    </div>
  );
};

export default CodingProfiles;
