import { profileConfig } from "../config/profileConfig";

const USERNAME = profileConfig.codeforces.username;

const safeJson = async (res) => {
  if (!res || !res.ok) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
};

const formatDate = (timestamp) => {
  if (!timestamp) return "N/A";
  const date = new Date(timestamp * 1000);
  return date.toLocaleString("default", { month: "short", year: "numeric" });
};

export const getCodeforcesStats = async () => {
  try {
    const timestamp = Date.now();
    const [infoRes, statusRes] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${USERNAME}&t=${timestamp}`).catch(() => null),
      fetch(`https://codeforces.com/api/user.status?handle=${USERNAME}&t=${timestamp}`).catch(() => null),
    ]);

    const infoData = await safeJson(infoRes);
    const statusData = await safeJson(statusRes);

    if (!infoData || infoData.status !== "OK" || !infoData.result?.length) {
      throw new Error("Unable to fetch Codeforces profile data");
    }

    let solvedCount = 0;
    if (statusData && statusData.status === "OK" && Array.isArray(statusData.result)) {
      const uniqueSolved = new Set();
      statusData.result.forEach((sub) => {
        if (sub.verdict === "OK" && sub.problem) {
          uniqueSolved.add(`${sub.problem.contestId}-${sub.problem.index}`);
        }
      });
      solvedCount = uniqueSolved.size;
    }

    const user = infoData.result[0];

    return {
      rating: user.rating || 0,
      maxRating: user.maxRating || 0,
      rank: user.rank || "unrated",
      friendOfCount: user.friendOfCount || 0,
      joined: formatDate(user.registrationTimeSeconds),
      lastActive: formatDate(user.lastOnlineTimeSeconds),
      solvedCount,
      error: false
    };
  } catch (error) {
    console.error("Codeforces API Error:", error);
    return { error: true, message: error.message };
  }
};
