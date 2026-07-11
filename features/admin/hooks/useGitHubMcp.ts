"use client";

import { useState, useEffect, useCallback } from "react";

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  stars: number;
  forks: number;
}

interface GitHubCommit {
  hash: string;
  message: string;
  branch: string;
  repo: string;
  timestamp: string;
  timeAgo: string;
  url?: string;
}

interface GitHubData {
  stats: GitHubStats | null;
  recentCommits: GitHubCommit[];
}

export function useGitHubMcp() {
  const [data, setData] = useState<GitHubData>({ stats: null, recentCommits: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await globalThis.fetch("/api/github");
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...data, loading, error, refetch: fetchData };
}
