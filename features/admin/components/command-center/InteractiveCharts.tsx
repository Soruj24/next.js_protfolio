"use client";

import { useState, useEffect, useCallback } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  TrendingUp, BarChart3, GitCommit, Rocket, FolderKanban,
  Code2, ExternalLink, Users, RefreshCw, Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────

interface ChartsData {
  visitorsOverTime: { date: string; visitors: number; pageViews: number; projectViews: number }[];
  messagesOverTime: { date: string; count: number }[];
  commitsPerWeek: { week: string; count: number }[];
  deployments: { id: string; message: string; repo: string; timestamp: string; url: string }[];
  repositories: { name: string; stars: number; forks: number; language: string | null; url: string }[];
  projectCategories: { name: string; count: number }[];
  techUsage: { name: string; count: number }[];
  contactSources: { source: string; count: number; percentage: number }[];
  deviceBreakdown: { name: string; count: number; percentage: number }[];
  browserBreakdown: { name: string; count: number; percentage: number }[];
  countryBreakdown: { name: string; count: number; percentage: number }[];
  hourlyActivity: { hour: number; count: number }[];
}

const COLORS = ["#22d3ee", "#a78bfa", "#34d399", "#f97316", "#ec4899", "#f59e0b", "#3b82f6", "#ef4444", "#8b5cf6", "#06b6d4"];

// ── Shared ─────────────────────────────────────────────────────

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

function ChartCard({ title, subtitle, icon: Icon, iconColor, children, className }: {
  title: string; subtitle?: string; icon: typeof TrendingUp; iconColor: string;
  children: React.ReactNode; className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6 overflow-hidden", className)}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Icon size={16} className={iconColor} />
            <h3 className="text-sm font-semibold text-white">{title}</h3>
          </div>
          {subtitle && <p className="text-xs text-gray-500 font-medium">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="h-[200px] flex items-center justify-center">
      <p className="text-xs text-gray-500">{message}</p>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="h-[240px] flex items-center justify-center">
      <Loader2 size={20} className="text-gray-600 animate-spin" />
    </div>
  );
}

// ── Chart: Visitors Over Time ──────────────────────────────────

function VisitorsOverTimeChart({ data }: { data: ChartsData["visitorsOverTime"] }) {
  if (!data.length) return <EmptyState message="No visitor data yet" />;
  return (
    <ChartCard title="Visitors Over Time" subtitle="Unique visitors & page views (30 days)" icon={Users} iconColor="text-cyan-400">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Visitors</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Page Views</span>
        </div>
      </div>
      <div className="h-[240px] -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="visitorsGradDash" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="pageViewsGradDash" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.3)" }} dy={8} tickFormatter={(v) => v.slice(5)} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.3)" }} dx={-8} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="visitors" stroke="#22d3ee" strokeWidth={2} fill="url(#visitorsGradDash)" dot={false} activeDot={{ r: 4, strokeWidth: 2, stroke: "#0a0a0f", fill: "#22d3ee" }} />
            <Area type="monotone" dataKey="pageViews" stroke="#a78bfa" strokeWidth={2} fill="url(#pageViewsGradDash)" dot={false} activeDot={{ r: 4, strokeWidth: 2, stroke: "#0a0a0f", fill: "#a78bfa" }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

// ── Chart: Messages Over Time ──────────────────────────────────

function MessagesOverTimeChart({ data }: { data: ChartsData["messagesOverTime"] }) {
  if (!data.length) return <EmptyState message="No message data yet" />;
  return (
    <ChartCard title="Messages Over Time" subtitle="Contact form submissions (30 days)" icon={BarChart3} iconColor="text-purple-400">
      <div className="h-[240px] -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.3)" }} dy={8} tickFormatter={(v) => v.slice(5)} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.3)" }} dx={-8} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="count" name="Messages" fill="#a78bfa" radius={[4, 4, 0, 0]} barSize={12} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

// ── Chart: Commits Per Week ────────────────────────────────────

function CommitsPerWeekChart({ data }: { data: ChartsData["commitsPerWeek"] }) {
  if (!data.length) return <EmptyState message="No commit data yet" />;
  return (
    <ChartCard title="Commits Per Week" subtitle="GitHub commit activity" icon={GitCommit} iconColor="text-emerald-400">
      <div className="h-[240px] -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.3)" }} dy={8} tickFormatter={(v) => v.slice(5)} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.3)" }} dx={-8} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="count" name="Commits" fill="#34d399" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

// ── Chart: Project Categories ──────────────────────────────────

