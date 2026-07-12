import {
  LayoutDashboard, BarChart3, Clock, FolderKanban, Code2, Mail, Settings,
  Plus, ExternalLink, Hash, Globe, TrendingUp, Palette, Zap, FileText,
  type LucideIcon,
} from "lucide-react";

export interface StaticItem {
  id: string;
  name: string;
  hint?: string;
  icon: LucideIcon;
  iconColor?: string;
  section: string;
  keywords?: string[];
}

export const PAGE_ITEMS: StaticItem[] = [
  { id: "page-dashboard", name: "Dashboard", hint: "Overview & metrics", icon: LayoutDashboard, iconColor: "text-cyan-400", section: "Pages", keywords: ["home", "overview", "metrics"] },
  { id: "page-analytics", name: "Analytics", hint: "Traffic & performance", icon: BarChart3, iconColor: "text-blue-400", section: "Pages", keywords: ["traffic", "stats", "charts"] },
  { id: "page-timeline", name: "Timeline", hint: "Activity timeline", icon: Clock, iconColor: "text-amber-400", section: "Pages", keywords: ["activity", "events", "history"] },
  { id: "page-projects", name: "Projects", hint: "Manage portfolio", icon: FolderKanban, iconColor: "text-violet-400", section: "Pages", keywords: ["portfolio", "work"] },
  { id: "page-skills", name: "Skills", hint: "Skill categories", icon: Code2, iconColor: "text-emerald-400", section: "Pages", keywords: ["tech", "abilities"] },
  { id: "page-inquiries", name: "Inquiries", hint: "Contact messages", icon: Mail, iconColor: "text-amber-400", section: "Pages", keywords: ["messages", "contact", "inbox"] },
  { id: "page-settings", name: "Settings", hint: "Configuration", icon: Settings, iconColor: "text-gray-400", section: "Pages", keywords: ["config", "preferences", "options"] },
];

export const ACTION_ITEMS: StaticItem[] = [
  { id: "action-new-project", name: "New Project", hint: "Create project", icon: Plus, iconColor: "text-emerald-400", section: "Actions", keywords: ["create", "add"] },
  { id: "action-new-skill", name: "New Skill Category", hint: "Create skill", icon: Plus, iconColor: "text-sky-400", section: "Actions", keywords: ["create", "add"] },
  { id: "action-view-portfolio", name: "View Live Portfolio", hint: "Opens in new tab", icon: ExternalLink, iconColor: "text-pink-400", section: "Actions", keywords: ["preview", "live", "site"] },
];

export const SETTINGS_ITEMS: StaticItem[] = [
  { id: "setting-profile", name: "Profile Settings", hint: "Personal info & avatar", icon: Hash, iconColor: "text-cyan-400", section: "Settings", keywords: ["profile", "avatar", "bio", "personal"] },
  { id: "setting-portfolio", name: "Portfolio Settings", hint: "Title, description, branding", icon: Globe, iconColor: "text-blue-400", section: "Settings", keywords: ["portfolio", "brand", "title"] },
  { id: "setting-seo", name: "SEO Settings", hint: "Meta tags & analytics", icon: TrendingUp, iconColor: "text-green-400", section: "Settings", keywords: ["seo", "meta", "analytics", "search"] },
  { id: "setting-social", name: "Social Links", hint: "Social media profiles", icon: Globe, iconColor: "text-pink-400", section: "Settings", keywords: ["social", "links", "github", "linkedin"] },
  { id: "setting-appearance", name: "Appearance", hint: "Theme & colors", icon: Palette, iconColor: "text-violet-400", section: "Settings", keywords: ["theme", "color", "font", "style"] },
  { id: "setting-notifications", name: "Notifications", hint: "Alert preferences", icon: Mail, iconColor: "text-amber-400", section: "Settings", keywords: ["alert", "email", "notify"] },
  { id: "setting-security", name: "Security", hint: "Password & 2FA", icon: Zap, iconColor: "text-red-400", section: "Settings", keywords: ["password", "2fa", "security", "session"] },
  { id: "setting-data", name: "Data & Backup", hint: "Export, import, autosave", icon: FileText, iconColor: "text-emerald-400", section: "Settings", keywords: ["export", "import", "backup", "save"] },
];

export const SECTION_ICONS: Record<string, LucideIcon> = {
  Pages: LayoutDashboard,
  Actions: Zap,
  Settings: Settings,
  Projects: FolderKanban,
};

export const SECTION_COLORS: Record<string, string> = {
  Pages: "text-cyan-400",
  Actions: "text-emerald-400",
  Settings: "text-violet-400",
  Projects: "text-amber-400",
};
