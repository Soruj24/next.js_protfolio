import { Rocket, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { deployStatusMap } from "@/features/admin/data/dashboard";
import type { DashboardData } from "@/lib/services/dashboard";

export default function RecentDeploymentsInline({ github }: { github: DashboardData["github"] }) {
  const deployments = github.recentCommits.slice(0, 4).map((commit, i) => ({
    id: commit.hash,
    message: commit.message.length > 50 ? commit.message.slice(0, 50) + "..." : commit.message,
    branch: "main",
    commit: commit.hash.slice(0, 7),
    repo: commit.repo,
    timestamp: commit.timestamp,
    status: (i === 0 ? "success" : i === 1 ? "success" : "success") as "success",
  }));

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Rocket size={16} className="text-purple-400" />
          <h3 className="text-sm font-semibold text-white">Recent Deployments</h3>
        </div>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {deployments.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <Rocket size={20} className="text-gray-600 mx-auto mb-2" />
            <p className="text-xs text-gray-500">No recent deployments</p>
          </div>
        ) : (
          deployments.map((deploy) => {
            const cfg = deployStatusMap[deploy.status];
            return (
              <div key={deploy.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors group cursor-pointer">
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", cfg.bg)}>
                  <cfg.icon size={16} className={cfg.color} />
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
                    <span>{deploy.repo}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className={cn("text-[10px] font-bold uppercase tracking-wider mb-0.5", cfg.color)}>{cfg.label}</div>
                  <div className="text-[10px] text-gray-600 font-semibold">{new Date(deploy.timestamp).toLocaleDateString()}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
