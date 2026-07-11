import { Brain, Zap, Rocket, Target, Lightbulb, TrendingUp, BarChart3 } from "lucide-react";

export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain,
  zap: Zap,
  rocket: Rocket,
  target: Target,
  lightbulb: Lightbulb,
  trending: TrendingUp,
  chart: BarChart3,
};

export const colorMap: Record<string, string> = {
  purple: "from-purple-500 to-violet-500",
  blue: "from-blue-500 to-cyan-500",
  cyan: "from-cyan-500 to-teal-500",
  green: "from-green-500 to-emerald-500",
  orange: "from-orange-500 to-amber-500",
  pink: "from-pink-500 to-rose-500",
  red: "from-red-500 to-pink-500",
  amber: "from-amber-500 to-yellow-500",
  indigo: "from-indigo-500 to-blue-500",
};