function ProjectCategoriesChart({ data }: { data: ChartsData["projectCategories"] }) {
  if (!data.length) return <EmptyState message="No projects yet" />;
  return (
    <ChartCard title="Project Categories" subtitle="Distribution by category" icon={FolderKanban} iconColor="text-amber-400">
      <div className="flex items-center justify-center mb-4">
        <div className="w-[180px] h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="count" stroke="none">
                {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip content={({ active, payload }) => {
                if (!active || !payload?.[0]) return null;
                const d = payload[0].payload;
                return (
                  <div className="rounded-xl border border-white/10 bg-[#0a0a0f]/95 px-3 py-2 shadow-2xl">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[data.indexOf(d) % COLORS.length] }} />
                      <span className="text-white font-semibold">{d.name}</span>
                      <span className="text-gray-400">{d.count}</span>
                    </div>
                  </div>
                );
              }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {data.map((cat, i) => (
          <div key={cat.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
            <span className="text-xs text-gray-400 font-medium flex-1 truncate">{cat.name}</span>
            <span className="text-xs text-white font-bold tabular-nums">{cat.count}</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

// ── Chart: Tech Usage ──────────────────────────────────────────

function TechUsageChart({ data }: { data: ChartsData["techUsage"] }) {
  if (!data.length) return <EmptyState message="No tech data yet" />;
  const maxCount = Math.max(...data.map((t) => t.count));
  return (
    <ChartCard title="Tech Usage" subtitle="Most used technologies across projects" icon={Code2} iconColor="text-cyan-400">
      <div className="space-y-3">
        {data.slice(0, 10).map((tech, i) => (
          <div key={tech.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-gray-300">{tech.name}</span>
              <span className="text-xs font-bold text-white tabular-nums">{tech.count}</span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${maxCount > 0 ? (tech.count / maxCount) * 100 : 0}%`, backgroundColor: COLORS[i % COLORS.length] }}
              />
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

// ── Chart: Contact Sources ─────────────────────────────────────

function ContactSourcesChart({ data }: { data: ChartsData["contactSources"] }) {
  if (!data.length) return <EmptyState message="No referral data yet" />;
  return (
    <ChartCard title="Contact Sources" subtitle="Where visitors come from" icon={ExternalLink} iconColor="text-rose-400">
      <div className="flex items-center justify-center mb-4">
        <div className="w-[160px] h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="count" stroke="none">
                {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip content={({ active, payload }) => {
                if (!active || !payload?.[0]) return null;
                const d = payload[0].payload;
                return (
                  <div className="rounded-xl border border-white/10 bg-[#0a0a0f]/95 px-3 py-2 shadow-2xl">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[data.indexOf(d) % COLORS.length] }} />
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
        {data.map((src, i) => (
          <div key={src.source} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
            <span className="text-xs text-gray-400 font-medium flex-1 truncate">{src.source}</span>
            <span className="text-xs text-white font-bold tabular-nums">{src.count}</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

// ── Chart: Repositories ────────────────────────────────────────

function RepositoriesChart({ data }: { data: ChartsData["repositories"] }) {
  if (!data.length) return <EmptyState message="No repositories yet" />;
  const maxStars = Math.max(...data.map((r) => r.stars));
  return (
    <ChartCard title="Repositories" subtitle="GitHub repositories by stars" icon={FolderKanban} iconColor="text-purple-400">
      <div className="space-y-3">
        {data.slice(0, 8).map((repo, i) => (
          <div key={repo.name}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white">{repo.name}</span>
                {repo.language && (
                  <span className="text-[10px] text-gray-500 font-medium px-1.5 py-0.5 rounded bg-white/5">{repo.language}</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 font-medium tabular-nums">
                <span>★ {repo.stars}</span>
                <span>⑂ {repo.forks}</span>
              </div>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${maxStars > 0 ? (repo.stars / maxStars) * 100 : 0}%`, backgroundColor: COLORS[i % COLORS.length] }}
              />
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

// ── Chart: Deployments ─────────────────────────────────────────

function DeploymentsChart({ data }: { data: ChartsData["deployments"] }) {
  if (!data.length) return <EmptyState message="No deployments yet" />;
  return (
    <ChartCard title="Recent Deployments" subtitle="Latest GitHub commits" icon={Rocket} iconColor="text-orange-400">
      <div className="space-y-2">
        {data.slice(0, 6).map((deploy) => (
          <div key={deploy.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.03] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-emerald-400/10 flex items-center justify-center shrink-0">
              <Rocket size={14} className="text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{deploy.message}</p>
              <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium mt-0.5">
                <code className="text-cyan-400/70 font-mono">{deploy.id.slice(0, 7)}</code>
                <span className="text-gray-700">·</span>
                <span>{deploy.repo}</span>
                <span className="text-gray-700">·</span>
                <span>{new Date(deploy.timestamp).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

// ── Main Component ─────────────────────────────────────────────

export default function InteractiveCharts() {
  const [data, setData] = useState<ChartsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/dashboard/charts", { cache: "no-store" });
      if (res.ok) {
        const d = await res.json();
        setData(d);
        setLastRefresh(new Date());
      }
    } catch {
      // keep existing data
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"><Skeleton /></div>
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-12 text-center">
        <p className="text-sm text-gray-500">No chart data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Refresh indicator */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-wider">
          Auto-refreshes every 60s · Last: {lastRefresh.toLocaleTimeString()}
        </p>
        <button onClick={fetchData} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors" title="Refresh now">
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Row 1: Visitors + Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VisitorsOverTimeChart data={data.visitorsOverTime} />
        <MessagesOverTimeChart data={data.messagesOverTime} />
      </div>

      {/* Row 2: Commits + Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CommitsPerWeekChart data={data.commitsPerWeek} />
        <ProjectCategoriesChart data={data.projectCategories} />
      </div>

      {/* Row 3: Tech Usage + Contact Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TechUsageChart data={data.techUsage} />
        <ContactSourcesChart data={data.contactSources} />
      </div>

      {/* Row 4: Repositories + Deployments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RepositoriesChart data={data.repositories} />
        <DeploymentsChart data={data.deployments} />
      </div>
    </div>
  );
}

export { VisitorsOverTimeChart, MessagesOverTimeChart, CommitsPerWeekChart, ProjectCategoriesChart, TechUsageChart, ContactSourcesChart, RepositoriesChart, DeploymentsChart };
