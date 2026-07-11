"use client";

import Link from "next/link";
import {
  Plus,
  FolderKanban,
  Code2,
  Mail,
  Settings,
  ExternalLink,
  Pin,
  Megaphone,
  Users,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PinnedAction {
  label: string;
  href: string;
  icon: typeof Plus;
  color: string;
  description: string;
  pinned?: boolean;
}

const actions: PinnedAction[] = [
  { label: "New Project", href: "/admin/projects/new", icon: Plus, color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20", description: "Create a new portfolio project" },
  { label: "New Skill", href: "/admin/skills/new", icon: Code2, color: "text-purple-400 bg-purple-400/10 border-purple-400/20", description: "Add a technical skill" },
  { label: "View Inbox", href: "/admin/inquiries", icon: Mail, color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", description: "Check contact messages" },
  { label: "All Projects", href: "/admin/projects", icon: FolderKanban, color: "text-amber-400 bg-amber-400/10 border-amber-400/20", description: "Manage your projects" },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3, color: "text-blue-400 bg-blue-400/10 border-blue-400/20", description: "View portfolio analytics" },
  { label: "Settings", href: "/admin/settings", icon: Settings, color: "text-gray-400 bg-gray-400/10 border-gray-400/20", description: "System configuration" },
];

export default function PinnedActions() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Pin size={16} className="text-amber-400" />
          <h3 className="text-sm font-semibold text-white">Pinned Actions</h3>
        </div>
        <button className="text-[11px] font-semibold text-gray-500 hover:text-amber-400 transition-colors px-2 py-1 rounded-lg hover:bg-white/5">
          Customize
        </button>
      </div>

      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="group flex flex-col items-center gap-2.5 p-4 rounded-xl border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-200"
          >
            <div className={cn("p-2.5 rounded-xl border transition-transform duration-200 group-hover:scale-110", action.color)}>
              <action.icon size={18} />
            </div>
            <div className="text-center">
              <span className="text-[11px] font-semibold text-gray-400 group-hover:text-white transition-colors block leading-tight">
                {action.label}
              </span>
              <span className="text-[9px] text-gray-600 font-medium hidden sm:block mt-0.5">
                {action.description}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
