"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Zap, FolderGit2, FileText, MessageSquare, Shield, Settings,
  BarChart3, GitCommitHorizontal, Rocket, Globe, Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  _id: string;
  title: string;
  description: string;
  type: string;
  link?: string;
  createdAt: string;
}

const typeConfig: Record<string, { icon: typeof Zap; color: string; bg: string }> = {
  contact: { icon: MessageSquare, color: "text-cyan-400", bg: "bg-cyan-400/10" },
  project: { icon: FolderGit2, color: "text-emerald-400", bg: "bg-emerald-400/10" },
  blog: { icon: FileText, color: "text-purple-400", bg: "bg-purple-400/10" },
  security: { icon: Shield, color: "text-amber-400", bg: "bg-amber-400/10" },
  system: { icon: Settings, color: "text-blue-400", bg: "bg-blue-400/10" },
  analytics: { icon: BarChart3, color: "text-pink-400", bg: "bg-pink-400/10" },
  github: { icon: GitCommitHorizontal, color: "text-gray-300", bg: "bg-gray-300/10" },
  deployment: { icon: Rocket, color: "text-orange-400", bg: "bg-orange-400/10" },
  profile: { icon: Globe, color: "text-blue-400", bg: "bg-blue-400/10" },
};

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/activities?limit=8")
      .then((r) => r.json())
      .then((result) => setActivities(result.data || []))
      .catch(() => setActivities([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6 overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-amber-400" />
          <h3 className="text-sm font-semibold text-white">Activity Feed</h3>
        </div>
        <Link
          href="/admin/inquiries"
          className="text-[11px] font-semibold text-gray-500 hover:text-cyan-400 transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
        >
          View all
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={20} className="text-gray-600 animate-spin" />
          </div>
        ) : activities.length > 0 ? (
          <div className="space-y-0">
            {activities.map((activity, index) => {
              const config = typeConfig[activity.type] || typeConfig.system;
              const Icon = config.icon;
              return (
                <div
                  key={activity._id}
                  className={cn(
                    "relative flex items-start gap-3 pb-5 group",
                    index === activities.length - 1 && "pb-0",
                  )}
                >
                  {index < activities.length - 1 && (
                    <div className="absolute left-[15px] top-[30px] bottom-0 w-px bg-white/[0.06]" />
                  )}
                  <div className={cn("relative z-10 p-2 rounded-xl shrink-0", config.bg)}>
                    <Icon size={14} className={config.color} />
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <p className="text-sm font-medium text-white leading-tight">{activity.title}</p>
                    {activity.description && (
                      <p className="text-xs text-gray-500 font-medium mt-0.5 line-clamp-2">{activity.description}</p>
                    )}
                    <p className="text-[10px] text-gray-600 font-semibold mt-1.5 uppercase tracking-wider">
                      {timeAgo(activity.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <Zap size={20} className="text-gray-600 mb-2" />
            <p className="text-xs text-gray-500 font-medium">No activity yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
