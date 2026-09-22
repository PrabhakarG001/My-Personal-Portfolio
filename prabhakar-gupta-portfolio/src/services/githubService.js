import { profileConfig } from "../config/profileConfig";

const USERNAME = profileConfig.github.username;

const safeJson = async (res) => {
  if (!res || !res.ok) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
};

export const getGithubStats = async () => {
  try {
    const timestamp = Date.now();
    const thisYear = new Date().getFullYear();

    const [profileRes, reposRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}?t=${timestamp}`).catch(() => null),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&t=${timestamp}`).catch(() => null),
      fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?t=${timestamp}`).catch(() => null),
    ]);

    if (!profileRes || !profileRes.ok) {
      const isRateLimited = profileRes?.status === 403 || profileRes?.status === 429;
      throw new Error(isRateLimited ? "Rate limit exceeded" : "Unable to fetch GitHub stats");
    }

    const profile = await safeJson(profileRes);
    const repos = reposRes?.ok ? await reposRes.json().catch(() => []) : [];
    const contribData = await safeJson(contribRes);

    if (!profile) throw new Error("Invalid GitHub profile data");

    const contribByYear = contribData?.total || {};
    const thisYearContribs = contribByYear[thisYear] || 0;
    const totalContribs = Object.values(contribByYear).reduce((a, b) => a + b, 0);

    const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
    const totalForks = repos.reduce((acc, r) => acc + (r.forks_count || 0), 0);

    const thisYearRepos = repos.filter(r => new Date(r.created_at).getFullYear() === thisYear);

    const langMap = {};
    repos.forEach(r => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
    const topLangs = Object.entries(langMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([lang]) => lang);

    const joinedDate = profile.created_at
      ? new Date(profile.created_at).toLocaleString('default', { month: 'short', year: 'numeric' })
      : 'N/A';

    return {
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
      joinedDate,
      error: false,
    };
  } catch (error) {
    console.error("GitHub API Error:", error);
    return { 
      error: true, 
      message: error.message,
      rateLimited: error.message.includes("Rate limit")
    };
  }
};
