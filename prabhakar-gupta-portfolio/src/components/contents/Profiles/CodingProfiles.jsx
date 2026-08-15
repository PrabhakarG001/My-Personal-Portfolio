import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { SiLeetcode, SiCodeforces } from "react-icons/si";
import InteractiveCard from "../../InteractiveCard.jsx";
import AuroraHero, { AuroraButton } from "../../background/AuroraHero.jsx";
import "./CodingProfiles.css";

const profileReveal = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  show: (index = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, delay: (index % 4) * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const formatDate = (timestamp) => {
  if (!timestamp) return "N/A";
  const date = new Date(timestamp * 1000);
  return date.toLocaleString("default", { month: "short", year: "numeric" });
};

const CodolioIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#06b6d4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="#6366f1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="#a855f7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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
        const [infoRes, statusRes] = await Promise.all([
          fetch(`https://codeforces.com/api/user.info?handles=${USERNAME}&t=${timestamp}`).catch(() => null),
          fetch(`https://codeforces.com/api/user.status?handle=${USERNAME}&t=${timestamp}`).catch(() => null),
        ]);

        const infoData = await safeJson(infoRes);
        const statusData = await safeJson(statusRes);

        let solvedCount = 3;
        if (statusData.status === "OK" && Array.isArray(statusData.result)) {
          const uniqueSolved = new Set();
          statusData.result.forEach((sub) => {
            if (sub.verdict === "OK" && sub.problem) {
              uniqueSolved.add(`${sub.problem.contestId}-${sub.problem.index}`);
            }
          });
          if (uniqueSolved.size > 0) {
            solvedCount = uniqueSolved.size;
          }
        }

        if (infoData.status === "OK" && infoData.result?.length > 0) {
          const user = infoData.result[0];
          setCfData({
            rating: user.rating || 0,
            maxRating: user.maxRating || 0,
            rank: user.rank || "unrated",
            friendOfCount: user.friendOfCount || 0,
            joined: formatDate(user.registrationTimeSeconds),
            lastActive: formatDate(user.lastOnlineTimeSeconds),
            solvedCount,
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
        const thisYear = new Date().getFullYear();

        const [profileRes, reposRes, contribRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}?t=${timestamp}`).catch(() => null),
          fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&t=${timestamp}`).catch(() => null),
          fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?t=${timestamp}`).catch(() => null),
        ]);

        const profile = await safeJson(profileRes);
        const repos = reposRes?.ok ? await reposRes.json().catch(() => []) : [];
        const contribData = await safeJson(contribRes);

        // Contribution totals
        const contribByYear = contribData?.total || {};
        const thisYearContribs = contribByYear[thisYear] || 0;
        const totalContribs = Object.values(contribByYear).reduce((a, b) => a + b, 0);

        // Aggregate stats from repos
        const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
        const totalForks = repos.reduce((acc, r) => acc + (r.forks_count || 0), 0);

        // This year repos (created in current year)
        const thisYearRepos = repos.filter(r => new Date(r.created_at).getFullYear() === thisYear);

        // Top languages by repo count
        const langMap = {};
        repos.forEach(r => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
        const topLangs = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4)
          .map(([lang]) => lang);

        // Best projects — top 3 non-fork repos sorted by size + recent activity
        const bestProjects = [...repos]
          .filter(r => !r.fork && r.name !== USERNAME)
          .sort((a, b) => (b.size + b.stargazers_count * 100) - (a.size + a.stargazers_count * 100))
          .slice(0, 3)
          .map(r => ({ name: r.name, url: r.html_url, lang: r.language, desc: r.description, stars: r.stargazers_count }));

        // Achievements
        const achievements = [];
        if (totalContribs >= 300) achievements.push({ label: '300+ Contributions', icon: '🔥' });
        if (profile.public_repos >= 5) achievements.push({ label: `${profile.public_repos} Public Repos`, icon: '📦' });
        if (thisYearRepos.length >= 3) achievements.push({ label: `${thisYearRepos.length} Repos in ${thisYear}`, icon: '🚀' });
        if (topLangs.includes('JavaScript')) achievements.push({ label: 'JS Developer', icon: '⚡' });

        const joinedDate = profile.created_at
          ? new Date(profile.created_at).toLocaleString('default', { month: 'short', year: 'numeric' })
          : 'N/A';

        setGhData({
          name: profile.name || USERNAME,
          location: profile.location || 'N/A',
          publicRepos: profile.public_repos || 0,
          followers: profile.followers || 0,
          following: profile.following || 0,
          totalStars,
          totalForks,
          topLangs,
          thisYearRepos: thisYearRepos.length,
          totalContribs,
          thisYearContribs,
          bestProjects,
          achievements,
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

      {/* ── 1. Codolio Card (Row 1, Left) ── */}
      <InteractiveCard
        className="profile-card-new codolio-card"
        variants={profileReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.18, margin: "-20px" }}
        custom={1}
      >
        <div className="card-content-new">

          {/* Header */}
          <div className="profile-header-new">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="header-icon-wrapper" style={{ borderColor: 'rgba(6,182,212,0.4)', background: 'rgba(6,182,212,0.1)' }}>
                <CodolioIcon />
              </div>
              <div className="profile-titles" style={{ marginBottom: 0 }}>
                <h2>Codolio</h2>
                <p>@{USERNAME}</p>
              </div>
            </div>
            <span className="live-badge" style={{ borderColor: 'rgba(6,182,212,0.3)', color: '#67e8f9' }}>VERIFIED PROFILE</span>
          </div>

          {/* Primary stat */}
          <div className="primary-stat" style={{ color: '#38bdf8' }}>
            170 <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#bae6fd' }}>Questions Solved</span>
          </div>

          {/* 3-col sub grid */}
          <div className="sub-stats-grid">
            <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(34,197,94,0.6)' }}>
              <span className="sub-stat-label">ACTIVE DAYS</span>
              <span className="sub-stat-value" style={{ color: '#22c55e' }}>168</span>
            </div>
            <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(6,182,212,0.6)' }}>
              <span className="sub-stat-label">SUBMISSIONS</span>
              <span className="sub-stat-value" style={{ color: '#38bdf8' }}>272</span>
            </div>
            <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(168,85,247,0.6)' }}>
              <span className="sub-stat-label">MAX STREAK</span>
              <span className="sub-stat-value" style={{ color: '#c084fc' }}>106 days</span>
            </div>
          </div>

          {/* Desc */}
          <p className="desc-text">Codolio aggregated profile analytics: DSA, Competitive Programming & Streaks.</p>

          {/* Question Distribution Tags */}
          <div className="card-tags">
            <span className="card-tag" style={{ background: 'rgba(34,197,94,0.12)', color: '#4ade80', borderColor: 'rgba(34,197,94,0.3)' }}>
              Easy: 68
            </span>
            <span className="card-tag" style={{ background: 'rgba(234,179,8,0.12)', color: '#facc15', borderColor: 'rgba(234,179,8,0.3)' }}>
              Medium: 75
            </span>
            <span className="card-tag" style={{ background: 'rgba(239,68,68,0.12)', color: '#f87171', borderColor: 'rgba(239,68,68,0.3)' }}>
              Hard: 24
            </span>
            <span className="card-tag" style={{ background: 'rgba(59,130,246,0.12)', color: '#60a5fa', borderColor: 'rgba(59,130,246,0.3)' }}>
              Codeforces: 3
            </span>
          </div>

          {/* Divider */}
          <div className="divider-container">
            <div className="divider-dots">
              <div className="dot" style={{ background: '#06b6d4' }} />
              <div className="dot" style={{ background: '#6366f1' }} />
              <div className="dot" style={{ background: '#a855f7' }} />
            </div>
            <span className="divider-label">DSA TOPICS & AWARDS SYNCED</span>
          </div>

          {/* Details Box */}
          <div className="details-box">
            <p>Awards: <strong>2 Badges (50 & 100 Days Streaks)</strong></p>
            <p>Top DSA Topics: <strong>Arrays (97), Math (33), HashMap (32)</strong></p>
            <p>Pointers & Strings: <strong>Two Pointers (30), String (30)</strong></p>
            <p>Current Streak: <strong>106 Days</strong> &nbsp;·&nbsp; Profile: <strong>@{USERNAME}</strong></p>
          </div>

          {/* Footer */}
          <div className="card-footer-new">
            <AuroraButton href={`https://codolio.com/profile/${USERNAME}`} target="_blank" rel="noopener noreferrer" icon={FaArrowRight} className="profile-aurora-btn">
              Open Profile
            </AuroraButton>
          </div>
        </div>
      </InteractiveCard>

      {/* ── 2. LeetCode Card (Row 1, Right) ── */}
      <InteractiveCard
        className="profile-card-new leetcode-card"
        variants={profileReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.18, margin: "-20px" }}
        custom={2}
      >
        <div className="card-content-new">

          {/* Header */}
          <div className="profile-header-new">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="header-icon-wrapper" style={{ borderColor: 'rgba(234,179,8,0.3)' }}>
                <SiLeetcode style={{ color: '#eab308' }} />
              </div>
              <div className="profile-titles" style={{ marginBottom: 0 }}>
                <h2>LeetCode</h2>
                <p>@{USERNAME}</p>
              </div>
            </div>
            <span className="live-badge">LIVE NOW</span>
          </div>

          {/* Primary stat */}
          {loading.lc
            ? <div className="skeleton-primary skeleton-box" />
            : <div className="primary-stat">{lcData?.solvedProblem} <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#d1d5db' }}>Problems Solved</span></div>
          }

          {/* 3-col sub grid */}
          {loading.lc
            ? <div className="sub-stats-grid">{[0,1,2].map(i => <div key={i} className="skeleton-box" style={{height:50}} />)}</div>
            : <div className="sub-stats-grid">
                <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(34,197,94,0.5)' }}>
                  <span className="sub-stat-label">EASY</span>
                  <span className="sub-stat-value" style={{ color: '#22c55e' }}>{lcData?.easySolved}</span>
                </div>
                <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(234,179,8,0.5)' }}>
                  <span className="sub-stat-label">MEDIUM</span>
                  <span className="sub-stat-value" style={{ color: '#eab308' }}>{lcData?.mediumSolved}</span>
                </div>
                <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(239,68,68,0.5)' }}>
                  <span className="sub-stat-label">HARD</span>
                  <span className="sub-stat-value" style={{ color: '#ef4444' }}>{lcData?.hardSolved}</span>
                </div>
              </div>
          }

          {/* Desc */}
          <p className="desc-text">DSA practice with ranking, streaks and contest context.</p>

          {/* Tags */}
          <div className="card-tags">
            {['Algorithms', 'Data Structures', 'Dynamic Programming'].map(t => (
              <span key={t} className="card-tag" style={{ background: 'rgba(234,179,8,0.1)', color: '#eab308', borderColor: 'rgba(234,179,8,0.2)' }}>{t}</span>
            ))}
          </div>

          {/* Divider */}
          <div className="divider-container">
            <div className="divider-dots">
              <div className="dot green" /><div className="dot yellow" /><div className="dot red" />
            </div>
            <span className="divider-label">DIFFICULTY SPLIT SYNCED</span>
          </div>

          {/* Details */}
          <div className="details-box">
            {loading.lc
              ? <div className="skeleton-box" style={{height:80}} />
              : <>
                  <p>Global rank: <strong>#{lcData?.globalRank}</strong></p>
                  <p>Contest rating: <strong>{lcData?.contestRating}</strong> &nbsp;·&nbsp; Contests: <strong>{lcData?.totalContests}</strong></p>
                  <p>Acceptance rate: <strong>{lcData?.acceptance}</strong></p>
                  <p>Max streak: <strong>{lcData?.maxStreak} days</strong> &nbsp;·&nbsp; Active days: <strong>{lcData?.totalActiveDays}</strong></p>
                </>
            }
          </div>

          {/* Footer */}
          <div className="card-footer-new">
            <AuroraButton href={`https://leetcode.com/${USERNAME}/`} target="_blank" rel="noopener noreferrer" icon={FaArrowRight} className="profile-aurora-btn">
              Open Profile
            </AuroraButton>
          </div>
        </div>
      </InteractiveCard>

      {/* ── 3. GitHub Card (Row 2, Left) ── */}
      <InteractiveCard
        className="profile-card-new github-card"
        variants={profileReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.18, margin: "-20px" }}
        custom={3}
      >
        <div className="card-content-new">

          {/* Header */}
          <div className="profile-header-new">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="header-icon-wrapper" style={{ borderColor: 'rgba(139,92,246,0.3)' }}>
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
          {loading.gh
            ? <div className="skeleton-primary skeleton-box" />
            : <div className="primary-stat" style={{ color: '#a78bfa' }}>
                {ghData?.totalContribs} <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#d8b4fe' }}>contributions</span>
              </div>
          }

          {/* 3-col sub grid */}
          {loading.gh
            ? <div className="sub-stats-grid">{[0,1,2].map(i => <div key={i} className="skeleton-box" style={{height:50}} />)}</div>
            : <div className="sub-stats-grid">
                <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(139,92,246,0.5)' }}>
                  <span className="sub-stat-label">THIS YEAR</span>
                  <span className="sub-stat-value" style={{ color: '#a78bfa' }}>{ghData?.thisYearContribs}</span>
                </div>
                <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(52,211,153,0.5)' }}>
                  <span className="sub-stat-label">{new Date().getFullYear()} REPOS</span>
                  <span className="sub-stat-value" style={{ color: '#34d399' }}>{ghData?.thisYearRepos}</span>
                </div>
                <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(251,146,60,0.5)' }}>
                  <span className="sub-stat-label">PUBLIC REPOS</span>
                  <span className="sub-stat-value" style={{ color: '#fb923c' }}>{ghData?.publicRepos}</span>
                </div>
              </div>
          }

          {/* Desc */}
          <p className="desc-text">Open-source projects, contributions and dev activity.</p>

          {/* Tags — top languages */}
          <div className="card-tags">
            {(ghData?.topLangs || ['JavaScript', 'CSS', 'EJS']).map(lang => (
              <span key={lang} className="card-tag" style={{ background: 'rgba(139,92,246,0.1)', color: '#a78bfa', borderColor: 'rgba(139,92,246,0.2)' }}>{lang}</span>
            ))}
          </div>

          {/* Divider */}
          <div className="divider-container">
            <div className="divider-dots">
              <div className="dot" style={{ background: '#a78bfa' }} />
              <div className="dot" style={{ background: '#a78bfa', opacity: 0.6 }} />
              <div className="dot" style={{ background: '#a78bfa', opacity: 0.3 }} />
            </div>
            <span className="divider-label">STATS LIVE SYNCED</span>
          </div>

          {/* Details */}
          <div className="details-box">
            {loading.gh
              ? <div className="skeleton-box" style={{height:80}} />
              : <>
                  <p>Total stars: <strong>{ghData?.totalStars}</strong> &nbsp;·&nbsp; Forks: <strong>{ghData?.totalForks}</strong></p>
                  <p>Followers: <strong>{ghData?.followers}</strong> &nbsp;·&nbsp; Following: <strong>{ghData?.following}</strong></p>
                  <p>Location: <strong><FaMapMarkerAlt style={{ verticalAlign: 'middle', marginRight: 4 }} />{ghData?.location}</strong></p>
                  <p>Member since: <strong>{ghData?.joinedDate}</strong></p>
                </>
            }
          </div>

          {/* Footer */}
          <div className="card-footer-new">
            <AuroraButton href={`https://github.com/${USERNAME}`} target="_blank" rel="noopener noreferrer" icon={FaArrowRight} className="profile-aurora-btn">
              Open Profile
            </AuroraButton>
          </div>
        </div>
      </InteractiveCard>

      {/* ── 4. Codeforces Card (Row 2, Right) ── */}
      <InteractiveCard
        className="profile-card-new codeforces-card"
        variants={profileReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.18, margin: "-20px" }}
        custom={4}
      >
        <div className="card-content-new">

          {/* Header */}
          <div className="profile-header-new">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="header-icon-wrapper" style={{ borderColor: 'rgba(59,130,246,0.3)' }}>
                <SiCodeforces style={{ color: '#3b82f6' }} />
              </div>
              <div className="profile-titles" style={{ marginBottom: 0 }}>
                <h2>Codeforces</h2>
                <p>@{USERNAME}</p>
              </div>
            </div>
            <span className="live-badge">LIVE NOW</span>
          </div>

          {/* Primary stat */}
          {loading.cf
            ? <div className="skeleton-primary skeleton-box" />
            : <div className="primary-stat" style={{ color: '#3b82f6', fontSize: cfData?.rating > 0 ? '2.2rem' : '1.6rem' }}>
                {cfData?.rating > 0 ? cfData.rating : 'Starting Soon'}
                {cfData?.rating > 0 && <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#93c5fd' }}> rating</span>}
              </div>
          }

          {/* 3-col sub grid */}
          {loading.cf
            ? <div className="sub-stats-grid">{[0,1,2].map(i => <div key={i} className="skeleton-box" style={{height:50}} />)}</div>
            : <div className="sub-stats-grid">
                <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(52,211,153,0.5)' }}>
                  <span className="sub-stat-label">SOLVED</span>
                  <span className="sub-stat-value" style={{ color: '#34d399' }}>{cfData?.solvedCount ?? 3}</span>
                </div>
                <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(59,130,246,0.5)' }}>
                  <span className="sub-stat-label">RANK</span>
                  <span className="sub-stat-value" style={{ color: '#3b82f6', textTransform: 'capitalize', fontSize: '0.95rem' }}>{cfData?.rank || 'N/A'}</span>
                </div>
                <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(168,85,247,0.5)' }}>
                  <span className="sub-stat-label">PEAK</span>
                  <span className="sub-stat-value" style={{ color: '#a855f7' }}>{cfData?.maxRating || 'N/A'}</span>
                </div>
              </div>
          }

          {/* Desc */}
          <p className="desc-text">Competitive programming presence and contest activity.</p>

          {/* Tags */}
          <div className="card-tags">
            {['Competitive Programming', 'Math', 'Graph Theory'].map(t => (
              <span key={t} className="card-tag" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6', borderColor: 'rgba(59,130,246,0.2)' }}>{t}</span>
            ))}
          </div>

          {/* Divider */}
          <div className="divider-container">
            <div className="divider-dots">
              <div className="dot red" /><div className="dot red" /><div className="dot red" />
            </div>
            <span className="divider-label">CONTEST TRACE AVAILABLE</span>
          </div>

          {/* Details */}
          <div className="details-box">
            {loading.cf
              ? <div className="skeleton-box" style={{height:80}} />
              : <>
                  <p>Questions Solved: <strong>{cfData?.solvedCount ?? 3} Problems</strong></p>
                  <p>Status: <strong>{cfData?.rank !== 'unrated' ? 'Active' : 'Practice Mode'}</strong></p>
                  <p>Member since: <strong>{cfData?.joined}</strong></p>
                  <p>Last seen: <strong>{cfData?.lastActive}</strong> &nbsp;·&nbsp; Friends: <strong>{cfData?.friendOfCount}</strong></p>
                </>
            }
          </div>

          {/* Footer */}
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
