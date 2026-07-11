"use client";

import {
  MessageSquare,
  FolderPlus,
  Settings,
  Code2,
  User,
  CheckCircle2,
  Zap,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  icon: typeof MessageSquare;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  time: string;
}

const activities: ActivityItem[] = [
  {
    id: "1",
    icon: MessageSquare,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-400/10",
    title: "New inquiry submitted",
    description: "John Doe sent a message via the contact form.",
    time: "2 minutes ago",
  },
  {
    id: "2",
    icon: FolderPlus,
    iconColor: "text-purple-400",
    iconBg: "bg-purple-400/10",
    title: "Project created",
    description: "Added a new project to the portfolio.",
    time: "1 hour ago",
  },
  {
    id: "3",
    icon: Code2,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-400/10",
    title: "Skills updated",
    description: "Skill category 'Frontend' was modified.",
    time: "3 hours ago",
  },
  {
    id: "4",
    icon: Settings,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-400/10",
    title: "Settings changed",
    description: "Portfolio configuration was updated.",
    time: "5 hours ago",
  },
  {
    id: "5",
    icon: Globe,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-400/10",
    title: "System deployed",
    description: "Production build deployed successfully.",
    time: "Yesterday",
  },
  {
    id: "6",
    icon: CheckCircle2,
    iconColor: "text-green-400",
    iconBg: "bg-green-400/10",
    title: "Health check passed",
    description: "All API endpoints responding normally.",
    time: "Yesterday",
  },
];

export default function ActivityFeed() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6 overflow-hidden h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-amber-400" />
          <h3 className="text-sm font-semibold text-white">Activity Feed</h3>
        </div>
        <button className="text-[11px] font-semibold text-gray-500 hover:text-cyan-400 transition-colors px-2 py-1 rounded-lg hover:bg-white/5">
          View all
        </button>
      </div>

      <div className="space-y-0">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={cn(
              "relative flex items-start gap-3 pb-5 group",
              index === activities.length - 1 && "pb-0",
            )}
          >
            {index < activities.length - 1 && (
              <div className="absolute left-[15px] top-[30px] bottom-0 w-px bg-white/[0.06]" />
            )}

            <div className={cn("relative z-10 p-2 rounded-xl shrink-0", activity.iconBg)}>
              <activity.icon size={14} className={activity.iconColor} />
            </div>

            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-sm font-medium text-white leading-tight">{activity.title}</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5 line-clamp-2">{activity.description}</p>
              <p className="text-[10px] text-gray-600 font-semibold mt-1.5 uppercase tracking-wider">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
