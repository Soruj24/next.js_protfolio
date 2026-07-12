import type { LucideIcon } from "lucide-react";

export interface PaletteItem {
  id: string;
  name: string;
  hint?: string;
  icon: LucideIcon;
  iconColor?: string;
  section: string;
  action: () => void;
  keywords?: string[];
}

export interface ProjectResult {
  _id?: string;
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  liveUrl?: string;
  githubUrl?: string;
}
