import { profileConfig } from "../config/profileConfig";

const USERNAME = profileConfig.codolio.username;

const safeJson = async (res) => {
  if (!res || !res.ok) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
};

export const getCodolioStats = async (liveLc = null) => {
  try {
    const timestamp = Date.now();
    const res = await fetch(`https://api.codolio.com/profile?userKey=${USERNAME}&t=${timestamp}`, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store'
    }).catch(() => null);

    const json = await safeJson(res);
    const data = json?.data;

    if (!data) {
      throw new Error("Unable to fetch Codolio profile data");
    }

    const rawProfiles = data.platformProfiles;
    const platforms = Array.isArray(rawProfiles)
      ? rawProfiles
      : Array.isArray(rawProfiles?.platformProfiles)
      ? rawProfiles.platformProfiles
      : [];

    let totalSolved = 0;
    let easySolved = 0;
    let mediumSolved = 0;
    let hardSolved = 0;
    let cfSolved = 0;
    let maxStreak = liveLc?.maxStreak || 0;
    let activeDays = liveLc?.totalActiveDays || 0;
    let totalSubmissions = 0;
    let badgeNames = [];
    const topicMap = {};

    platforms.forEach((p) => {
      const qStats = p.totalQuestionStats;
      if (p.platform === 'leetcode' && liveLc && !liveLc.error) {
        const lcSolved = Math.max(qStats?.totalQuestionCounts || 0, liveLc.solvedProblem || 0);
        totalSolved += lcSolved;
        easySolved += Math.max(qStats?.easyQuestionCounts || 0, liveLc.easySolved || 0);
        mediumSolved += Math.max(qStats?.mediumQuestionCounts || 0, liveLc.mediumSolved || 0);
        hardSolved += Math.max(qStats?.hardQuestionCounts || 0, liveLc.hardSolved || 0);
      } else if (qStats) {
        totalSolved += (qStats.totalQuestionCounts || 0);
        easySolved += (qStats.easyQuestionCounts || 0);
        mediumSolved += (qStats.mediumQuestionCounts || 0);
        hardSolved += (qStats.hardQuestionCounts || 0);
        if (p.platform === 'codeforces') {
          cfSolved += (qStats.totalQuestionCounts || 0);
        }
      }

      const dailyStats = p.dailyActivityStatsResponse;
      if (dailyStats) {
        if ((dailyStats.maxStreak || 0) > maxStreak) maxStreak = dailyStats.maxStreak;
        if ((dailyStats.totalActiveDays || 0) > activeDays) activeDays = dailyStats.totalActiveDays;
        if (dailyStats.submissionCalendar) {
          const subs = Object.values(dailyStats.submissionCalendar).reduce((a, b) => a + Number(b || 0), 0);
          totalSubmissions += subs;
        }
      }

      const badges = p.badgeStats?.badgeList || [];
      badges.forEach((b) => {
        if (b.displayName || b.shortName) badgeNames.push(b.displayName || b.shortName);
      });

      const topics = p.topicAnalysisStats?.topicWiseDistribution || {};
      for (const [topic, count] of Object.entries(topics)) {
        topicMap[topic] = (topicMap[topic] || 0) + count;
      }
    });

    const topTopicsList = Object.entries(topicMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([t, c]) => `${t} (${c})`);

    return {
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      cfSolved,
      maxStreak,
      activeDays,
      totalSubmissions,
      badgesCount: badgeNames.length,
      badgeNames,
      topTopics: topTopicsList,
      error: false
    };
  } catch (error) {
    console.error("Codolio API Error:", error);
    return { error: true, message: error.message };
  }
};
