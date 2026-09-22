import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getLeetcodeStats } from "../services/leetcodeService";
import { getCodolioStats } from "../services/codolioService";
import { getCodeforcesStats } from "../services/codeforcesService";
import { getGithubStats } from "../services/githubService";

const ProfileStatsContext = createContext();

export const useProfileStats = () => useContext(ProfileStatsContext);

export const ProfileStatsProvider = ({ children }) => {
  const [stats, setStats] = useState({
    leetcode: null,
    codolio: null,
    codeforces: null,
    github: null,
  });

  const [loading, setLoading] = useState({
    leetcode: true,
    codolio: true,
    codeforces: true,
    github: true,
  });

  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchAllStats = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setIsRefreshing(true);
      setLoading({ leetcode: true, codolio: true, codeforces: true, github: true });
    }

    const lcData = await getLeetcodeStats();
    setStats(prev => ({ ...prev, leetcode: lcData }));
    setLoading(prev => ({ ...prev, leetcode: false }));

    const [cdData, cfData, ghData] = await Promise.all([
      getCodolioStats(lcData),
      getCodeforcesStats(),
      getGithubStats()
    ]);

    setStats(prev => ({
      ...prev,
      codolio: cdData,
      codeforces: cfData,
      github: ghData
    }));

    setLoading(prev => ({
      ...prev,
      codolio: false,
      codeforces: false,
      github: false
    }));

    setLastUpdated(new Date());
    if (isManualRefresh) {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchAllStats();
  }, [fetchAllStats]);

  const value = {
    stats,
    loading,
    lastUpdated,
    isRefreshing,
    refreshStats: () => fetchAllStats(true)
  };

  return (
    <ProfileStatsContext.Provider value={value}>
      {children}
    </ProfileStatsContext.Provider>
  );
};
