"use client";

import { GitCommit, ArrowUpRight, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";

interface Commit {
  hash: string;
  author: string;
  avatar: string;
  message: string;
  additions: number;
  deletions: number;
  branch: string;
  timestamp: string;
}

const commits: Commit[] = [
  { hash: "a3f7c21", author: "Soruj", avatar: "S", message: "feat: add portfolio analytics dashboard", additions: 247, deletions: 12, branch: "main", timestamp: "2h ago" },
  { hash: "b8d4e09", author: "Soruj", avatar: "S", message: "fix: resolve hydration mismatch in charts", additions: 18, deletions: 34, branch: "feat/auth", timestamp: "5h ago" },
  { hash: "c1a9f34", author: "Soruj", avatar: "S", message: "refactor: optimize image loading pipeline", additions: 89, deletions: 156, branch: "main", timestamp: "1d ago" },
  { hash: "d5e2b87", author: "Soruj", avatar: "S", message: "chore: update dependencies to latest versions", additions: 312, deletions: 289, branch: "main", timestamp: "2d ago" },
  { hash: "e9f1a3c", author: "Soruj", avatar: "S", message: "feat: implement dark mode toggle", additions: 67, deletions: 8, branch: "feat/theme", timestamp: "3d ago" },
];

export default function RecentCommits() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <GitCommit size={16} className="text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">Recent Commits</h3>
        </div>
        <button className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-emerald-400 transition-colors px-2 py-1 rounded-lg hover:bg-white/5">
          GitHub
          <ArrowUpRight size={10} />
        </button>
      </div>

      <div className="divide-y divide-white/[0.04]">
        {commits.map((commit) => (
          <div key={commit.hash} className="px-6 py-4 hover:bg-white/[0.02] transition-colors group cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-[11px] font-bold text-white shrink-0 mt-0.5">
                {commit.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate leading-snug">{commit.message}</p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <code className="text-[10px] text-cyan-400/70 font-mono">{commit.hash}</code>
                  <span className="text-gray-700">·</span>
                  <div className="flex items-center gap-1">
                    <GitBranch size={10} className="text-gray-600" />
                    <span className="text-[10px] text-purple-400/70 font-medium">{commit.branch}</span>
                  </div>
                  <span className="text-gray-700">·</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-emerald-400/70 font-semibold">+{commit.additions}</span>
                    <span className="text-[10px] text-red-400/70 font-semibold">-{commit.deletions}</span>
                  </div>
                  <span className="text-gray-700">·</span>
                  <span className="text-[10px] text-gray-600 font-semibold">{commit.timestamp}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
