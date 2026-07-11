"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface ScoreCardProps {
  label: string;
  score: number;
  icon: LucideIcon;
  color: "cyan" | "purple" | "emerald" | "amber" | "rose";
  description?: string;
}

const colorMap = {
  cyan: { stroke: "#22d3ee", text: "text-cyan-400", bg: "bg-cyan-400/10", ring: "stroke-cyan-400/20" },
  purple: { stroke: "#a78bfa", text: "text-purple-400", bg: "bg-purple-400/10", ring: "stroke-purple-400/20" },
  emerald: { stroke: "#34d399", text: "text-emerald-400", bg: "bg-emerald-400/10", ring: "stroke-emerald-400/20" },
  amber: { stroke: "#fbbf24", text: "text-amber-400", bg: "bg-amber-400/10", ring: "stroke-amber-400/20" },
  rose: { stroke: "#fb7185", text: "text-rose-400", bg: "bg-rose-400/10", ring: "stroke-rose-400/20" },
};

function AnimatedGauge({ score, color }: { score: number; color: typeof colorMap.cyan }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const duration = 1200;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [score]);

  return (
    <div className="relative w-[100px] h-[100px]">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="6"
          className={color.ring}
          stroke="currentColor"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          stroke={color.stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.05s linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn("text-2xl font-bold tabular-nums", color.text)}>
          {animatedScore}
        </span>
      </div>
    </div>
  );
}

export default function ScoreCard({ label, score, icon: Icon, color, description }: ScoreCardProps) {
  const colors = colorMap[color];

  return (
    <div className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-5 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl rounded-full opacity-0 blur-3xl group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(to bottom left, ${colors.stroke}15, transparent)` }} />

      <div className="relative z-10 flex items-center gap-5">
        <AnimatedGauge score={score} color={colors} />
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className={cn("p-1.5 rounded-lg", colors.bg)}>
              <Icon size={14} className={colors.text} />
            </div>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{label}</span>
          </div>
          <p className={cn("text-lg font-bold", colors.text)}>
            {score >= 90 ? "Excellent" : score >= 70 ? "Good" : score >= 50 ? "Needs Work" : "Poor"}
          </p>
          {description && (
            <p className="text-xs text-gray-600 font-medium">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
