import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaArrowRight, FaStar, FaCodeBranch, FaMapMarkerAlt } from "react-icons/fa";
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
  const [ghData, setGhData] = useState(null);

  const [loading, setLoading] = useState({
    lc: true,
    cf: true,
    gh: true,
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
        
        // Primary API for stable, high-rate-limit stats (added cache-busting)
        const mainRes = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${USERNAME}?t=${timestamp}`).catch(() => null);
        let mainData = await safeJson(mainRes);
        
        // Secondary API for contest data (often rate limited, handled gracefully)
        const contestRes = await fetch(`https://alfa-leetcode-api.onrender.com/${USERNAME}/contest?t=${timestamp}`).catch(() => null);
        const contestData = await safeJson(contestRes);

        // Calendar API for streak and active days
        const calendarRes = await fetch(`https://alfa-leetcode-api.onrender.com/${USERNAME}/calendar?t=${timestamp}`).catch(() => null);
        const calendarData = await safeJson(calendarRes);

        // Fallback if primary API is down, rate limited, or returning 0
        if (!mainData || !mainData.totalSolved) {
           const [solvedRes, profileRes, acRes] = await Promise.all([
             fetch(`https://alfa-leetcode-api.onrender.com/${USERNAME}/solved?t=${timestamp}`).catch(() => null),
             fetch(`https://alfa-leetcode-api.onrender.com/${USERNAME}?t=${timestamp}`).catch(() => null),
             fetch(`https://alfa-leetcode-api.onrender.com/${USERNAME}/acSubmission?t=${timestamp}`).catch(() => null)
           ]);
           
           const solvedData = await safeJson(solvedRes);
           const profileData = await safeJson(profileRes);
           const acData = await safeJson(acRes);

           if (solvedData && solvedData.solvedProblem !== undefined) {
               mainData = {
                   totalSolved: solvedData.solvedProblem,
                   easySolved: solvedData.easySolved,
                   mediumSolved: solvedData.mediumSolved,
                   hardSolved: solvedData.hardSolved,
                   totalSubmissions: solvedData.totalSubmissionNum,
                   ranking: profileData?.ranking || "N/A",
                   recentSubmissions: acData?.submission || []
               };
           }
        }

        let acceptance = "N/A";
        let recentAC = mainData?.recentSubmissions?.length || 0;

        // Use acSubmissionNum for correct acceptance rate (accepted problems / unique AC submissions)
        const acStats = mainData?.matchedUserStats?.acSubmissionNum || mainData?.acSubmissionNum;
        const totalStats = mainData?.matchedUserStats?.totalSubmissionNum || mainData?.totalSubmissions;
        if (acStats && acStats[0] && totalStats && totalStats[0]) {
          const acAll = acStats[0];
          const totalAll = totalStats[0];
          if (totalAll.submissions > 0) {
            acceptance = ((acAll.submissions / totalAll.submissions) * 100).toFixed(1) + "%";
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
          recentAC,
          maxStreak: calendarData?.streak ?? "-",
          totalActiveDays: calendarData?.totalActiveDays ?? "-",
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

    const fetchGitHub = async () => {
      try {
        const timestamp = Date.now();
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}?t=${timestamp}`).catch(() => null),
          fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&t=${timestamp}`).catch(() => null),
        ]);

        const profile = await safeJson(profileRes);
        const repos = reposRes?.ok ? await reposRes.json().catch(() => []) : [];

        // Aggregate stats from repos
        const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
        const totalForks = repos.reduce((acc, r) => acc + (r.forks_count || 0), 0);

        // Top languages by repo count
        const langMap = {};
        repos.forEach(r => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
        const topLangs = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([lang]) => lang);

        // Most recently pushed repo
        const sortedRepos = [...repos].filter(r => !r.fork).sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
        const latestRepo = sortedRepos[0];

        const joinedDate = profile.created_at
          ? new Date(profile.created_at).toLocaleString('default', { month: 'short', year: 'numeric' })
          : 'N/A';

        setGhData({
          name: profile.name || USERNAME,
          bio: profile.bio || '',
          location: profile.location || 'N/A',
          publicRepos: profile.public_repos || 0,
          followers: profile.followers || 0,
          following: profile.following || 0,
          totalStars,
          totalForks,
          topLangs,
          latestRepo: latestRepo ? { name: latestRepo.name, url: latestRepo.html_url, lang: latestRepo.language } : null,
          joinedDate,
        });
      } catch (err) {
        console.error('Error fetching GitHub:', err);
      } finally {
        setLoading(prev => ({ ...prev, gh: false }));
      }
    };

    fetchLeetCode();
    fetchCodeforces();
    fetchGitHub();

    const interval = setInterval(() => {
      fetchLeetCode();
      fetchCodeforces();
      fetchGitHub();
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
                <p>Acceptance rate: <strong>{lcData?.acceptance}</strong></p>
                <p>Max streak: <strong>{lcData?.maxStreak} days</strong> | Active days: <strong>{lcData?.totalActiveDays}</strong></p>
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


      {/* GitHub Card - full width */}
      <InteractiveCard
        className="profile-card-new github-card"
        variants={profileReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.22 }}
        custom={3}
        style={{ gridColumn: '1 / -1' }}
      >
        <div className="card-content-new">
          <div className="profile-header-new" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="header-icon-wrapper" style={{ borderColor: 'rgba(139, 92, 246, 0.3)' }}>
                <FaGithub style={{ color: '#a78bfa' }} />
              </div>
              <div className="profile-titles" style={{ marginBottom: 0 }}>
                <h2>GitHub</h2>
                <p>@{USERNAME}</p>
              </div>
            </div>
            <span className="live-badge">LIVE NOW</span>
          </div>

          {/* Primary stat */}
          {loading.gh ? (
            <div className="skeleton-primary skeleton-box"></div>
          ) : (
            <div className="primary-stat" style={{ color: '#a78bfa' }}>{ghData?.publicRepos} public repos</div>
          )}

          {/* Sub stats grid */}
          {loading.gh ? (
            <div className="sub-stats-grid github-sub-grid">
              <div className="skeleton-box" style={{height: 50}}></div>
              <div className="skeleton-box" style={{height: 50}}></div>
              <div className="skeleton-box" style={{height: 50}}></div>
              <div className="skeleton-box" style={{height: 50}}></div>
            </div>
          ) : (
            <div className="sub-stats-grid github-sub-grid">
              <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(250, 204, 21, 0.5)' }}>
                <span className="sub-stat-label">STARS</span>
                <span className="sub-stat-value" style={{ color: '#facc15' }}>{ghData?.totalStars}</span>
              </div>
              <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(139, 92, 246, 0.5)' }}>
                <span className="sub-stat-label">FORKS</span>
                <span className="sub-stat-value" style={{ color: '#a78bfa' }}>{ghData?.totalForks}</span>
              </div>
              <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(52, 211, 153, 0.5)' }}>
                <span className="sub-stat-label">FOLLOWERS</span>
                <span className="sub-stat-value" style={{ color: '#34d399' }}>{ghData?.followers}</span>
              </div>
              <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(251, 146, 60, 0.5)' }}>
                <span className="sub-stat-label">FOLLOWING</span>
                <span className="sub-stat-value" style={{ color: '#fb923c' }}>{ghData?.following}</span>
              </div>
            </div>
          )}

          <p className="desc-text">
            Open-source projects, contributions, and dev activity — all in one place.
          </p>

          {/* Top languages tags */}
          {!loading.gh && ghData?.topLangs?.length > 0 && (
            <div className="skills-tags" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {ghData.topLangs.map(lang => (
                <span key={lang} style={{ padding: '4px 10px', background: 'rgba(139, 92, 246, 0.1)', color: '#a78bfa', borderRadius: '12px', fontSize: '0.75rem', border: '1px solid rgba(139, 92, 246, 0.2)' }}>{lang}</span>
              ))}
            </div>
          )}

          <div className="divider-container">
            <div className="divider-dots">
              <div className="dot" style={{ background: '#a78bfa' }}></div>
              <div className="dot" style={{ background: '#a78bfa', opacity: 0.6 }}></div>
              <div className="dot" style={{ background: '#a78bfa', opacity: 0.3 }}></div>
            </div>
            <span className="divider-label">PROFILE STATS SYNCED</span>
          </div>

          <div className="details-box">
            {loading.gh ? (
              <div className="skeleton-box" style={{height: 80}}></div>
            ) : (
              <>
                <p><FaMapMarkerAlt style={{ marginRight: 6, color: '#a78bfa', verticalAlign: 'middle' }} />{ghData?.location}</p>
                <p>Member since: <strong>{ghData?.joinedDate}</strong></p>
                {ghData?.latestRepo && (
                  <p>Latest repo: <strong><a href={ghData.latestRepo.url} target="_blank" rel="noopener noreferrer" style={{ color: '#a78bfa', textDecoration: 'none' }}>{ghData.latestRepo.name}</a></strong>{ghData.latestRepo.lang ? <span style={{ marginLeft: 8, fontSize: '0.78rem', color: '#9ca3af' }}>({ghData.latestRepo.lang})</span> : null}</p>
                )}
              </>
            )}
          </div>

          <div className="card-footer-new">
            <AuroraButton href={`https://github.com/${USERNAME}`} target="_blank" rel="noopener noreferrer" icon={FaArrowRight} className="profile-aurora-btn">
              Open Profile
            </AuroraButton>
          </div>
        </div>
      </InteractiveCard>

    </div>
  );
};

export default CodingProfiles;
