"use client";

import type { LucideIcon } from "lucide-react";
import AnimatedCounter from "@/features/admin/components/analytics/AnimatedCounter";

export default function AnalyticsMetricCard({
  label, value, icon: Icon, color, prefix, suffix, decimals,
}: {
  label: string; value: number; icon: LucideIcon; color: string;
  prefix?: string; suffix?: string; decimals?: number;
}) {
  return (
    <div className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-5 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-0 blur-3xl group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(to bottom left, ${color}20, transparent)` }} />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2.5 rounded-xl" style={{ background: `${color}15` }}>
            <Icon size={18} style={{ color }} />
          </div>
        </div>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
        <div className="text-2xl font-bold text-white tabular-nums">
          <AnimatedCounter value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
        </div>
      </div>
    </div>
  );
}
