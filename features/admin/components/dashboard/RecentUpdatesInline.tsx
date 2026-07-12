import { CheckCircle2, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { activityIconMap } from "@/features/admin/data/dashboard";
import { timeAgo } from "@/features/admin/lib/time";
import type { DashboardData } from "@/lib/services/dashboard";

export default function RecentUpdatesInline({ activities }: { activities: DashboardData["activities"] }) {
  const updates = activities.recentActivities.slice(0, 6);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-blue-400" />
          <h3 className="text-sm font-semibold text-white">Recent Updates</h3>
        </div>
      </div>
      <div className="space-y-0">
        {updates.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <CheckCircle2 size={20} className="text-gray-600 mx-auto mb-2" />
            <p className="text-xs text-gray-500">No recent activity</p>
          </div>
        ) : (
          updates.map((update: any, index: number) => {
            const cfg = activityIconMap[update.type] || activityIconMap.system;
            return (
              <div key={update._id || index} className="relative flex items-start gap-3 px-6 py-4 hover:bg-white/[0.02] transition-colors">
                {index < updates.length - 1 && (
                  <div className="absolute left-[33px] top-[44px] bottom-0 w-px bg-white/[0.04]" />
                )}
                <div className={cn("relative z-10 p-2 rounded-xl shrink-0", cfg.bg)}>
                  <cfg.icon size={14} className={cfg.color} />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-sm font-medium text-white leading-tight">{update.title}</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">{update.description || ""}</p>
                  <p className="text-[10px] text-gray-600 font-semibold mt-1.5 uppercase tracking-wider">{timeAgo(update.createdAt)}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
