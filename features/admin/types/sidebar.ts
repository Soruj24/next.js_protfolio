import type { LucideIcon } from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  badgeColor?: string;
  shortcut?: string;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export interface SidebarContextType {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}
