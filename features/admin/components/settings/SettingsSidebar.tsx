"use client";

import {
  User,
  Globe,
  Search,
  Palette,
  Bell,
  Shield,
  Database,
  FileText,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SettingsSection } from "@/features/admin/hooks/useSettingsManager";

interface NavItem {
  id: SettingsSection;
  label: string;
  icon: LucideIcon;
  description: string;
}

const sections: NavItem[] = [
  { id: "profile", label: "Profile", icon: User, description: "Your personal info & avatar" },
  { id: "portfolio", label: "Portfolio", icon: Globe, description: "Portfolio metadata & branding" },
  { id: "seo", label: "SEO", icon: Search, description: "Search engine optimization" },
  { id: "social", label: "Social Links", icon: Globe, description: "Social media profiles" },
  { id: "appearance", label: "Appearance", icon: Palette, description: "Theme, colors & layout" },
  { id: "notifications", label: "Notifications", icon: Bell, description: "Alerts & notifications" },
  { id: "security", label: "Security", icon: Shield, description: "Sessions & API keys" },
  { id: "data", label: "Data & Backup", icon: Database, description: "Export, import & backup" },
  { id: "content", label: "Content", icon: FileText, description: "Portfolio content & data" },
];

interface SettingsSidebarProps {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
}

export default function SettingsSidebar({
  activeSection,
  onSectionChange,
}: SettingsSidebarProps) {
  return (
    <nav className="space-y-1">
      <div className="px-3 py-2 mb-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
          Settings
        </p>
      </div>
      {sections.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200",
              "group relative overflow-hidden",
              isActive
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                : "text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent"
            )}
          >
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent" />
            )}
            <div
              className={cn(
                "relative flex items-center justify-center w-8 h-8 rounded-md transition-all",
                isActive
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "bg-gray-800 text-gray-500 group-hover:bg-gray-700 group-hover:text-gray-300"
              )}
            >
              <Icon size={16} />
            </div>
            <div className="relative flex-1 min-w-0">
              <p
                className={cn(
                  "text-sm font-medium truncate",
                  isActive ? "text-cyan-300" : ""
                )}
              >
                {item.label}
              </p>
              <p className="text-[11px] text-gray-600 truncate">{item.description}</p>
            </div>
          </button>
        );
      })}
    </nav>
  );
}

export type { NavItem };
export { sections };
