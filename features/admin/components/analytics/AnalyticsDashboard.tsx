"use client";

import { useEffect, useState, useCallback } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Users, Eye, MousePointerClick, Globe, Monitor, Smartphone,
  Tablet, BarChart3, Github, Download, Mail, Heart, Activity,
  ArrowUpRight, Radio, ExternalLink, RefreshCw, AlertTriangle,
  FolderOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────────

interface AnalyticsData {
  period: string;
  overview: {
    visitors: number;
    sessions: number;
    pageViews: number;
    projectViews: number;
    resumeDownloads: number;
    contactSubmissions: number;
    githubClicks: number;
    conversionRate: number;
  };
  realtime: {
    liveVisitors: number;
    activePages: Array<{ page: string; visitors: number }>;
  };
  devices: Array<{ name: string; count: number; percentage: number }>;
  browsers: Array<{ name: string; count: number; percentage: number }>;
  countries: Array<{ name: string; code: string; count: number; percentage: number }>;
  referralSources: Array<{ source: string; count: number; percentage: number }>;
  topProjects: Array<{ title: string; category: string; views: number; likes: number }>;
  weekly: Array<{ day: string; visitors: number }>;
  hourly: Array<{ hour: string; visitors: number }>;
}

const COLORS = ["#22d3ee", "#a78bfa", "#34d399", "#f97316", "#ec4899", "#f59e0b", "#3b82f6", "#ef4444"];

// ─── Animated Counter ───────────────────────────────────────────

function AnimatedCounter({ value, prefix = "", suffix = "", decimals = 0 }: {
  value: number; prefix?: string; suffix?: string; decimals?: number;
}) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Number((eased * value).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value, decimals]);

  return (
    <span>
      {prefix}{displayed.toLocaleString()}{suffix && <span className="text-sm text-gray-500 font-medium ml-1">{suffix}</span>}
    </span>
  );
}

// ─── Metric Card ────────────────────────────────────────────────

