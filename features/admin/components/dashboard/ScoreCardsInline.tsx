"use client";

import { useState, useEffect } from "react";
import { Gauge } from "lucide-react";
import { cn } from "@/lib/utils";
import { scoreConfigs, scoreColorMap } from "@/features/admin/data/dashboard";
import type { DashboardData } from "@/lib/services/dashboard";

function AnimatedGauge({ score, color }: { score: number; color: typeof scoreColorMap.cyan }) {
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
        <circle cx="50" cy="50" r={radius} fill="none" strokeWidth="6" className={color.ring} stroke="currentColor" />
        <circle
          cx="50" cy="50" r={radius} fill="none" strokeWidth="6" strokeLinecap="round"
          stroke={color.stroke} strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.05s linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn("text-2xl font-bold tabular-nums", color.text)}>{animatedScore}</span>
      </div>
    </div>
  );
}

export default function ScoreCardsInline({ performance }: { performance: DashboardData["performance"] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {scoreConfigs.map((cfg) => {
        const score = performance[cfg.key];
        const colors = scoreColorMap[cfg.color];
        return (
          <div key={cfg.key} className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-5 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl rounded-full opacity-0 blur-3xl group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(to bottom left, ${colors.stroke}15, transparent)` }} />
            <div className="relative z-10 flex items-center gap-5">
              <AnimatedGauge score={score} color={colors} />
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className={cn("p-1.5 rounded-lg", colors.bg)}>
                    <cfg.icon size={14} className={colors.text} />
                  </div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{cfg.label}</span>
                </div>
                <p className={cn("text-lg font-bold", colors.text)}>
                  {score >= 90 ? "Excellent" : score >= 70 ? "Good" : score >= 50 ? "Needs Work" : "Poor"}
                </p>
                <p className="text-xs text-gray-600 font-medium">{cfg.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
