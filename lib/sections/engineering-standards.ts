import { TestTube2, GitBranch, Code2, FileCode2, type LucideIcon } from "lucide-react";

interface IconDef {
  icon: LucideIcon;
  className: string;
}

export const iconMap: Record<string, IconDef> = {
  "🧪": { icon: TestTube2, className: "w-6 h-6 text-emerald-400" },
  "🌿": { icon: GitBranch, className: "w-6 h-6 text-blue-400" },
  "💎": { icon: Code2, className: "w-6 h-6 text-purple-400" },
  "📄": { icon: FileCode2, className: "w-6 h-6 text-orange-400" },
};

export const defaultStandards = [
  { title: "Component Excellence", description: "Building highly reusable, atomic components following the Compound Component and Render Props patterns for maximum flexibility.", icon: "💎", metrics: "High Reusability", features: ["Atomic Design", "Compound Components", "Custom Hooks"] },
  { title: "Performance First", description: "Optimizing for Core Web Vitals, implementing advanced code splitting, and ensuring 95+ Lighthouse scores for all production frontends.", icon: "🌿", metrics: "95+ Score", features: ["Core Web Vitals", "Image Optimization", "Code Splitting"] },
  { title: "Testing & Reliability", description: "Adopting TDD with Vitest, React Testing Library, and Playwright to ensure robust components and zero-regression deployments.", icon: "🧪", metrics: "90% Coverage", features: ["Component Testing", "E2E Testing", "Visual Regression"] },
  { title: "Design Systems", description: "Scaling UI development through robust design systems, Storybook documentation, and maintaining consistent design tokens.", icon: "📄", metrics: "Documented", features: ["Storybook", "Design Tokens", "TSDoc Documentation"] },
];
