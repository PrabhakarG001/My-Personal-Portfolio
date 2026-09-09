import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaArrowRight, FaMapMarkerAlt, FaSyncAlt } from "react-icons/fa";
import { SiLeetcode, SiCodeforces } from "react-icons/si";
import InteractiveCard from "../../InteractiveCard.jsx";
import AuroraHero, { AuroraButton } from "../../background/AuroraHero.jsx";
import { useProfileStats } from "../../../context/ProfileStatsContext.jsx";
import { profileConfig } from "../../../config/profileConfig.js";
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

const CodolioIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#06b6d4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="#6366f1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="#a855f7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CodingProfiles = () => {
  const { stats, loading, lastUpdated, isRefreshing, refreshStats } = useProfileStats();

  const lcData = stats.leetcode;
  const cfData = stats.codeforces;
  const ghData = stats.github;
  const cdData = stats.codolio;

  const getRelativeTime = (date) => {
    if (!date) return "Never";
    const diff = Math.floor((new Date() - date) / 60000);
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff} min ago`;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const USERNAME = profileConfig.github.username;

  return (
    <div className="coding-profiles-wrapper">
      <div className="profiles-header-controls" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', gridColumn: '1 / -1' }}>
        <span>Last updated: {getRelativeTime(lastUpdated)}</span>
        <button 
          onClick={refreshStats} 
          disabled={isRefreshing}
          style={{ background: 'transparent', border: '1px solid var(--border-soft)', padding: '6px 12px', borderRadius: '8px', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <FaSyncAlt className={isRefreshing ? "spinning" : ""} /> {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>


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
            <span className="live-badge" style={{ borderColor: 'rgba(6,182,212,0.3)', color: '#67e8f9' }}>LIVE NOW</span>
          </div>

          {/* Primary stat */}
          {loading.cd
            ? <div className="skeleton-primary skeleton-box" />
            : cdData?.error
              ? <div className="primary-stat" style={{ color: '#ef4444', fontSize: '1.2rem' }}>
                  Data Unavailable
                  <span style={{ display: 'block', fontSize: '0.9rem', color: '#fca5a5', fontWeight: 400, marginTop: '4px' }}>
                    Failed to fetch Codolio stats.
                  </span>
                </div>
              : <div className="primary-stat" style={{ color: '#38bdf8' }}>
                  {cdData?.totalSolved ?? 0} <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#bae6fd' }}>Problems Solved</span>
                </div>
          }

          {/* 3-col sub grid */}
          {loading.cd
            ? <div className="sub-stats-grid">{[0,1,2].map(i => <div key={i} className="skeleton-box" style={{height:50}} />)}</div>
            : cdData?.error
              ? <div className="sub-stats-grid">
                  <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(34,197,94,0.6)', opacity: 0.5 }}>
                    <span className="sub-stat-label">ACTIVE DAYS</span>
                    <span className="sub-stat-value" style={{ color: '#22c55e' }}>-</span>
                  </div>
                  <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(6,182,212,0.6)', opacity: 0.5 }}>
                    <span className="sub-stat-label">SUBMISSIONS</span>
                    <span className="sub-stat-value" style={{ color: '#38bdf8' }}>-</span>
                  </div>
                  <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(168,85,247,0.6)', opacity: 0.5 }}>
                    <span className="sub-stat-label">MAX STREAK</span>
                    <span className="sub-stat-value" style={{ color: '#c084fc' }}>-</span>
                  </div>
                </div>
              : <div className="sub-stats-grid">
                  <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(34,197,94,0.6)' }}>
                    <span className="sub-stat-label">ACTIVE DAYS</span>
                    <span className="sub-stat-value" style={{ color: '#22c55e' }}>{cdData?.activeDays}</span>
                  </div>
                  <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(6,182,212,0.6)' }}>
                    <span className="sub-stat-label">SUBMISSIONS</span>
                    <span className="sub-stat-value" style={{ color: '#38bdf8' }}>{cdData?.totalSubmissions}</span>
                  </div>
                  <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(168,85,247,0.6)' }}>
                    <span className="sub-stat-label">MAX STREAK</span>
                    <span className="sub-stat-value" style={{ color: '#c084fc' }}>{cdData?.maxStreak} days</span>
                  </div>
                </div>
          }

          {/* Desc */}
          <p className="desc-text">Codolio aggregated profile analytics: DSA, Competitive Programming & Streaks.</p>

          {/* Question Distribution Tags */}
          <div className="card-tags">
            <span className="card-tag" style={{ background: 'rgba(34,197,94,0.12)', color: '#4ade80', borderColor: 'rgba(34,197,94,0.3)' }}>
              Easy: {cdData?.easySolved}
            </span>
            <span className="card-tag" style={{ background: 'rgba(234,179,8,0.12)', color: '#facc15', borderColor: 'rgba(234,179,8,0.3)' }}>
              Medium: {cdData?.mediumSolved}
            </span>
            <span className="card-tag" style={{ background: 'rgba(239,68,68,0.12)', color: '#f87171', borderColor: 'rgba(239,68,68,0.3)' }}>
              Hard: {cdData?.hardSolved}
            </span>
            <span className="card-tag" style={{ background: 'rgba(59,130,246,0.12)', color: '#60a5fa', borderColor: 'rgba(59,130,246,0.3)' }}>
              Codeforces: {cdData?.cfSolved}
            </span>
          </div>

          {/* Divider */}
          <div className="divider-container">
            <div className="divider-dots">
              <div className="dot" style={{ background: '#06b6d4' }} />
              <div className="dot" style={{ background: '#6366f1' }} />
              <div className="dot" style={{ background: '#a855f7' }} />
            </div>
            <span className="divider-label">STATS LIVE SYNCED</span>
          </div>

          {/* Details Box */}
          <div className="details-box">
            {loading.cd
              ? <div className="skeleton-box" style={{height:80}} />
              : <>
                  <p>Awards: <strong>{cdData?.badgesCount} Badges ({cdData?.badgeNames?.join(', ')})</strong></p>
                  <p>Top DSA Topics: <strong>{cdData?.topTopics?.slice(0, 3)?.join(', ')}</strong></p>
                  <p>More Topics: <strong>{cdData?.topTopics?.slice(3)?.join(', ') || 'Two Pointers, Strings'}</strong></p>
                  <p>Current Streak: <strong>{cdData?.maxStreak} Days</strong> &nbsp;·&nbsp; Profile: <strong>@{USERNAME}</strong></p>
                </>
            }
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
            : lcData?.error 
              ? <div className="primary-stat" style={{ color: '#ef4444', fontSize: '1.2rem' }}>
                  Data Unavailable
                  <span style={{ display: 'block', fontSize: '0.9rem', color: '#fca5a5', fontWeight: 400, marginTop: '4px' }}>
                    Failed to fetch LeetCode stats.
                  </span>
                </div>
              : <div className="primary-stat">{lcData?.solvedProblem ?? 0} <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#d1d5db' }}>Problems Solved</span></div>
          }

          {/* 3-col sub grid */}
          {loading.lc
            ? <div className="sub-stats-grid">{[0,1,2].map(i => <div key={i} className="skeleton-box" style={{height:50}} />)}</div>
            : lcData?.error
              ? <div className="sub-stats-grid">
                  <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(34,197,94,0.5)', opacity: 0.5 }}>
                    <span className="sub-stat-label">EASY</span>
                    <span className="sub-stat-value" style={{ color: '#22c55e' }}>-</span>
                  </div>
                  <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(234,179,8,0.5)', opacity: 0.5 }}>
                    <span className="sub-stat-label">MEDIUM</span>
                    <span className="sub-stat-value" style={{ color: '#eab308' }}>-</span>
                  </div>
                  <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(239,68,68,0.5)', opacity: 0.5 }}>
                    <span className="sub-stat-label">HARD</span>
                    <span className="sub-stat-value" style={{ color: '#ef4444' }}>-</span>
                  </div>
                </div>
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
          {loading.gh ? (
            <div className="skeleton-primary skeleton-box" />
          ) : ghData?.error ? (
            <div className="primary-stat" style={{ color: '#ef4444', fontSize: '1.2rem' }}>
              Data Unavailable
              <span style={{ display: 'block', fontSize: '0.9rem', color: '#fca5a5', fontWeight: 400, marginTop: '4px' }}>
                {ghData?.rateLimited ? 'Rate limit exceeded.' : 'Failed to fetch GitHub stats.'}
              </span>
            </div>
          ) : (
            <div className="primary-stat" style={{ color: '#a78bfa' }}>
              {ghData?.totalContribs} <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#d8b4fe' }}>contributions</span>
            </div>
          )}

          {/* 3-col sub grid */}
          {loading.gh ? (
            <div className="sub-stats-grid">{[0, 1, 2].map(i => <div key={i} className="skeleton-box" style={{ height: 50 }} />)}</div>
          ) : ghData?.error ? (
            <div className="sub-stats-grid">
              <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(139,92,246,0.5)', opacity: 0.5 }}>
                <span className="sub-stat-label">THIS YEAR</span>
                <span className="sub-stat-value" style={{ color: '#a78bfa' }}>-</span>
              </div>
              <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(52,211,153,0.5)', opacity: 0.5 }}>
                <span className="sub-stat-label">{new Date().getFullYear()} REPOS</span>
                <span className="sub-stat-value" style={{ color: '#34d399' }}>-</span>
              </div>
              <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(251,146,60,0.5)', opacity: 0.5 }}>
                <span className="sub-stat-label">PUBLIC REPOS</span>
                <span className="sub-stat-value" style={{ color: '#fb923c' }}>-</span>
              </div>
            </div>
          ) : (
            <div className="sub-stats-grid">
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
          )}

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
            {loading.gh ? (
              <div className="skeleton-box" style={{ height: 80 }} />
            ) : ghData?.error ? (
              <>
                <p>Total stars: <strong>-</strong> &nbsp;·&nbsp; Forks: <strong>-</strong></p>
                <p>Followers: <strong>-</strong> &nbsp;·&nbsp; Following: <strong>-</strong></p>
                <p>Location: <strong><FaMapMarkerAlt style={{ verticalAlign: 'middle', marginRight: 4 }} />-</strong></p>
              </>
            ) : (
              <>
                <p>Total stars: <strong>{ghData?.totalStars}</strong> &nbsp;·&nbsp; Forks: <strong>{ghData?.totalForks}</strong></p>
                <p>Followers: <strong>{ghData?.followers}</strong> &nbsp;·&nbsp; Following: <strong>{ghData?.following}</strong></p>
                <p>Location: <strong><FaMapMarkerAlt style={{ verticalAlign: 'middle', marginRight: 4 }} />{ghData?.location}</strong></p>
                <p>Member since: <strong>{ghData?.joinedDate}</strong></p>
              </>
            )}
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
            : cfData?.error
              ? <div className="primary-stat" style={{ color: '#ef4444', fontSize: '1.2rem' }}>
                  Data Unavailable
                  <span style={{ display: 'block', fontSize: '0.9rem', color: '#fca5a5', fontWeight: 400, marginTop: '4px' }}>
                    Failed to fetch Codeforces stats.
                  </span>
                </div>
              : <div className="primary-stat" style={{ color: '#3b82f6', fontSize: cfData?.rating > 0 ? '2.2rem' : '1.6rem' }}>
                  {cfData?.rating > 0 ? cfData.rating : 'Starting Soon'}
                  {cfData?.rating > 0 && <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#93c5fd' }}> rating</span>}
                </div>
          }

          {/* 3-col sub grid */}
          {loading.cf
            ? <div className="sub-stats-grid">{[0,1,2].map(i => <div key={i} className="skeleton-box" style={{height:50}} />)}</div>
            : cfData?.error
              ? <div className="sub-stats-grid">
                  <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(52,211,153,0.5)', opacity: 0.5 }}>
                    <span className="sub-stat-label">SOLVED</span>
                    <span className="sub-stat-value" style={{ color: '#34d399' }}>-</span>
                  </div>
                  <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(59,130,246,0.5)', opacity: 0.5 }}>
                    <span className="sub-stat-label">RANK</span>
                    <span className="sub-stat-value" style={{ color: '#3b82f6', textTransform: 'capitalize', fontSize: '0.95rem' }}>-</span>
                  </div>
                  <div className="sub-stat-box" style={{ borderBottom: '2px solid rgba(168,85,247,0.5)', opacity: 0.5 }}>
                    <span className="sub-stat-label">PEAK</span>
                    <span className="sub-stat-value" style={{ color: '#a855f7' }}>-</span>
                  </div>
                </div>
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
