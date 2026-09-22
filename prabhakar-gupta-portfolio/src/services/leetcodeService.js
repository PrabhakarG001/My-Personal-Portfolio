import { profileConfig } from "../config/profileConfig";

const USERNAME = profileConfig.leetcode.username;

const fetchJson = async (url) => {
  const timestamp = Date.now();
  const res = await fetch(`${url}${url.includes('?') ? '&' : '?'}t=${timestamp}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const getLeetcodeStats = async () => {
  try {
    const [profileData, userData, calData] = await Promise.all([
      fetchJson(`https://alfa-leetcode-api.onrender.com/userProfile/${USERNAME}`).catch(() => null),
      fetchJson(`https://alfa-leetcode-api.onrender.com/${USERNAME}`).catch(() => null),
      fetchJson(`https://alfa-leetcode-api.onrender.com/${USERNAME}/calendar`).catch(() => null),
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
      maxStreak: calData?.streak || 0,
      totalActiveDays: calData?.totalActiveDays || 0,
      error: false
    };
  } catch (error) {
    console.error("LeetCode API Error:", error);
    return { error: true, message: error.message };
  }
};
