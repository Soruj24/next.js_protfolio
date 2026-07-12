import { BarChart3, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { analyticsMetricConfig, analyticsColorMap } from "@/features/admin/data/dashboard";
import AnimatedValue from "@/features/admin/components/dashboard/AnimatedValue";
import type { DashboardData } from "@/lib/services/dashboard";

export default function AnalyticsOverviewInline({ analytics }: { analytics: DashboardData["analytics"] }) {
  const values: Record<string, number> = {
    pageViews: analytics.pageViews,
    visitors: analytics.visitors,
    sessions: analytics.sessions,
    projectViews: analytics.projectViews,
    resumeDownloads: analytics.resumeDownloads,
    conversionRate: analytics.conversionRate,
  };

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
        {analyticsMetricConfig.map((metric) => {
          const colors = analyticsColorMap[metric.color];
          const val = values[metric.key] || 0;
          return (
            <div key={metric.key} className="flex items-center gap-4 px-6 py-5 hover:bg-white/[0.02] transition-colors">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", colors.iconBg)}>
                <metric.icon size={18} className={colors.iconText} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">{metric.label}</p>
                <p className="text-xl font-bold text-white tabular-nums">
                  <AnimatedValue value={val} suffix={metric.suffix} />
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className={cn("inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-bold rounded-full border", colors.trend)}>
                  {val > 0 ? <ArrowUpRight size={9} /> : <ArrowDownRight size={9} />}
                  {metric.key === "conversionRate" ? `${val}%` : val > 0 ? "Active" : "None"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
