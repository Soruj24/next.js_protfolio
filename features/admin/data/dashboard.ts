import {
  Eye,
  Users,
  MousePointerClick,
  TrendingUp,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Accessibility,
  Gauge,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  Rocket,
  BarChart3,
  Shield,
  Code,
  Database,
  FileText,
  Mail,
  FolderKanban,
  Palette,
} from "lucide-react";

export const analyticsMetricConfig = [
  { key: "pageViews" as const, label: "Page Views", icon: Eye, color: "cyan", suffix: "" },
  { key: "visitors" as const, label: "Unique Visitors", icon: Users, color: "purple", suffix: "" },
  { key: "sessions" as const, label: "Sessions", icon: MousePointerClick, color: "emerald", suffix: "" },
  { key: "projectViews" as const, label: "Project Views", icon: Eye, color: "amber", suffix: "" },
  { key: "conversionRate" as const, label: "Conversion Rate", icon: Globe, color: "blue", suffix: "%" },
];

export const analyticsColorMap: Record<string, { iconBg: string; iconText: string; trend: string; bar: string }> = {
  cyan: { iconBg: "bg-cyan-400/10", iconText: "text-cyan-400", trend: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20", bar: "bg-cyan-400" },
  purple: { iconBg: "bg-purple-400/10", iconText: "text-purple-400", trend: "text-purple-400 bg-purple-400/10 border-purple-400/20", bar: "bg-purple-400" },
  emerald: { iconBg: "bg-emerald-400/10", iconText: "text-emerald-400", trend: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", bar: "bg-emerald-400" },
  amber: { iconBg: "bg-amber-400/10", iconText: "text-amber-400", trend: "text-amber-400 bg-amber-400/10 border-amber-400/20", bar: "bg-amber-400" },
  blue: { iconBg: "bg-blue-400/10", iconText: "text-blue-400", trend: "text-blue-400 bg-blue-400/10 border-blue-400/20", bar: "bg-blue-400" },
};

export const scoreConfigs = [
  { key: "accessibility" as const, label: "Accessibility", icon: Accessibility, color: "purple" as const, description: "WCAG 2.1 compliance" },
  { key: "bestPractices" as const, label: "Performance", icon: Gauge, color: "cyan" as const, description: "Core Web Vitals optimized" },
  { key: "seo" as const, label: "SEO", icon: Search, color: "emerald" as const, description: "Meta tags & structured data" },
];

export const scoreColorMap: Record<string, { stroke: string; text: string; bg: string; ring: string }> = {
  cyan: { stroke: "#22d3ee", text: "text-cyan-400", bg: "bg-cyan-400/10", ring: "stroke-cyan-400/20" },
  purple: { stroke: "#a78bfa", text: "text-purple-400", bg: "bg-purple-400/10", ring: "stroke-purple-400/20" },
  emerald: { stroke: "#34d399", text: "text-emerald-400", bg: "bg-emerald-400/10", ring: "stroke-emerald-400/20" },
};

export const deployStatusMap = {
  success: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10", label: "Ready" },
  building: { icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10", label: "Building" },
  failed: { icon: XCircle, color: "text-red-400", bg: "bg-red-400/10", label: "Failed" },
};

export const activityIconMap: Record<string, { icon: typeof Palette; color: string; bg: string }> = {
  contact: { icon: Mail, color: "text-amber-400", bg: "bg-amber-400/10" },
  project: { icon: FolderKanban, color: "text-cyan-400", bg: "bg-cyan-400/10" },
  blog: { icon: FileText, color: "text-blue-400", bg: "bg-blue-400/10" },
  security: { icon: Shield, color: "text-emerald-400", bg: "bg-emerald-400/10" },
  system: { icon: Database, color: "text-purple-400", bg: "bg-purple-400/10" },
  analytics: { icon: BarChart3, color: "text-pink-400", bg: "bg-pink-400/10" },
  github: { icon: Code, color: "text-gray-400", bg: "bg-gray-400/10" },
  deployment: { icon: Rocket, color: "text-orange-400", bg: "bg-orange-400/10" },
  profile: { icon: Users, color: "text-violet-400", bg: "bg-violet-400/10" },
};