function MetricCard({ label, value, icon: Icon, color, prefix, suffix, decimals }: {
  label: string; value: number; icon: typeof Users; color: string;
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

// ─── Chart Tooltip ──────────────────────────────────────────────

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl px-4 py-3 shadow-2xl shadow-black/50">
      <p className="text-xs font-semibold text-gray-400 mb-2">{label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-400 font-medium capitalize">{entry.name}:</span>
          <span className="text-white font-bold tabular-nums">{entry.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Live Pulse ─────────────────────────────────────────────────

function LivePulse({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
      <div className="relative">
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
        <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
      </div>
      <span className="text-xs font-bold text-emerald-400">{count} live</span>
    </div>
  );
}

// ─── Device Icon ────────────────────────────────────────────────

function DeviceIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();
  if (lower.includes("desktop") || lower.includes("pc")) return <Monitor size={14} className="text-cyan-400" />;
  if (lower.includes("mobile") || lower.includes("phone")) return <Smartphone size={14} className="text-purple-400" />;
  return <Tablet size={14} className="text-amber-400" />;
}

// ─── Empty State ────────────────────────────────────────────────

function EmptyState({ message = "No data yet" }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-3">
        <FolderOpen size={20} className="text-gray-600" />
      </div>
      <p className="text-xs text-gray-500 font-medium">{message}</p>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/analytics?period=${period}`);
      if (!res.ok) throw new Error("Failed to fetch analytics");
      const d = await res.json();
      setData(d);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ── Error State ──
  if (error && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
          <AlertTriangle size={24} className="text-red-400" />
        </div>
        <h2 className="text-lg font-bold text-white mb-2">Failed to load analytics</h2>
        <p className="text-sm text-gray-500 mb-6 max-w-sm">{error}</p>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
        >
          <RefreshCw size={14} /> Try again
        </button>
      </div>
    );
  }

  // ── Loading State ──
  if (loading && !data) {
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 h-[350px] rounded-2xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
          <div className="lg:col-span-4 h-[350px] rounded-2xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { overview, realtime, devices, browsers, countries, referralSources, topProjects, weekly, hourly } = data;

  const hasAnyData = overview.visitors > 0 || overview.pageViews > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-white tracking-tight">Analytics</h1>
            <LivePulse count={realtime.liveVisitors} />
          </div>
          <p className="text-sm text-gray-500 font-medium">
            {hasAnyData ? `Real data for the last ${period === "7d" ? "7 days" : period === "30d" ? "30 days" : "90 days"}` : "No analytics data collected yet"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
            {(["7d", "30d", "90d"] as const).map((p) => (
              <button key={p} onClick={() => setPeriod(p)} className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                period === p ? "bg-cyan-500 text-white" : "text-gray-500 hover:text-gray-300",
              )}>
                {p === "7d" ? "7 days" : p === "30d" ? "30 days" : "90 days"}
              </button>
            ))}
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* ── OVERVIEW METRIC CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard label="Visitors" value={overview.visitors} icon={Users} color="#22d3ee" />
        <MetricCard label="Sessions" value={overview.sessions} icon={Activity} color="#a78bfa" />
        <MetricCard label="Page Views" value={overview.pageViews} icon={Eye} color="#34d399" />
        <MetricCard label="Project Views" value={overview.projectViews} icon={BarChart3} color="#f97316" />
        <MetricCard label="Resume Downloads" value={overview.resumeDownloads} icon={Download} color="#ec4899" />
        <MetricCard label="Contact Submissions" value={overview.contactSubmissions} icon={Mail} color="#f59e0b" />
      </div>

      {/* ── WEEKLY TRAFFIC + REFERRAL SOURCES ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Weekly traffic chart */}
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

        {/* Referral sources */}
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
                        {referralSources.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip content={({ active, payload }) => {
                        if (!active || !payload?.[0]) return null;
                        const d = payload[0].payload;
                        return (
                          <div className="rounded-xl border border-white/10 bg-[#0a0a0f]/95 px-3 py-2 shadow-2xl">
                            <div className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[referralSources.indexOf(d) % COLORS.length] }} />
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
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
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

      {/* ── HOURLY ACTIVITY + DEVICES ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Hourly visitors */}
        <div className="lg:col-span-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-6">
            <Activity size={16} className="text-amber-400" /> Activity by Hour
          </h3>
          {hourly.some((h) => h.visitors > 0) ? (
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

        {/* Device breakdown */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
              <Monitor size={16} className="text-cyan-400" /> Devices
            </h3>
            {devices.length > 0 ? (
              <div className="space-y-3">
                {devices.map((device, i) => (
                  <div key={device.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <DeviceIcon name={device.name} />
                        <span className="text-xs font-semibold text-gray-300">{device.name}</span>
                      </div>
                      <span className="text-xs font-bold text-white tabular-nums">{device.percentage}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${device.percentage}%`, backgroundColor: COLORS[i % COLORS.length] }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState message="No device data yet" />
            )}
          </div>

          {/* Live Activity */}
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

      {/* ── COUNTRIES + BROWSERS + TOP PROJECTS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Top countries */}
        <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Globe size={16} className="text-emerald-400" /> Top Countries
            </h3>
          </div>
          {countries.length > 0 ? (
            <div className="divide-y divide-white/[0.04]">
              {countries.map((country, i) => (
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

        {/* Browsers */}
        <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
            <Globe size={16} className="text-blue-400" /> Browsers
          </h3>
          {browsers.length > 0 ? (
            <div className="space-y-3">
              {browsers.map((browser, i) => (
                <div key={browser.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-gray-300">{browser.name}</span>
                    <span className="text-xs font-bold text-white tabular-nums">{browser.percentage}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${browser.percentage}%`, backgroundColor: COLORS[i % COLORS.length] }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No browser data yet" />
          )}
        </div>

        {/* Top projects */}
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

      {/* ── ENGAGEMENT SUMMARY ── */}
      {hasAnyData && (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Engagement Summary</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "GitHub Clicks", value: overview.githubClicks, icon: Github, color: "text-gray-300" },
              { label: "Resume Downloads", value: overview.resumeDownloads, icon: Download, color: "text-cyan-400" },
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

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode.toUpperCase().split("").map((char) => 0x1f1a5 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
