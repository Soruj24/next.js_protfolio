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
  TrendingUp,
  BarChart3,
  Activity,
} from "lucide-react";
import dynamic from "next/dynamic";
import type { DashboardData } from "@/lib/services/dashboard";
import StatCard from "./command-center/StatCard";
import RecentInquiries from "@/features/admin/components/RecentInquiries";

const AnalyticsOverview = dynamic(
  () => import("./command-center/AnalyticsOverview"),
  { ssr: false },
);
const ScoreCard = dynamic(
  () => import("./command-center/ScoreCard"),
  { ssr: false },
);
const WeeklyActivityChart = dynamic(
  () => import("./command-center/InteractiveCharts").then((m) => m.WeeklyActivityChart),
  { ssr: false },
);
const SkillDistributionChart = dynamic(
  () => import("./command-center/InteractiveCharts").then((m) => m.SkillDistributionChart),
  { ssr: false },
);
const ProjectGrowthChart = dynamic(
  () => import("./command-center/InteractiveCharts").then((m) => m.ProjectGrowthChart),
  { ssr: false },
);
const ActivityFeed = dynamic(
  () => import("./command-center/ActivityFeed"),
  { ssr: false },
);
const QuickActions = dynamic(
  () => import("./command-center/QuickActions"),
  { ssr: false },
);
const SystemStatus = dynamic(
  () => import("./command-center/SystemStatus"),
  { ssr: false },
);
const GitHubActivity = dynamic(
  () => import("./command-center/GitHubActivity"),
  { ssr: false },
);
const RecentDeployments = dynamic(
  () => import("./command-center/RecentDeployments"),
  { ssr: false },
);
const RecentCommits = dynamic(
  () => import("./command-center/RecentCommits"),
  { ssr: false },
);
const RecentUpdates = dynamic(
  () => import("./command-center/RecentUpdates"),
  { ssr: false },
);
const PinnedActions = dynamic(
  () => import("./command-center/PinnedActions"),
  { ssr: false },
);

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

function ErrorFallback({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-8 flex flex-col items-center justify-center text-center">
      <div className="w-12 h-12 rounded-2xl bg-red-400/10 border border-red-400/20 flex items-center justify-center mb-4">
        <Activity size={20} className="text-red-400" />
      </div>
      <p className="text-sm font-semibold text-white mb-1">{title}</p>
      <p className="text-xs text-gray-500 font-medium max-w-xs">{description}</p>
    </div>
  );
}

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
    <div className="space-y-6">
      {/* Ambient glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/[0.06] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-purple-500/[0.04] blur-[140px] rounded-full pointer-events-none" />

      {/* ============ WELCOME SECTION ============ */}
      <div className="relative animate-fade-in-up">
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-status-pulse" />
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

      {/* ============ TODAY'S OVERVIEW (Stat Cards) ============ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <StatCard
          title="Total Projects"
          value={data.projectCount}
          icon={FolderKanban}
          color="cyan"
          trend="+2"
          trendUp={true}
          description="Deployed to production"
        />
        <StatCard
          title="Core Skills"
          value={data.skillCount}
          icon={Code2}
          color="purple"
          trend="Stable"
          trendUp={true}
          description="Technical expertise areas"
        />
        <StatCard
          title="Inquiries"
          value={data.messageCount}
          icon={Mail}
          color="emerald"
          trend={data.unreadMessageCount > 0 ? `${data.unreadMessageCount} new` : "All read"}
          trendUp={data.unreadMessageCount > 0}
          description="Total contact messages"
        />
        <StatCard
          title="System Status"
          value="Online"
          icon={ShieldCheck}
          color="amber"
          trend="100%"
          trendUp={true}
          description="API & database active"
        />
      </div>

      {/* ============ PORTFOLIO ANALYTICS (Full-width responsive cards) ============ */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <AnalyticsOverview />
      </div>

      {/* ============ PERFORMANCE SCORES ============ */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-white/5">
            <Gauge size={14} className="text-cyan-400" />
          </div>
          <h2 className="text-sm font-semibold text-white">Performance Scores</h2>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ScoreCard label="Performance" score={96} icon={Gauge} color="cyan" description="Core Web Vitals optimized" />
          <ScoreCard label="SEO" score={92} icon={Search} color="emerald" description="Meta tags & structured data" />
          <ScoreCard label="Accessibility" score={88} icon={Accessibility} color="purple" description="WCAG 2.1 compliance" />
        </div>
      </div>

      {/* ============ CHARTS ROW (12-col grid) ============ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <div className="lg:col-span-8">
          <WeeklyActivityChart />
        </div>
        <div className="lg:col-span-4">
          <SkillDistributionChart />
        </div>
      </div>

      {/* ============ RECENT MESSAGES + ACTIVITY + QUICK ACTIONS ============ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
        <div className="lg:col-span-5">
          <RecentInquiries messages={data.recentMessages} />
        </div>
        <div className="lg:col-span-4">
          <ActivityFeed />
        </div>
        <div className="lg:col-span-3 space-y-4">
          <QuickActions />
          <SystemStatus />
        </div>
      </div>

      {/* ============ RECENT DEPLOYMENTS + RECENT UPDATES ============ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <div className="lg:col-span-6">
          <RecentDeployments />
        </div>
        <div className="lg:col-span-6">
          <RecentUpdates />
        </div>
      </div>

      {/* ============ GITHUB ACTIVITY (Full width) ============ */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
        <GitHubActivity />
      </div>

      {/* ============ GROWTH CHART + RECENT COMMITS ============ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
        <div className="lg:col-span-7">
          <ProjectGrowthChart />
        </div>
        <div className="lg:col-span-5">
          <RecentCommits />
        </div>
      </div>

      {/* ============ PINNED ACTIONS (Full width) ============ */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.55s" }}>
        <PinnedActions />
      </div>
    </div>
  );
}
