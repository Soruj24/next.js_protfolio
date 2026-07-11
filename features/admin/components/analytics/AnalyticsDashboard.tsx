"use client";

import { useEffect, useState, useRef } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  Users, Eye, MousePointerClick, Clock, TrendingUp, Globe,
  Monitor, Smartphone, Tablet, BarChart3, Github, Download,
  Mail, Heart, Activity, Zap, ArrowUpRight, ArrowDownRight,
  Radio, FileText, ExternalLink, RefreshCw, Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────────

interface AnalyticsData {
  overview: {
    totalVisitors: number;
    totalPageViews: number;
    avgBounceRate: number;
    avgSessionDuration: number;
    conversionRate: number;
    liveVisitors: number;
  };
  realtime: {
    liveVisitors: number;
    activePages: Array<{ page: string; visitors: number }>;
  };
  traffic: {
    sources: Array<{ name: string; value: number; color: string }>;
    referral: Array<{ source: string; visits: number; percentage: number }>;
  };
  geography: {
    countries: Array<{ name: string; code: string; visitors: number; percentage: number }>;
  };
  devices: {
    types: Array<{ name: string; value: number; color: string }>;
    browsers: Array<{ name: string; value: number; color: string }>;
    os: Array<{ name: string; value: number; color: string }>;
  };
  engagement: {
    githubClicks: number;
    resumeDownloads: number;
    contactSubmissions: number;
    projectViews: number;
    projectLikes: number;
    avgTimeOnPage: number;
    pagesPerSession: number;
  };
  weekly: Array<{ day: string; visitors: number; pageViews: number; bounceRate: number; sessionDuration: number }>;
  monthly: Array<{ month: string; visitors: number; pageViews: number; projects: number; inquiries: number }>;
  hourly: Array<{ hour: string; visitors: number }>;
  topProjects: Array<{ title: string; category: string; views: number; likes: number; featured: boolean }>;
  submissionsByDay: Array<{ date: string; count: number }>;
  projectCount: number;
  skillCount: number;
}

// ─── Animated Counter ───────────────────────────────────────────

function AnimatedCounter({ value, prefix = "", suffix = "", decimals = 0 }: {
  value: number; prefix?: string; suffix?: string; decimals?: number;
}) {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

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
    <span ref={ref}>
      {prefix}{displayed.toLocaleString()}{suffix && <span className="text-sm text-gray-500 font-medium ml-1">{suffix}</span>}
    </span>
  );
}

// ─── Metric Card ────────────────────────────────────────────────

