import {
  LayoutDashboard,
  FolderKanban,
  Code2,
  Mail,
  Settings,
  Clock,
  BarChart3,
} from "lucide-react";
import type { NavSection } from "@/features/admin/types/sidebar";

export const navigation: NavSection[] = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard, shortcut: "G D" },
      { name: "Analytics", href: "/admin/analytics", icon: BarChart3, shortcut: "G A" },
      { name: "Timeline", href: "/admin/timeline", icon: Clock, shortcut: "G T" },
    ],
  },
  {
    label: "Management",
    items: [
      { name: "Projects", href: "/admin/projects", icon: FolderKanban, shortcut: "G P" },
      { name: "Skills", href: "/admin/skills", icon: Code2, shortcut: "G S" },
      {
        name: "Inquiries",
        href: "/admin/inquiries",
        icon: Mail,
        badgeColor: "bg-cyan-400 text-black",
        shortcut: "G I",
      },
    ],
  },
  {
    label: "System",
    items: [
      { name: "Settings", href: "/admin/settings", icon: Settings, shortcut: "G X" },
    ],
  },
];

export const allPages = navigation.flatMap((s) => s.items);
