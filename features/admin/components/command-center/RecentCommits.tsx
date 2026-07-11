"use client";

import { GitCommit, ArrowUpRight, GitBranch, Loader2 } from "lucide-react";
import { useGitHubMcp } from "@/features/admin/hooks/useGitHubMcp";

export default function RecentCommits({ username: propUsername }: { username?: string }) {
  const { recentCommits, profile, loading } = useGitHubMcp();
  const username = propUsername || profile?.username || "Soruj24";

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <GitCommit size={16} className="text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">Recent Commits</h3>
          {loading && <Loader2 size={12} className="text-gray-500 animate-spin" />}
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-emerald-400 transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
        >
          GitHub
          <ArrowUpRight size={10} />
        </a>
      </div>

      <div className="divide-y divide-white/[0.04]">
        {loading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="px-6 py-4 animate-pulse">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 w-3/4 bg-white/5 rounded" />
                  <div className="flex gap-2">
                    <div className="h-2.5 w-16 bg-white/[0.03] rounded" />
                    <div className="h-2.5 w-12 bg-white/[0.03] rounded" />
                    <div className="h-2.5 w-14 bg-white/[0.03] rounded" />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : recentCommits.length ? (
          recentCommits.map((commit) => (
            <a
              key={commit.hash}
              href={commit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 hover:bg-white/[0.02] transition-colors group"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-[11px] font-bold text-white shrink-0 mt-0.5">
                  {username.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate leading-snug">{commit.message}</p>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <code className="text-[10px] text-cyan-400/70 font-mono">{commit.hash}</code>
                    <span className="text-gray-700">&middot;</span>
                    <div className="flex items-center gap-1">
                      <GitBranch size={10} className="text-gray-600" />
                      <span className="text-[10px] text-purple-400/70 font-medium">main</span>
                    </div>
                    <span className="text-gray-700">&middot;</span>
                    <span className="text-[10px] text-purple-400/50 font-medium">{commit.repo}</span>
                    <span className="text-gray-700">&middot;</span>
                    <span className="text-[10px] text-gray-600 font-semibold">{commit.timeAgo}</span>
                  </div>
                </div>
              </div>
            </a>
          ))
        ) : (
          <p className="text-xs text-gray-600 text-center py-6">No recent commits found</p>
        )}
      </div>
    </div>
  );
}