function MetricCard({ label, value, icon: Icon, color, trend, trendUp, prefix, suffix, decimals }: {
  label: string; value: number; icon: typeof Users; color: string;
  trend?: string; trendUp?: boolean; prefix?: string; suffix?: string; decimals?: number;
}) {
  return (
    <div className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-5 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl rounded-full opacity-0 blur-3xl group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(to bottom left, ${color}20, transparent)` }} />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2.5 rounded-xl" style={{ background: `${color}15` }}>
            <Icon size={18} style={{ color }} />
          </div>
          {trend && (
            <div className={cn(
              "flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-bold rounded-full border",
              trendUp ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" : "text-red-400 bg-red-400/10 border-red-400/20",
            )}>
              {trendUp ? <ArrowUpRight size={9} /> : <ArrowDownRight size={9} />}
              {trend}
            </div>
          )}
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
  if (name === "Desktop") return <Monitor size={14} className="text-cyan-400" />;
  if (name === "Mobile") return <Smartphone size={14} className="text-purple-400" />;
  return <Tablet size={14} className="text-amber-400" />;
}

// ─── Main Component ─────────────────────────────────────────────

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [period]);

  if (loading || !data) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between animate-pulse">
          <div className="space-y-2"><div className="h-8 w-48 bg-white/5 rounded-xl" /><div className="h-4 w-72 bg-white/[0.03] rounded-lg" /></div>
          <div className="h-10 w-32 bg-white/5 rounded-xl" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => <div key={i} className="h-32 rounded-2xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 h-[350px] rounded-2xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
          <div className="lg:col-span-4 h-[350px] rounded-2xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-white tracking-tight">Analytics</h1>
            <LivePulse count={data.realtime.liveVisitors} />
          </div>
          <p className="text-sm text-gray-500 font-medium">Real-time portfolio performance metrics</p>
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
          <button onClick={() => { setLoading(true); fetch("/api/analytics").then(r => r.json()).then(d => { setData(d); setLoading(false); }); }}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all" title="Refresh">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* ── OVERVIEW METRICS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard label="Total Visitors" value={data.overview.totalVisitors} icon={Users} color="#22d3ee" trend="+12.5%" trendUp />
        <MetricCard label="Page Views" value={data.overview.totalPageViews} icon={Eye} color="#a78bfa" trend="+8.3%" trendUp />
        <MetricCard label="Bounce Rate" value={data.overview.avgBounceRate} icon={MousePointerClick} color="#f97316" suffix="%" decimals={1} trend="-3.2%" trendUp />
        <MetricCard label="Avg. Session" value={data.overview.avgSessionDuration} icon={Clock} color="#34d399" suffix="s" trend="+5.1%" trendUp />
        <MetricCard label="Conversion" value={data.overview.conversionRate} icon={TrendingUp} color="#ec4899" suffix="%" decimals={1} trend="+0.4%" trendUp />
        <MetricCard label="Live Now" value={data.realtime.liveVisitors} icon={Radio} color="#10b981" />
      </div>

      {/* ── TRAFFIC OVERVIEW CHART + SOURCE PIE ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Weekly traffic chart */}
        <div className="lg:col-span-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <BarChart3 size={16} className="text-cyan-400" /> Traffic Overview
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Visitors & page views this week</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-cyan-400" /><span className="text-[10px] text-gray-500 font-semibold uppercase">Visitors</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-400" /><span className="text-[10px] text-gray-500 font-semibold uppercase">Page Views</span></div>
            </div>
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.weekly}>
                <defs>
                  <linearGradient id="visitorsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="pageViewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }} dx={-8} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="visitors" stroke="#22d3ee" strokeWidth={2} fill="url(#visitorsGrad)" dot={false} activeDot={{ r: 5, strokeWidth: 2, stroke: "#0a0a0f", fill: "#22d3ee" }} />
                <Area type="monotone" dataKey="pageViews" stroke="#a78bfa" strokeWidth={2} fill="url(#pageViewsGrad)" dot={false} activeDot={{ r: 5, strokeWidth: 2, stroke: "#0a0a0f", fill: "#a78bfa" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic sources pie */}
        <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-6">
            <Globe size={16} className="text-purple-400" /> Traffic Sources
          </h3>
          <div className="flex items-center justify-center mb-4">
            <div className="w-[180px] h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.traffic.sources} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value" stroke="none">
                    {data.traffic.sources.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip content={({ active, payload }) => {
                    if (!active || !payload?.[0]) return null;
                    return (
                      <div className="rounded-xl border border-white/10 bg-[#0a0a0f]/95 px-3 py-2 shadow-2xl">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: payload[0].payload.color }} />
                          <span className="text-white font-semibold">{payload[0].name}</span>
                          <span className="text-gray-400">{payload[0].value}%</span>
                        </div>
                      </div>
                    );
                  }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-2">
            {data.traffic.sources.map((source) => (
              <div key={source.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: source.color }} />
                <span className="text-xs text-gray-400 font-medium flex-1">{source.name}</span>
                <span className="text-xs text-white font-bold tabular-nums">{source.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOURLY ACTIVITY + DEVICES ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Hourly visitors */}
        <div className="lg:col-span-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-6">
            <Clock size={16} className="text-amber-400" /> Visitor Activity (24h)
          </h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.hourly}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "rgba(255,255,255,0.25)" }} interval={2} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.25)" }} dx={-8} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="visitors" fill="#22d3ee" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device breakdown */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
              <Monitor size={16} className="text-cyan-400" /> Devices
            </h3>
            <div className="space-y-3">
              {data.devices.types.map((device) => (
                <div key={device.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <DeviceIcon name={device.name} />
                      <span className="text-xs font-semibold text-gray-300">{device.name}</span>
                    </div>
                    <span className="text-xs font-bold text-white tabular-nums">{device.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${device.value}%`, backgroundColor: device.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
              <Activity size={16} className="text-purple-400" /> Live Activity
            </h3>
            <div className="space-y-2">
              {data.realtime.activePages.map((page) => (
                <div key={page.page} className="flex items-center justify-between py-1.5">
                  <span className="text-xs text-gray-400 font-mono truncate flex-1">{page.page}</span>
                  <span className="text-xs font-bold text-white tabular-nums ml-2">{page.visitors}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── COUNTRIES + BROWSERS + ENGAGEMENT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Top countries */}
        <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Globe size={16} className="text-emerald-400" /> Top Countries
            </h3>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {data.geography.countries.map((country, i) => (
              <div key={country.name} className="flex items-center gap-3 px-6 py-3 hover:bg-white/[0.02] transition-colors">
                <span className="text-[10px] font-bold text-gray-600 w-4">{i + 1}</span>
                <span className="text-lg">{country.code ? getFlagEmoji(country.code) : "🌍"}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{country.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full bg-emerald-400 transition-all duration-700" style={{ width: `${country.percentage * 2.5}%` }} />
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium tabular-nums">{country.percentage}%</span>
                  </div>
                </div>
                <span className="text-xs text-gray-400 font-bold tabular-nums">{country.visitors.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Browsers */}
        <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-6">
            <Globe size={16} className="text-blue-400" /> Browsers
          </h3>
          <div className="h-[200px] mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data.devices.browsers}>
                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                <PolarAngleAxis dataKey="name" tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar name="Share" dataKey="value" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {data.devices.browsers.map((b) => (
              <div key={b.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: b.color }} />
                <span className="text-xs text-gray-400 font-medium flex-1">{b.name}</span>
                <span className="text-xs text-white font-bold tabular-nums">{b.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement metrics */}
        <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-5">
            <Zap size={16} className="text-amber-400" /> Engagement
          </h3>
          <div className="space-y-4">
            {[
              { label: "GitHub Clicks", value: data.engagement.githubClicks, icon: Github, color: "text-gray-300" },
              { label: "Resume Downloads", value: data.engagement.resumeDownloads, icon: Download, color: "text-cyan-400" },
              { label: "Contact Submissions", value: data.engagement.contactSubmissions, icon: Mail, color: "text-purple-400" },
              { label: "Project Views", value: data.engagement.projectViews, icon: Eye, color: "text-emerald-400" },
              { label: "Project Likes", value: data.engagement.projectLikes, icon: Heart, color: "text-rose-400" },
              { label: "Pages / Session", value: data.engagement.pagesPerSession, icon: FileText, color: "text-amber-400", decimals: 1 },
              { label: "Avg. Time on Page", value: data.engagement.avgTimeOnPage, icon: Clock, color: "text-blue-400", suffix: "s" },
            ].map((metric) => (
              <div key={metric.label} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5">
                  <metric.icon size={14} className={metric.color} />
                </div>
                <span className="text-xs text-gray-400 font-medium flex-1">{metric.label}</span>
                <span className="text-sm font-bold text-white tabular-nums">
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} decimals={metric.decimals} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TOP PROJECTS + REFERRALS + HEATMAP PLACEHOLDER ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Top projects */}
        <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <TrendingUp size={16} className="text-cyan-400" /> Most Viewed Projects
            </h3>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {data.topProjects.map((project, i) => (
              <div key={project.title} className="flex items-center gap-3 px-6 py-3.5 hover:bg-white/[0.02] transition-colors">
                <span className={cn(
                  "w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold",
                  i === 0 ? "bg-cyan-400/10 text-cyan-400" : i === 1 ? "bg-purple-400/10 text-purple-400" : "bg-white/5 text-gray-500",
                )}>{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-semibold text-white truncate">{project.title}</p>
                    {project.featured && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />}
                  </div>
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
        </div>

        {/* Referral traffic */}
        <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <ExternalLink size={16} className="text-purple-400" /> Referral Traffic
            </h3>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {data.traffic.referral.map((ref) => (
              <div key={ref.source} className="px-6 py-3.5 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-white">{ref.source}</span>
                  <span className="text-xs font-bold text-gray-400 tabular-nums">{ref.visits.toLocaleString()}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-purple-400 transition-all duration-700" style={{ width: `${ref.percentage * 2}%` }} />
                </div>
                <p className="text-[10px] text-gray-600 font-medium mt-1">{ref.percentage}% of total traffic</p>
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap placeholder */}
        <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
            <MousePointerClick size={16} className="text-rose-400" /> Click Heatmap
          </h3>
          <div className="relative aspect-[4/3] rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            {/* Simulated heatmap grid */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-px p-2">
              {Array.from({ length: 48 }).map((_, i) => {
                const intensity = Math.random();
                return (
                  <div
                    key={i}
                    className="rounded-sm transition-all duration-500"
                    style={{
                      backgroundColor: intensity > 0.7 ? `rgba(239,68,68,${intensity * 0.6})` :
                        intensity > 0.4 ? `rgba(251,191,36,${intensity * 0.4})` :
                          `rgba(34,211,238,${intensity * 0.2})`,
                    }}
                  />
                );
              })}
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
              <div className="text-center">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-2">
                  <MousePointerClick size={18} className="text-gray-400" />
                </div>
                <p className="text-xs font-semibold text-white">Heatmap Integration</p>
                <p className="text-[10px] text-gray-500 font-medium mt-0.5">Connect Hotjar or Clarity</p>
              </div>
            </div>
          </div>

          {/* OS Stats */}
          <div className="mt-4">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Operating Systems</p>
            <div className="space-y-2">
              {data.devices.os.map((os) => (
                <div key={os.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: os.color }} />
                  <span className="text-xs text-gray-400 font-medium flex-1">{os.name}</span>
                  <span className="text-xs text-white font-bold tabular-nums">{os.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MONTHLY GROWTH ── */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-400" /> Monthly Growth
            </h3>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Year-to-date performance</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-cyan-400" /><span className="text-[10px] text-gray-500 font-semibold uppercase">Visitors</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-400" /><span className="text-[10px] text-gray-500 font-semibold uppercase">Inquiries</span></div>
          </div>
        </div>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.monthly} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }} dy={8} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }} dx={-8} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="visitors" fill="#22d3ee" radius={[6, 6, 0, 0]} barSize={20} />
              <Bar dataKey="inquiries" fill="#a78bfa" radius={[6, 6, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode.toUpperCase().split("").map((char) => 0x1f1a5 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
