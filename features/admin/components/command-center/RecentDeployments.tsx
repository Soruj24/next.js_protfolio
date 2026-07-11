"use client";

import { Rocket, CheckCircle2, Clock, XCircle, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Deployment {
  id: string;
  environment: string;
  branch: string;
  status: "success" | "building" | "failed" | "queued";
  commit: string;
  message: string;
  duration: string;
  timestamp: string;
}

const deployments: Deployment[] = [
  { id: "1", environment: "Production", branch: "main", status: "success", commit: "a3f7c21", message: "feat: dashboard analytics", duration: "1m 23s", timestamp: "2h ago" },
  { id: "2", environment: "Preview", branch: "feat/auth", status: "success", commit: "b8d4e09", message: "fix: hydration mismatch", duration: "58s", timestamp: "5h ago" },
  { id: "3", environment: "Production", branch: "main", status: "building", commit: "e4c1a88", message: "chore: update deps", duration: "...", timestamp: "Now" },
  { id: "4", environment: "Preview", branch: "fix/perf", status: "failed", commit: "d5e2b87", message: "refactor: image pipeline", duration: "2m 11s", timestamp: "1d ago" },
];

const statusConfig = {
  success: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10", label: "Ready" },
  building: { icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10", label: "Building" },
  failed: { icon: XCircle, color: "text-red-400", bg: "bg-red-400/10", label: "Failed" },
  queued: { icon: Clock, color: "text-gray-400", bg: "bg-gray-400/10", label: "Queued" },
};

export default function RecentDeployments() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Rocket size={16} className="text-purple-400" />
          <h3 className="text-sm font-semibold text-white">Recent Deployments</h3>
        </div>
        <button className="text-[11px] font-semibold text-gray-500 hover:text-purple-400 transition-colors px-2 py-1 rounded-lg hover:bg-white/5">
          View all
        </button>
      </div>

      <div className="divide-y divide-white/[0.04]">
        {deployments.map((deploy) => {
          const cfg = statusConfig[deploy.status];
          return (
            <div key={deploy.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors group cursor-pointer">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", cfg.bg)}>
                <cfg.icon size={16} className={cn(cfg.color, deploy.status === "building" && "animate-spin")} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium text-white truncate">{deploy.message}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                  <code className="text-cyan-400/70 font-mono">{deploy.commit}</code>
                  <span className="text-gray-700">·</span>
                  <span className="text-purple-400/70">{deploy.branch}</span>
                  <span className="text-gray-700">·</span>
                  <span>{deploy.environment}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className={cn("text-[10px] font-bold uppercase tracking-wider mb-0.5", cfg.color)}>
                  {cfg.label}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-600 font-semibold">
                  <span>{deploy.duration}</span>
                  <span className="text-gray-700">·</span>
                  <span>{deploy.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
