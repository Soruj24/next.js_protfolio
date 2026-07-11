"use client";

import { GitCommit, GitPullRequest, Star, GitFork, ExternalLink, Loader2, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGitHubMcp } from "@/features/admin/hooks/useGitHubMcp";
import type { ContributionDay } from "@/lib/github/service";

function ContributionGraph({ data }: { data: ContributionDay[] }) {
  const levelOpacity = ["opacity-0", "opacity-30", "opacity-50", "opacity-75", "opacity-100"];

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[110px] text-xs text-gray-600">
        No contribution data available
      </div>
    );
  }

  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  return (
    <div className="flex gap-[3px] overflow-hidden">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-[3px]">
          {week.map((day, di) => (
            <div
              key={di}
              title={`${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`}
              className={cn(
                "w-[10px] h-[10px] rounded-[2px] bg-cyan-400 transition-opacity cursor-default",
                levelOpacity[day.level],
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function GitHubActivity({ username: propUsername }: { username?: string }) {
  const { stats, recentCommits, contributionGraph, contributors, loading } = useGitHubMcp();
  const username = propUsername || stats ? "" : "Soruj24";

  const statCards = [
    { label: "Repos", value: stats?.publicRepos ?? 0, icon: GitPullRequest, color: "text-cyan-400 bg-cyan-400/10" },
    { label: "Stars", value: stats?.stars ?? 0, icon: Star, color: "text-amber-400 bg-amber-400/10" },
    { label: "Forks", value: stats?.forks ?? 0, icon: GitFork, color: "text-emerald-400 bg-emerald-400/10" },
    { label: "Followers", value: stats?.followers ?? 0, icon: Users, color: "text-purple-400 bg-purple-400/10" },
  ];

  const totalContributions = contributionGraph.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <h3 className="text-sm font-semibold text-white">GitHub Activity</h3>
          {loading && <Loader2 size={12} className="text-gray-500 animate-spin" />}
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-cyan-400 transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
        >
          @{username}
          <ExternalLink size={10} />
        </a>
      </div>

      <div className="px-6 py-4">
        <div className="grid grid-cols-4 gap-3 mb-5">
          {statCards.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2", stat.color)}>
                <stat.icon size={16} />
              </div>
              <p className="text-lg font-bold text-white tabular-nums">
                {loading ? (
                  <span className="inline-block w-8 h-5 bg-white/5 rounded animate-pulse" />
                ) : (
                  stat.value.toLocaleString()
                )}
              </p>
              <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
              Contributions (last {contributionGraph.length} days)
            </p>
            {!loading && (
              <p className="text-[10px] text-cyan-400 font-bold tabular-nums">
                {totalContributions.toLocaleString()} total
              </p>
            )}
          </div>
          <ContributionGraph data={contributionGraph} />
        </div>

        {contributors.length > 0 && (
          <div className="mb-4">
            <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-2">Top Contributors</p>
            <div className="flex items-center gap-2">
              {contributors.slice(0, 5).map((c) => (
                <a
                  key={c.username}
                  href={c.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${c.username}: ${c.contributions} contributions`}
                  className="group"
                >
                  <img
                    src={c.avatar}
                    alt={c.username}
                    className="w-7 h-7 rounded-full border border-white/10 group-hover:border-cyan-400/50 transition-colors"
                  />
                </a>
              ))}
              <span className="text-[10px] text-gray-600">{contributors.length} contributors</span>
            </div>
          </div>
        )}

        <div className="space-y-0">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-t border-white/[0.04] first:border-0 animate-pulse">
                <div className="w-7 h-7 rounded-lg bg-white/5" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 w-3/4 bg-white/5 rounded" />
                  <div className="h-2.5 w-1/2 bg-white/[0.03] rounded" />
                </div>
              </div>
            ))
          ) : recentCommits.length ? (
            recentCommits.slice(0, 5).map((commit) => (
              <a
                key={commit.hash}
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-2.5 border-t border-white/[0.04] first:border-0 hover:bg-white/[0.02] rounded-lg transition-colors -mx-2 px-2 group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-cyan-400/10 transition-colors">
                  <GitCommit size={12} className="text-gray-500 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-300 font-medium truncate">{commit.message}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <code className="text-[10px] text-cyan-400/70 font-mono">{commit.hash}</code>
                    <span className="text-[10px] text-gray-600">in</span>
                    <span className="text-[10px] text-purple-400/70 font-medium">{commit.repo}</span>
                  </div>
                </div>
                <span className="text-[10px] text-gray-600 font-semibold shrink-0">{commit.timeAgo}</span>
              </a>
            ))
          ) : (
            <p className="text-xs text-gray-600 text-center py-4">No recent commits found</p>
          )}
        </div>
      </div>
    </div>
  );
}
