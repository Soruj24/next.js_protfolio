import { IProject } from "@/models/Project";
export type { IProject };

export interface IStat {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}
