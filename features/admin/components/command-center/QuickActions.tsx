"use client";

import Link from "next/link";
import {
  Plus,
  FolderKanban,
  Code2,
  Mail,
  Settings,
  ExternalLink,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickAction {
  label: string;
  href: string;
  icon: typeof Plus;
  color: string;
  shortcut?: string;
}

const actions: QuickAction[] = [
  { label: "New Project", href: "/admin/projects/new", icon: Plus, color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20", shortcut: "N P" },
  { label: "New Skill", href: "/admin/skills/new", icon: Code2, color: "text-purple-400 bg-purple-400/10 border-purple-400/20", shortcut: "N S" },
  { label: "View Inbox", href: "/admin/inquiries", icon: Mail, color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
  { label: "All Projects", href: "/admin/projects", icon: FolderKanban, color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
  { label: "Portfolio", href: "/", icon: ExternalLink, color: "text-rose-400 bg-rose-400/10 border-rose-400/20" },
  { label: "Settings", href: "/admin/settings", icon: Settings, color: "text-gray-400 bg-gray-400/10 border-gray-400/20" },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6 overflow-hidden">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-1.5 rounded-lg bg-white/5">
          <Zap size={14} className="text-cyan-400" />
        </div>
        <h3 className="text-sm font-semibold text-white">Quick Actions</h3>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className={cn(
              "group flex flex-col items-center gap-2.5 p-4 rounded-xl border border-transparent transition-all duration-200",
              "hover:bg-white/[0.04] hover:border-white/[0.08]",
            )}
          >
            <div className={cn("p-2.5 rounded-xl border transition-transform duration-200 group-hover:scale-110", action.color)}>
              <action.icon size={16} />
            </div>
            <span className="text-[11px] font-semibold text-gray-400 group-hover:text-white transition-colors text-center leading-tight">
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}


