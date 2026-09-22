import { profileConfig } from "../config/profileConfig";

const USERNAME = profileConfig.leetcode.username;

// Primary instance goes down / rate-limits (429 "try again in 1 hour") often;
// the Vercel mirror serves the same payloads with CORS enabled.
const PRIMARY_BASE = "https://alfa-leetcode-api.onrender.com";
const MIRROR_BASE = "https://leetcode-api-faisalshohag.vercel.app";
const REQUEST_TIMEOUT_MS = 12000;

const fetchJson = async (url) => {
  const timestamp = Date.now();
  const res = await fetch(`${url}${url.includes("?") ? "&" : "?"}t=${timestamp}`, {
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

// Try the primary instance first, fall back to the mirror on any failure
// (429 rate limit, cold-start timeout, 5xx, network error).
const fetchWithFallback = async (primaryPath, mirrorPath) => {
  try {
    return await fetchJson(`${PRIMARY_BASE}${primaryPath}`);
  } catch {
    return await fetchJson(`${MIRROR_BASE}${mirrorPath ?? primaryPath}`);
  }
};

// Compute streak / active days straight from a { epochSeconds: count } calendar
// so stats keep working even when the dedicated calendar endpoint is down.
const computeStreaks = (calendar) => {
  const SECONDS_PER_DAY = 86400;
  const days = Object.keys(calendar || {})
    .map(Number)
    .filter((t) => Number.isFinite(t) && t > 0)
    .sort((a, b) => a - b);

  const daySet = new Set(days);

  // Longest run of consecutive active days
  let longest = 0;
  let run = 0;
  let prev = null;
  for (const d of days) {
    run = prev !== null && d - prev === SECONDS_PER_DAY ? run + 1 : 1;
    longest = Math.max(longest, run);
    prev = d;
  }

  // Current streak: count back from today (or yesterday if today is empty yet)
  let current = 0;
  let cursor = Math.floor(Date.now() / 1000 / SECONDS_PER_DAY) * SECONDS_PER_DAY;
  if (!daySet.has(cursor)) cursor -= SECONDS_PER_DAY;
  while (daySet.has(cursor)) {
    current += 1;
    cursor -= SECONDS_PER_DAY;
  }

  return { longestStreak: longest, currentStreak: current, totalActiveDays: days.length };
};

export const getLeetcodeStats = async () => {
  try {
    const [profileData, userData] = await Promise.all([
      fetchWithFallback(`/userProfile/${USERNAME}`).catch(() => null),
      fetchWithFallback(`/${USERNAME}`).catch(() => null),
    ]);

    if (!profileData || !profileData.totalSolved) {
      throw new Error("Invalid or missing profile data");
    }

    let acceptance = "N/A";
    if (profileData.totalSubmissions) {
      const allSub = profileData.totalSubmissions.find((s) => s.difficulty === "All");
      if (allSub && allSub.submissions > 0) {
        acceptance = ((allSub.count / allSub.submissions) * 100).toFixed(1) + "%";
      }
    }

    const rankVal = userData?.ranking || profileData.ranking;
    const rankStr = rankVal
      ? rankVal >= 1000
        ? Math.round(rankVal / 1000) + "K"
        : rankVal.toString()
      : "N/A";

    // Streaks: prefer the dedicated calendar endpoint, else derive from the
    // submissionCalendar embedded in the stats response (mirror payload).
    let calData = null;
    try {
      calData = await fetchJson(`${PRIMARY_BASE}/${USERNAME}/calendar`);
    } catch {
      calData = null;
    }
    const computed = computeStreaks(userData?.submissionCalendar);

    return {
      solvedProblem: profileData.totalSolved,
      easySolved: profileData.easySolved || 0,
      mediumSolved: profileData.mediumSolved || 0,
      hardSolved: profileData.hardSolved || 0,
      globalRank: rankStr,
      contestRating: "-",
      totalContests: 0,
      acceptance: acceptance,
      recentAC: 20, // Cannot easily get from Alfa unless we call /acSubmission
      maxStreak: calData?.streak || computed.longestStreak || 0,
      totalActiveDays: calData?.totalActiveDays || computed.totalActiveDays || 0,
      error: false
    };
  } catch (error) {
    console.error("LeetCode API Error:", error);
    return { error: true, message: error.message };
  }
};
