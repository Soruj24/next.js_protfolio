"use client";

import {
  Palette,
  Shield,
  Globe,
  Code2,
  Database,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Update {
  id: string;
  icon: typeof Palette;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  time: string;
}

const updates: Update[] = [
  { id: "1", icon: Palette, iconColor: "text-pink-400", iconBg: "bg-pink-400/10", title: "Theme updated", description: "Dark mode accent colors refined", time: "1h ago" },
  { id: "2", icon: Shield, iconColor: "text-emerald-400", iconBg: "bg-emerald-400/10", title: "Security patch applied", description: "Dependencies updated for vulnerability fix", time: "3h ago" },
  { id: "3", icon: Globe, iconColor: "text-cyan-400", iconBg: "bg-cyan-400/10", title: "SEO meta tags updated", description: "Open Graph images refreshed", time: "6h ago" },
  { id: "4", icon: Code2, iconColor: "text-purple-400", iconBg: "bg-purple-400/10", title: "API endpoints optimized", description: "Response times reduced by 40%", time: "1d ago" },
  { id: "5", icon: Database, iconColor: "text-amber-400", iconBg: "bg-amber-400/10", title: "Database indexes added", description: "Query performance improved", time: "2d ago" },
  { id: "6", icon: FileText, iconColor: "text-blue-400", iconBg: "bg-blue-400/10", title: "Documentation updated", description: "API reference docs regenerated", time: "3d ago" },
];

export default function RecentUpdates() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-blue-400" />
          <h3 className="text-sm font-semibold text-white">Recent Updates</h3>
        </div>
        <button className="text-[11px] font-semibold text-gray-500 hover:text-blue-400 transition-colors px-2 py-1 rounded-lg hover:bg-white/5">
          View all
        </button>
      </div>

      <div className="space-y-0">
        {updates.map((update, index) => (
          <div key={update.id} className="relative flex items-start gap-3 px-6 py-4 hover:bg-white/[0.02] transition-colors">
            {index < updates.length - 1 && (
              <div className="absolute left-[33px] top-[44px] bottom-0 w-px bg-white/[0.04]" />
            )}
            <div className={cn("relative z-10 p-2 rounded-xl shrink-0", update.iconBg)}>
              <update.icon size={14} className={update.iconColor} />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-sm font-medium text-white leading-tight">{update.title}</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">{update.description}</p>
              <p className="text-[10px] text-gray-600 font-semibold mt-1.5 uppercase tracking-wider">{update.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
