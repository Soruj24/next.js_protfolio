"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  Users,
  MousePointerClick,
  Clock,
  TrendingUp,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Metric {
  label: string;
  value: number;
  suffix: string;
  icon: typeof Eye;
  color: "cyan" | "purple" | "emerald" | "amber" | "rose" | "blue";
  trend: string;
  trendUp: boolean;
  sparkline: number[];
}

const metrics: Metric[] = [
  { label: "Page Views", value: 12847, suffix: "", icon: Eye, color: "cyan", trend: "+12.5%", trendUp: true, sparkline: [40, 55, 45, 70, 65, 80, 75] },
  { label: "Unique Visitors", value: 3284, suffix: "", icon: Users, color: "purple", trend: "+8.3%", trendUp: true, sparkline: [20, 35, 30, 45, 40, 55, 50] },
  { label: "Bounce Rate", value: 34, suffix: "%", icon: MousePointerClick, color: "emerald", trend: "-5.2%", trendUp: true, sparkline: [60, 50, 55, 45, 40, 38, 34] },
  { label: "Avg. Session", value: 4, suffix: "m 23s", icon: Clock, color: "amber", trend: "+1.8%", trendUp: true, sparkline: [30, 35, 38, 40, 42, 44, 45] },
  { label: "Conversion", value: 2.4, suffix: "%", icon: TrendingUp, color: "rose", trend: "+0.3%", trendUp: true, sparkline: [15, 18, 20, 19, 22, 23, 24] },
  { label: "Top Country", value: 0, suffix: "Bangladesh", icon: Globe, color: "blue", trend: "#1", trendUp: true, sparkline: [50, 55, 60, 58, 65, 68, 72] },
];

const colorMap = {
  cyan: { iconBg: "bg-cyan-400/10", iconText: "text-cyan-400", trend: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20", bar: "bg-cyan-400" },
  purple: { iconBg: "bg-purple-400/10", iconText: "text-purple-400", trend: "text-purple-400 bg-purple-400/10 border-purple-400/20", bar: "bg-purple-400" },
  emerald: { iconBg: "bg-emerald-400/10", iconText: "text-emerald-400", trend: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", bar: "bg-emerald-400" },
  amber: { iconBg: "bg-amber-400/10", iconText: "text-amber-400", trend: "text-amber-400 bg-amber-400/10 border-amber-400/20", bar: "bg-amber-400" },
  rose: { iconBg: "bg-rose-400/10", iconText: "text-rose-400", trend: "text-rose-400 bg-rose-400/10 border-rose-400/20", bar: "bg-rose-400" },
  blue: { iconBg: "bg-blue-400/10", iconText: "text-blue-400", trend: "text-blue-400 bg-blue-400/10 border-blue-400/20", bar: "bg-blue-400" },
};

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  return (
    <div className="flex items-end gap-[2px] h-6">
      {data.map((val, i) => {
        const height = ((val - min) / range) * 100;
        return (
          <div
            key={i}
            className={cn("w-1.5 rounded-full transition-all duration-500", color)}
            style={{ height: `${Math.max(height, 15)}%`, opacity: i === data.length - 1 ? 1 : 0.4 + (i / data.length) * 0.6 }}
          />
        );
      })}
    </div>
  );
}

function AnimatedValue({ value, suffix }: { value: number; suffix: string }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (value === 0) { setDisplayed(0); return; }
    const duration = 1000;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Number((eased * value).toFixed(value % 1 !== 0 ? 1 : 0)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span>
      {displayed.toLocaleString()}
      {suffix && <span className="text-sm text-gray-500 font-medium ml-1">{suffix}</span>}
    </span>
  );
}

export default function AnalyticsOverview() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <BarChart3 size={16} className="text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">Portfolio Analytics</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-[10px] font-bold text-cyan-400 bg-cyan-400/10 rounded-full border border-cyan-400/20">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.04]">
        {metrics.map((metric) => {
          const colors = colorMap[metric.color];
          return (
            <div key={metric.label} className="flex items-center gap-4 px-6 py-5 hover:bg-white/[0.02] transition-colors">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", colors.iconBg)}>
                <metric.icon size={18} className={colors.iconText} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">{metric.label}</p>
                <p className="text-xl font-bold text-white tabular-nums">
                  <AnimatedValue value={metric.value} suffix={metric.suffix} />
                </p>
              </div>
              <div className="text-right space-y-2 shrink-0">
                <div className={cn(
                  "inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-bold rounded-full border",
                  colors.trend,
                )}>
                  {metric.trendUp ? <ArrowUpRight size={9} /> : <ArrowDownRight size={9} />}
                  {metric.trend}
                </div>
                <MiniSparkline data={metric.sparkline} color={colors.bar} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BarChart3({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}
