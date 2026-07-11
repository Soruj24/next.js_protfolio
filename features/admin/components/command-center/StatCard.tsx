"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  description: string;
  href?: string;
  color: "cyan" | "purple" | "emerald" | "amber" | "rose";
}

const colorMap = {
  cyan: {
    iconBg: "bg-cyan-500/10",
    iconText: "text-cyan-400",
    iconShadow: "shadow-cyan-500/10",
    glow: "from-cyan-500/10 to-transparent",
    border: "hover:border-cyan-500/20",
    trend: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  },
  purple: {
    iconBg: "bg-purple-500/10",
    iconText: "text-purple-400",
    iconShadow: "shadow-purple-500/10",
    glow: "from-purple-500/10 to-transparent",
    border: "hover:border-purple-500/20",
    trend: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  },
  emerald: {
    iconBg: "bg-emerald-500/10",
    iconText: "text-emerald-400",
    iconShadow: "shadow-emerald-500/10",
    glow: "from-emerald-500/10 to-transparent",
    border: "hover:border-emerald-500/20",
    trend: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
  amber: {
    iconBg: "bg-amber-500/10",
    iconText: "text-amber-400",
    iconShadow: "shadow-amber-500/10",
    glow: "from-amber-500/10 to-transparent",
    border: "hover:border-amber-500/20",
    trend: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  },
  rose: {
    iconBg: "bg-rose-500/10",
    iconText: "text-rose-400",
    iconShadow: "shadow-rose-500/10",
    glow: "from-rose-500/10 to-transparent",
    border: "hover:border-rose-500/20",
    trend: "text-rose-400 bg-rose-400/10 border-rose-400/20",
  },
};

function AnimatedNumber({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (value === 0) {
      setDisplayed(0);
      return;
    }
    const duration = 800;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), value);
      setDisplayed(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayed}</span>;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp = true,
  description,
  href,
  color,
}: StatCardProps) {
  const colors = colorMap[color];
  const Wrapper = href ? Link : "div";

  return (
    <Wrapper
      {...(href ? { href } : {})}
      className={cn(
        "group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-5 transition-all duration-300 hover:bg-white/[0.05] overflow-hidden block",
        colors.border,
        href && "cursor-pointer",
      )}
    >
      <div className={cn("absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl rounded-full opacity-0 blur-3xl group-hover:opacity-100 transition-opacity duration-500 pointer-events-none", colors.glow)} />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shadow-lg", colors.iconBg, colors.iconShadow)}>
            <Icon size={18} className={colors.iconText} />
          </div>
          {trend && (
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 text-[10px] font-bold rounded-full border",
              colors.trend,
            )}>
              {trendUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
              {trend}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
          <div className="text-3xl font-bold text-white tabular-nums tracking-tight">
            {typeof value === "number" ? <AnimatedNumber value={value} /> : value}
          </div>
          <p className="text-xs text-gray-600 font-medium">{description}</p>
        </div>
      </div>
    </Wrapper>
  );
}
