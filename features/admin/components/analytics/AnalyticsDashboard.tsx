"use client";

import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Users, Eye, Globe, Monitor,
  BarChart3, Github, Mail, Heart, Activity,
  ArrowUpRight, Radio, ExternalLink, RefreshCw, AlertTriangle,
  Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAnalytics } from "@/features/admin/hooks/useAnalytics";
import { ANALYTICS_COLORS, getFlagEmoji, PERIOD_OPTIONS } from "@/features/admin/lib/analytics";
import AnalyticsMetricCard from "@/features/admin/components/analytics/AnalyticsMetricCard";
import ChartTooltip from "@/features/admin/components/analytics/ChartTooltip";
import LivePulse from "@/features/admin/components/analytics/LivePulse";
import DeviceIcon from "@/features/admin/components/analytics/DeviceIcon";
import EmptyState from "@/features/admin/components/analytics/EmptyState";
import AnimatedCounter from "@/features/admin/components/analytics/AnimatedCounter";

export default function AnalyticsDashboard() {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");
  const { analytics, charts, loading, error, lastRefresh, refetch } = useAnalytics(period);

  if (error && !analytics) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
          <AlertTriangle size={24} className="text-red-400" />
        </div>
        <h2 className="text-lg font-bold text-white mb-2">Failed to load analytics</h2>
        <p className="text-sm text-gray-500 mb-6 max-w-sm">{error}</p>
        <button onClick={refetch} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm font-medium">
          <RefreshCw size={14} /> Try again
        </button>
      </div>
    );
  }

  if (loading && !analytics) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between animate-pulse">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-white/5 rounded-xl" />
            <div className="h-4 w-72 bg-white/[0.03] rounded-lg" />
          </div>
          <div className="h-10 w-32 bg-white/5 rounded-xl" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-[350px] rounded-2xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  const { overview, realtime, devices, browsers, countries, referralSources, topProjects, weekly, hourly } = analytics;
  const hasAnyData = overview.visitors > 0 || overview.pageViews > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-white tracking-tight">Analytics</h1>
            <LivePulse count={realtime.liveVisitors} />
          </div>
          <p className="text-sm text-gray-500 font-medium">
            {hasAnyData ? `Real data for the last ${period === "7d" ? "7 days" : period === "30d" ? "30 days" : "90 days"}` : "No analytics data collected yet"}
            <span className="text-gray-600 ml-2">· Refreshes every 60s · {lastRefresh.toLocaleTimeString()}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
            {PERIOD_OPTIONS.map((p) => (
              <button key={p} onClick={() => setPeriod(p)} className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                period === p ? "bg-cyan-500 text-white" : "text-gray-500 hover:text-gray-300",
              )}>
                {p === "7d" ? "7 days" : p === "30d" ? "30 days" : "90 days"}
              </button>
            ))}
          </div>
          <button onClick={refetch} disabled={loading} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50" title="Refresh">
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <AnalyticsMetricCard label="Visitors" value={overview.visitors} icon={Users} color="#22d3ee" />
        <AnalyticsMetricCard label="Sessions" value={overview.sessions} icon={Activity} color="#a78bfa" />
        <AnalyticsMetricCard label="Page Views" value={overview.pageViews} icon={Eye} color="#34d399" />
        <AnalyticsMetricCard label="Project Views" value={overview.projectViews} icon={BarChart3} color="#f97316" />
        <AnalyticsMetricCard label="Contact Submissions" value={overview.contactSubmissions} icon={Mail} color="#f59e0b" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <BarChart3 size={16} className="text-cyan-400" /> Weekly Traffic
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Page views by day of week</p>
            </div>
          </div>
          {weekly.some((d) => d.visitors > 0) ? (
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weekly}>
                  <defs>
                    <linearGradient id="visitorsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }} dy={8} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }} dx={-8} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="visitors" name="Page Views" stroke="#22d3ee" strokeWidth={2} fill="url(#visitorsGrad)" dot={false} activeDot={{ r: 5, strokeWidth: 2, stroke: "#0a0a0f", fill: "#22d3ee" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyState message="No page views this week" />
          )}
        </div>

        <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-6">
            <ExternalLink size={16} className="text-purple-400" /> Referral Sources
          </h3>
          {referralSources.length > 0 ? (
            <>
              <div className="flex items-center justify-center mb-4">
                <div className="w-[160px] h-[160px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={referralSources} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="count" stroke="none">
                        {referralSources.map((_, i) => <Cell key={i} fill={ANALYTICS_COLORS[i % ANALYTICS_COLORS.length]} />)}
                      </Pie>
                      <Tooltip content={({ active, payload }) => {
                        if (!active || !payload?.[0]) return null;
                        const d = payload[0].payload;
                        return (
                          <div className="rounded-xl border border-white/10 bg-[#0a0a0f]/95 px-3 py-2 shadow-2xl">
                            <div className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ANALYTICS_COLORS[referralSources.indexOf(d) % ANALYTICS_COLORS.length] }} />
                              <span className="text-white font-semibold">{d.source}</span>
                              <span className="text-gray-400">{d.count}</span>
                            </div>
                          </div>
                        );
                      }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="space-y-2">
                {referralSources.map((src, i) => (
                  <div key={src.source} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: ANALYTICS_COLORS[i % ANALYTICS_COLORS.length] }} />
                    <span className="text-xs text-gray-400 font-medium flex-1 truncate">{src.source}</span>
                    <span className="text-xs text-white font-bold tabular-nums">{src.count}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <EmptyState message="No referral data yet" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-6">
            <Activity size={16} className="text-amber-400" /> Activity by Hour
          </h3>
          {charts?.hourlyActivity?.some((h) => h.count > 0) ? (
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts.hourlyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "rgba(255,255,255,0.25)" }} interval={2} dy={8} tickFormatter={(h) => `${h}:00`} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.25)" }} dx={-8} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="count" name="Events" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : hourly.some((h) => h.visitors > 0) ? (
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "rgba(255,255,255,0.25)" }} interval={2} dy={8} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.25)" }} dx={-8} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="visitors" name="Events" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyState message="No hourly data yet" />
          )}
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
              <Monitor size={16} className="text-cyan-400" /> Devices
            </h3>
            {(charts?.deviceBreakdown?.length ? charts.deviceBreakdown : devices).length > 0 ? (
              <div className="space-y-3">
                {(charts?.deviceBreakdown?.length ? charts.deviceBreakdown : devices).map((device, i) => (
                  <div key={device.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <DeviceIcon name={device.name} />
                        <span className="text-xs font-semibold text-gray-300">{device.name}</span>
                      </div>
                      <span className="text-xs font-bold text-white tabular-nums">{device.percentage}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${device.percentage}%`, backgroundColor: ANALYTICS_COLORS[i % ANALYTICS_COLORS.length] }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState message="No device data yet" />
            )}
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
              <Radio size={16} className="text-emerald-400" /> Live Activity
            </h3>
            {realtime.activePages.length > 0 ? (
              <div className="space-y-2">
                {realtime.activePages.map((page) => (
                  <div key={page.page} className="flex items-center justify-between py-1.5">
                    <span className="text-xs text-gray-400 font-mono truncate flex-1">{page.page}</span>
                    <span className="text-xs font-bold text-white tabular-nums ml-2">{page.visitors}</span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState message="No active visitors right now" />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Globe size={16} className="text-emerald-400" /> Top Countries
            </h3>
          </div>
          {(charts?.countryBreakdown?.length ? charts.countryBreakdown : countries).length > 0 ? (
            <div className="divide-y divide-white/[0.04]">
              {(charts?.countryBreakdown?.length ? charts.countryBreakdown : countries).map((country: any, i: number) => (
                <div key={country.name} className="flex items-center gap-3 px-6 py-3 hover:bg-white/[0.02] transition-colors">
                  <span className="text-[10px] font-bold text-gray-600 w-4">{i + 1}</span>
                  <span className="text-lg">{country.code ? getFlagEmoji(country.code) : "🌍"}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{country.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full rounded-full bg-emerald-400 transition-all duration-700" style={{ width: `${country.percentage}%` }} />
                      </div>
                      <span className="text-[10px] text-gray-500 font-medium tabular-nums">{country.percentage}%</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 font-bold tabular-nums">{country.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No country data yet" />
          )}
        </div>

        <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
            <Globe size={16} className="text-blue-400" /> Browsers
          </h3>
          {(charts?.browserBreakdown?.length ? charts.browserBreakdown : browsers).length > 0 ? (
            <div className="space-y-3">
              {(charts?.browserBreakdown?.length ? charts.browserBreakdown : browsers).map((browser, i) => (
                <div key={browser.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-gray-300">{browser.name}</span>
                    <span className="text-xs font-bold text-white tabular-nums">{browser.percentage}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${browser.percentage}%`, backgroundColor: ANALYTICS_COLORS[i % ANALYTICS_COLORS.length] }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No browser data yet" />
          )}
        </div>

        <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <ArrowUpRight size={16} className="text-cyan-400" /> Most Viewed Projects
            </h3>
          </div>
          {topProjects.length > 0 ? (
            <div className="divide-y divide-white/[0.04]">
              {topProjects.map((project, i) => (
                <div key={project.title} className="flex items-center gap-3 px-6 py-3.5 hover:bg-white/[0.02] transition-colors">
                  <span className={cn(
                    "w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold",
                    i === 0 ? "bg-cyan-400/10 text-cyan-400" : i === 1 ? "bg-purple-400/10 text-purple-400" : "bg-white/5 text-gray-500",
                  )}>{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{project.title}</p>
                    <p className="text-[10px] text-gray-600 font-medium mt-0.5">{project.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-white tabular-nums">{project.views.toLocaleString()}</p>
                    <p className="text-[10px] text-gray-600 font-medium flex items-center gap-0.5 justify-end">
                      <Heart size={8} className="text-rose-400" /> {project.likes}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No project data yet" />
          )}
        </div>
      </div>

      {charts && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {charts.techUsage.length > 0 && (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-6">
                <Code2 size={16} className="text-cyan-400" /> Tech Usage
              </h3>
              <div className="space-y-3">
                {charts.techUsage.slice(0, 10).map((tech, i) => {
                  const maxCount = Math.max(...charts.techUsage.map((t) => t.count));
                  return (
                    <div key={tech.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-semibold text-gray-300">{tech.name}</span>
                        <span className="text-xs font-bold text-white tabular-nums">{tech.count}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${maxCount > 0 ? (tech.count / maxCount) * 100 : 0}%`, backgroundColor: ANALYTICS_COLORS[i % ANALYTICS_COLORS.length] }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {charts.contactSources.length > 0 && (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-6">
                <ExternalLink size={16} className="text-rose-400" /> Contact Sources
              </h3>
              <div className="space-y-2">
                {charts.contactSources.map((src, i) => (
                  <div key={src.source} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: ANALYTICS_COLORS[i % ANALYTICS_COLORS.length] }} />
                    <span className="text-xs text-gray-400 font-medium flex-1 truncate">{src.source}</span>
                    <span className="text-xs text-white font-bold tabular-nums">{src.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {hasAnyData && (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Engagement Summary</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "GitHub Clicks", value: overview.githubClicks, icon: Github, color: "text-gray-300" },
              { label: "Contact Submissions", value: overview.contactSubmissions, icon: Mail, color: "text-purple-400" },
              { label: "Conversion Rate", value: overview.conversionRate, icon: Heart, color: "text-rose-400", suffix: "%", decimals: 1 },
            ].map((metric) => (
              <div key={metric.label} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5">
                  <metric.icon size={14} className={metric.color} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{metric.label}</p>
                  <p className="text-sm font-bold text-white tabular-nums">
                    <AnimatedCounter value={metric.value} suffix={metric.suffix} decimals={metric.decimals} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
