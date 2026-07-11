import { Briefcase, Shield, FileCode, Lock, Globe, AlertTriangle, Eye } from "lucide-react";

export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  briefcase: Briefcase,
  shield: Shield,
  file: FileCode,
  lock: Lock,
  globe: Globe,
  alert: AlertTriangle,
  eye: Eye,
};
