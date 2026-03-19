import { ISettings } from "@/models/Settings";
import { Briefcase, CheckCircle2, Code, Star } from "lucide-react";

export function getStats(settings?: ISettings | null) {
  return [
    {
      label: "Completed Projects",
      value: settings?.case_studies?.length
        ? `${settings.case_studies.length}+`
        : "12+",
      icon: Briefcase,
      color: "text-blue-400",
    },
    {
      label: "Core Skills",
      value: settings?.technical_skills?.core_technologies?.length
        ? `${settings.technical_skills.core_technologies.length}+`
        : "25+",
      icon: Code,
      color: "text-cyan-400",
    },
    {
      label: "Expertise Areas",
      value: settings?.expertise?.length ? `${settings.expertise.length}` : "6",
      icon: Star,
      color: "text-yellow-400",
    },
    {
      label: "Certifications",
      value: settings?.education?.additional_info ? "Verified" : "8+",
      icon: CheckCircle2,
      color: "text-green-400",
    },
  ];
}

 export const navItems = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "about", label: "About", icon: "👨‍💻" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "innovation", label: "Innovation", icon: "💡" },
  { id: "projects", label: "Projects", icon: "🚀" },
  { id: "contact", label: "Contact", icon: "📞" },
];
