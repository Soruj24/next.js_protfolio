export type { IProject, IProjectVersion, IPerformanceStats, IAccessibilityItem, ISEOItem, ICodeSnippet, ITechDecision, IFolderNode } from "@/models/Project";
export type { ISkillCategory, ISkillItem } from "@/models/Skill";
export type { IContact, IContactDocument } from "@/models/Contact";
export type { ISettings } from "@/models/Settings";

export interface IStat {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}
