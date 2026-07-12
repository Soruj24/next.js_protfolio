import { Clock, FolderGit2, FileText, MessageSquare, GitCommitHorizontal, Shield, Rocket, BarChart3, Settings, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const TYPE_FILTERS: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "all", label: "All", icon: Clock },
  { value: "project", label: "Projects", icon: FolderGit2 },
  { value: "blog", label: "Blogs", icon: FileText },
  { value: "contact", label: "Messages", icon: MessageSquare },
  { value: "github", label: "GitHub", icon: GitCommitHorizontal },
  { value: "security", label: "Security", icon: Shield },
  { value: "deployment", label: "Deployments", icon: Rocket },
  { value: "analytics", label: "Analytics", icon: BarChart3 },
  { value: "system", label: "System", icon: Settings },
];

export const TYPE_CONFIG: Record<string, { icon: LucideIcon; color: string; bg: string; dot: string }> = {
  project: { icon: FolderGit2, color: "text-emerald-400", bg: "bg-emerald-400/10", dot: "bg-emerald-400" },
  blog: { icon: FileText, color: "text-purple-400", bg: "bg-purple-400/10", dot: "bg-purple-400" },
  contact: { icon: MessageSquare, color: "text-cyan-400", bg: "bg-cyan-400/10", dot: "bg-cyan-400" },
  security: { icon: Shield, color: "text-amber-400", bg: "bg-amber-400/10", dot: "bg-amber-400" },
  system: { icon: Settings, color: "text-blue-400", bg: "bg-blue-400/10", dot: "bg-blue-400" },
  analytics: { icon: BarChart3, color: "text-pink-400", bg: "bg-pink-400/10", dot: "bg-pink-400" },
  github: { icon: GitCommitHorizontal, color: "text-gray-300", bg: "bg-gray-300/10", dot: "bg-gray-400" },
  deployment: { icon: Rocket, color: "text-orange-400", bg: "bg-orange-400/10", dot: "bg-orange-400" },
  profile: { icon: Globe, color: "text-blue-400", bg: "bg-blue-400/10", dot: "bg-blue-400" },
};
