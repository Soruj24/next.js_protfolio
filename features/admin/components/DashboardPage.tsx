"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  FolderKanban,
  Code2,
  Mail,
  ShieldCheck,
  Gauge,
  Search,
  Accessibility,
  Activity,
  BarChart3,
  Eye,
  Users,
  MousePointerClick,
  Clock,
  TrendingUp,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Rocket,
  CheckCircle2,
  XCircle,
  Palette,
  Shield,
  Code,
  Database,
  FileText,
} from "lucide-react";
import dynamic from "next/dynamic";
import type { DashboardData } from "@/lib/services/dashboard";
import StatCard from "./command-center/StatCard";
import RecentInquiries from "@/features/admin/components/RecentInquiries";
import { cn } from "@/lib/utils";

// ── Skeletons ──────────────────────────────────────────────────

function SectionSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse ${className}`}>
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5" />
          <div className="h-4 w-32 bg-white/5 rounded-lg" />
        </div>
        <div className="space-y-3">
          <div className="h-3 w-full bg-white/[0.03] rounded-lg" />
          <div className="h-3 w-3/4 bg-white/[0.03] rounded-lg" />
          <div className="h-3 w-1/2 bg-white/[0.03] rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-white/5" />
        <div className="h-4 w-32 bg-white/5 rounded-lg" />
      </div>
      <div className="h-[240px] bg-white/[0.02] rounded-xl" />
    </div>
  );
}

function WidgetSkeleton() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse">
      <div className="px-6 py-5 border-b border-white/[0.06] flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white/5" />
        <div className="h-4 w-32 bg-white/5 rounded-lg" />
      </div>
      <div className="p-6 space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-32 bg-white/5 rounded-lg" />
              <div className="h-2.5 w-48 bg-white/[0.03] rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Dynamic imports ────────────────────────────────────────────

const InteractiveCharts = dynamic(
  () => import("./command-center/InteractiveCharts"),
  { ssr: false, loading: () => <ChartSkeleton /> },
);
const ActivityFeed = dynamic(
  () => import("./command-center/ActivityFeed"),
  { ssr: false, loading: () => <WidgetSkeleton /> },
);
const QuickActions = dynamic(
  () => import("./command-center/QuickActions"),
  { ssr: false, loading: () => <WidgetSkeleton /> },
);
const SystemStatus = dynamic(
  () => import("./command-center/SystemStatus"),
  { ssr: false, loading: () => <WidgetSkeleton /> },
);
const GitHubActivity = dynamic(
  () => import("./command-center/GitHubActivity"),
  { ssr: false, loading: () => <SectionSkeleton /> },
);
const RecentCommits = dynamic(
  () => import("./command-center/RecentCommits"),
  { ssr: false, loading: () => <WidgetSkeleton /> },
);
const PinnedActions = dynamic(
  () => import("./command-center/PinnedActions"),
  { ssr: false, loading: () => <SectionSkeleton /> },
);

// ── MiniSparkline ──────────────────────────────────────────────

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

// ── AnimatedValue ──────────────────────────────────────────────

function AnimatedValue({ value, suffix }: { value: number; suffix?: string }) {
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

// ── AnalyticsOverview (inline) ─────────────────────────────────

const analyticsMetricConfig = [
  { key: "pageViews" as const, label: "Page Views", icon: Eye, color: "cyan", suffix: "" },
  { key: "visitors" as const, label: "Unique Visitors", icon: Users, color: "purple", suffix: "" },
  { key: "sessions" as const, label: "Sessions", icon: MousePointerClick, color: "emerald", suffix: "" },
  { key: "projectViews" as const, label: "Project Views", icon: Eye, color: "amber", suffix: "" },
  { key: "resumeDownloads" as const, label: "Resume Downloads", icon: TrendingUp, color: "rose", suffix: "" },
  { key: "conversionRate" as const, label: "Conversion Rate", icon: Globe, color: "blue", suffix: "%" },
];

const analyticsColorMap: Record<string, { iconBg: string; iconText: string; trend: string; bar: string }> = {
  cyan: { iconBg: "bg-cyan-400/10", iconText: "text-cyan-400", trend: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20", bar: "bg-cyan-400" },
  purple: { iconBg: "bg-purple-400/10", iconText: "text-purple-400", trend: "text-purple-400 bg-purple-400/10 border-purple-400/20", bar: "bg-purple-400" },
  emerald: { iconBg: "bg-emerald-400/10", iconText: "text-emerald-400", trend: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", bar: "bg-emerald-400" },
  amber: { iconBg: "bg-amber-400/10", iconText: "text-amber-400", trend: "text-amber-400 bg-amber-400/10 border-amber-400/20", bar: "bg-amber-400" },
  rose: { iconBg: "bg-rose-400/10", iconText: "text-rose-400", trend: "text-rose-400 bg-rose-400/10 border-rose-400/20", bar: "bg-rose-400" },
  blue: { iconBg: "bg-blue-400/10", iconText: "text-blue-400", trend: "text-blue-400 bg-blue-400/10 border-blue-400/20", bar: "bg-blue-400" },
};

function AnalyticsOverviewInline({ analytics }: { analytics: DashboardData["analytics"] }) {
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
                <div className={cn(
                  "inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-bold rounded-full border",
                  colors.trend,
                )}>
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

// ── ScoreCards (inline, computed from data) ────────────────────

const scoreConfigs = [
  { key: "accessibility" as const, label: "Accessibility", icon: Accessibility, color: "purple" as const, description: "WCAG 2.1 compliance" },
  { key: "bestPractices" as const, label: "Performance", icon: Gauge, color: "cyan" as const, description: "Core Web Vitals optimized" },
  { key: "seo" as const, label: "SEO", icon: Search, color: "emerald" as const, description: "Meta tags & structured data" },
];

const scoreColorMap: Record<string, { stroke: string; text: string; bg: string; ring: string }> = {
  cyan: { stroke: "#22d3ee", text: "text-cyan-400", bg: "bg-cyan-400/10", ring: "stroke-cyan-400/20" },
  purple: { stroke: "#a78bfa", text: "text-purple-400", bg: "bg-purple-400/10", ring: "stroke-purple-400/20" },
  emerald: { stroke: "#34d399", text: "text-emerald-400", bg: "bg-emerald-400/10", ring: "stroke-emerald-400/20" },
};

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
        <circle cx="50" cy="50" r={radius} fill="none" strokeWidth="6" strokeLinecap="round" stroke={color.stroke} strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 0.05s linear" }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn("text-2xl font-bold tabular-nums", color.text)}>{animatedScore}</span>
      </div>
    </div>
  );
}

function ScoreCardsInline({ performance }: { performance: DashboardData["performance"] }) {
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

// ── RecentDeployments (inline, from GitHub data) ───────────────

function RecentDeploymentsInline({ github }: { github: DashboardData["github"] }) {
  const deployStatusMap = {
    success: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10", label: "Ready" },
    building: { icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10", label: "Building" },
    failed: { icon: XCircle, color: "text-red-400", bg: "bg-red-400/10", label: "Failed" },
  };

  const deployments = github.recentCommits.slice(0, 4).map((commit, i) => ({
    id: commit.hash,
    message: commit.message.length > 50 ? commit.message.slice(0, 50) + "..." : commit.message,
    branch: "main",
    commit: commit.hash.slice(0, 7),
    repo: commit.repo,
    timestamp: commit.timestamp,
    status: (i === 0 ? "success" : i === 1 ? "success" : "success") as "success",
  }));

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Rocket size={16} className="text-purple-400" />
          <h3 className="text-sm font-semibold text-white">Recent Deployments</h3>
        </div>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {deployments.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <Rocket size={20} className="text-gray-600 mx-auto mb-2" />
            <p className="text-xs text-gray-500">No recent deployments</p>
          </div>
        ) : (
          deployments.map((deploy) => {
            const cfg = deployStatusMap[deploy.status];
            return (
              <div key={deploy.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors group cursor-pointer">
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", cfg.bg)}>
                  <cfg.icon size={16} className={cfg.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-white truncate">{deploy.message}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                    <code className="text-cyan-400/70 font-mono">{deploy.commit}</code>
                    <span className="text-gray-700">·</span>
                    <span className="text-purple-400/70">{deploy.branch}</span>
                    <span className="text-gray-700">·</span>
                    <span>{deploy.repo}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className={cn("text-[10px] font-bold uppercase tracking-wider mb-0.5", cfg.color)}>{cfg.label}</div>
                  <div className="text-[10px] text-gray-600 font-semibold">{new Date(deploy.timestamp).toLocaleDateString()}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ── RecentUpdates (inline, from activities) ────────────────────

const activityIconMap: Record<string, { icon: typeof Palette; color: string; bg: string }> = {
  contact: { icon: Mail, color: "text-amber-400", bg: "bg-amber-400/10" },
  project: { icon: FolderKanban, color: "text-cyan-400", bg: "bg-cyan-400/10" },
  blog: { icon: FileText, color: "text-blue-400", bg: "bg-blue-400/10" },
  security: { icon: Shield, color: "text-emerald-400", bg: "bg-emerald-400/10" },
  system: { icon: Database, color: "text-purple-400", bg: "bg-purple-400/10" },
  analytics: { icon: BarChart3, color: "text-pink-400", bg: "bg-pink-400/10" },
  github: { icon: Code, color: "text-gray-400", bg: "bg-gray-400/10" },
  deployment: { icon: Rocket, color: "text-orange-400", bg: "bg-orange-400/10" },
  profile: { icon: Users, color: "text-violet-400", bg: "bg-violet-400/10" },
};

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function RecentUpdatesInline({ activities }: { activities: DashboardData["activities"] }) {
  const updates = activities.recentActivities.slice(0, 6);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-blue-400" />
          <h3 className="text-sm font-semibold text-white">Recent Updates</h3>
        </div>
      </div>
      <div className="space-y-0">
        {updates.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <CheckCircle2 size={20} className="text-gray-600 mx-auto mb-2" />
            <p className="text-xs text-gray-500">No recent activity</p>
          </div>
        ) : (
          updates.map((update: any, index: number) => {
            const cfg = activityIconMap[update.type] || activityIconMap.system;
            return (
              <div key={update._id || index} className="relative flex items-start gap-3 px-6 py-4 hover:bg-white/[0.02] transition-colors">
                {index < updates.length - 1 && (
                  <div className="absolute left-[33px] top-[44px] bottom-0 w-px bg-white/[0.04]" />
                )}
                <div className={cn("relative z-10 p-2 rounded-xl shrink-0", cfg.bg)}>
                  <cfg.icon size={14} className={cfg.color} />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-sm font-medium text-white leading-tight">{update.title}</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">{update.description || ""}</p>
                  <p className="text-[10px] text-gray-600 font-semibold mt-1.5 uppercase tracking-wider">{timeAgo(update.createdAt)}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────

export default function DashboardPage({ data }: { data: DashboardData }) {
  const { data: session } = useSession();
  const userName = session?.user?.name?.split(" ")[0] || "Admin";
  const [greeting, setGreeting] = useState("Welcome");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening");
    setCurrentTime(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  return (
    <div className="space-y-6" role="region" aria-label="Dashboard">
      {/* Ambient glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/[0.06] blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-purple-500/[0.04] blur-[140px] rounded-full pointer-events-none" aria-hidden="true" />

      {/* Welcome Section */}
      <div className="relative animate-fade-in-up">
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-status-pulse" aria-hidden="true" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">All Systems Operational</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-1">
            {greeting}, <span className="text-gradient">{userName}</span>
          </h1>
          <p className="text-sm text-gray-500 font-medium max-w-2xl">
            Central command for your technical portfolio. Monitor deployments, manage skill sets, and analyze engagement.
          </p>
          {currentTime && (
            <p className="text-xs text-gray-600 font-semibold mt-2 uppercase tracking-wider">{currentTime}</p>
          )}
        </div>
      </div>

      {/* Stat Cards — all computed from DB */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <StatCard
          title="Total Projects"
          value={data.projects.total}
          icon={FolderKanban}
          color="cyan"
          trend={data.projects.featured > 0 ? `${data.projects.featured} featured` : "None featured"}
          trendUp={data.projects.featured > 0}
          description={`${data.projects.totalViews.toLocaleString()} total views`}
          href="/admin/projects"
        />
        <StatCard
          title="Core Skills"
          value={data.skills.totalSkills}
          icon={Code2}
          color="purple"
          trend={`${data.skills.totalCategories} categories`}
          trendUp={true}
          description={`${data.skills.totalSkills} technical expertise areas`}
          href="/admin/skills"
        />
        <StatCard
          title="Published Blogs"
          value={data.blogs.published}
          icon={FileText}
          color="emerald"
          trend={data.blogs.total > data.blogs.published ? `${data.blogs.total - data.blogs.published} drafts` : "All published"}
          trendUp={data.blogs.published > 0}
          description={`${data.blogs.totalViews.toLocaleString()} total views`}
          href="/admin/blogs"
        />
        <StatCard
          title="Contact Messages"
          value={data.contacts.total}
          icon={Mail}
          color="amber"
          trend={data.contacts.unread > 0 ? `${data.contacts.unread} unread` : "All read"}
          trendUp={data.contacts.unread > 0}
          description={`${data.contacts.total} total inquiries`}
          href="/admin/inquiries"
        />
      </div>

      {/* Analytics Overview — computed from AnalyticsEvent */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <AnalyticsOverviewInline analytics={data.analytics} />
      </div>

      {/* Performance Scores — computed from Project.performance */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-white/5">
            <Gauge size={14} className="text-cyan-400" />
          </div>
          <h2 className="text-sm font-semibold text-white">Performance Scores</h2>
          <div className="flex-1 h-px bg-white/[0.06]" aria-hidden="true" />
        </div>
        <ScoreCardsInline performance={data.performance} />
      </div>

      {/* Charts */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <InteractiveCharts />
      </div>

      {/* Messages + Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
        <div className="lg:col-span-5">
          <RecentInquiries messages={data.contacts.recentMessages} />
        </div>
        <div className="lg:col-span-4">
          <ActivityFeed />
        </div>
        <div className="lg:col-span-3 space-y-4">
          <QuickActions />
          <SystemStatus />
        </div>
      </div>

      {/* Deployments + Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <div className="lg:col-span-6">
          <RecentDeploymentsInline github={data.github} />
        </div>
        <div className="lg:col-span-6">
          <RecentUpdatesInline activities={data.activities} />
        </div>
      </div>

      {/* GitHub Activity */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
        <GitHubActivity />
      </div>

      {/* Recent Commits + GitHub Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
        <div className="lg:col-span-7">
          <RecentUpdatesInline activities={data.activities} />
        </div>
        <div className="lg:col-span-5">
          <RecentCommits />
        </div>
      </div>

      {/* Pinned Actions */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.55s" }}>
        <PinnedActions />
      </div>
    </div>
  );
}
