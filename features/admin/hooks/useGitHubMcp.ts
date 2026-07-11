"use client";

import { useState, useEffect, useCallback } from "react";
import type { GitHubDataResult } from "@/lib/github/service";

interface UseGitHubDataReturn extends GitHubDataResult {
  loading: boolean;
  error: boolean;
  refetch: () => Promise<void>;
}

const EMPTY_STATE: GitHubDataResult = {
  profile: {
    username: "",
    name: null,
    avatar: "",
    bio: null,
    company: null,
    location: null,
    blog: null,
    twitter: null,
    publicRepos: 0,
    followers: 0,
    following: 0,
    stars: 0,
    forks: 0,
    joinedAt: "",
  },
  repos: [],
  recentCommits: [],
  issues: [],
  pullRequests: [],
  releases: [],
  contributors: [],
  languages: {},
  contributionGraph: [],
};

export function useGitHubData(): UseGitHubDataReturn {
  const [data, setData] = useState<GitHubDataResult>(EMPTY_STATE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/github");
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

export function useGitHubMcp() {
  const { profile, repos, recentCommits, issues, pullRequests, releases, contributors, languages, contributionGraph, loading, error, refetch } =
    useGitHubData();

  return {
    stats: profile
      ? {
          publicRepos: profile.publicRepos,
          followers: profile.followers,
          following: profile.following,
          stars: profile.stars,
          forks: profile.forks,
        }
      : null,
    profile,
    repos,
    recentCommits,
    issues,
    pullRequests,
    releases,
    contributors,
    languages,
    contributionGraph,
    loading,
    error,
    refetch,
  };
}
