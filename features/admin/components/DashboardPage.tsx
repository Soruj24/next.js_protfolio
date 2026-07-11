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
} from "lucide-react";
import dynamic from "next/dynamic";
import type { DashboardData } from "@/lib/services/dashboard";
import StatCard from "./command-center/StatCard";
import RecentInquiries from "@/features/admin/components/RecentInquiries";

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

const AnalyticsOverview = dynamic(
  () => import("./command-center/AnalyticsOverview"),
  { ssr: false, loading: () => <SectionSkeleton /> },
);
const ScoreCard = dynamic(
  () => import("./command-center/ScoreCard"),
  { ssr: false, loading: () => <SectionSkeleton /> },
);
const WeeklyActivityChart = dynamic(
  () => import("./command-center/InteractiveCharts").then((m) => m.WeeklyActivityChart),
  { ssr: false, loading: () => <ChartSkeleton /> },
);
const SkillDistributionChart = dynamic(
  () => import("./command-center/InteractiveCharts").then((m) => m.SkillDistributionChart),
  { ssr: false, loading: () => <ChartSkeleton /> },
);
const ProjectGrowthChart = dynamic(
  () => import("./command-center/InteractiveCharts").then((m) => m.ProjectGrowthChart),
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
const RecentDeployments = dynamic(
  () => import("./command-center/RecentDeployments"),
  { ssr: false, loading: () => <WidgetSkeleton /> },
);
const RecentCommits = dynamic(
  () => import("./command-center/RecentCommits"),
  { ssr: false, loading: () => <WidgetSkeleton /> },
);
const RecentUpdates = dynamic(
  () => import("./command-center/RecentUpdates"),
  { ssr: false, loading: () => <WidgetSkeleton /> },
);
const PinnedActions = dynamic(
  () => import("./command-center/PinnedActions"),
  { ssr: false, loading: () => <SectionSkeleton /> },
);

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

      {/* Stat Cards */}
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

      {/* Analytics Overview */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <AnalyticsOverview />
      </div>

      {/* Performance Scores */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-white/5">
            <Gauge size={14} className="text-cyan-400" />
          </div>
          <h2 className="text-sm font-semibold text-white">Performance Scores</h2>
          <div className="flex-1 h-px bg-white/[0.06]" aria-hidden="true" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ScoreCard label="Performance" score={96} icon={Gauge} color="cyan" description="Core Web Vitals optimized" />
          <ScoreCard label="SEO" score={92} icon={Search} color="emerald" description="Meta tags & structured data" />
          <ScoreCard label="Accessibility" score={88} icon={Accessibility} color="purple" description="WCAG 2.1 compliance" />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <div className="lg:col-span-8">
          <WeeklyActivityChart />
        </div>
        <div className="lg:col-span-4">
          <SkillDistributionChart />
        </div>
      </div>

      {/* Messages + Activity + Quick Actions */}
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

      {/* Deployments + Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <div className="lg:col-span-6">
          <RecentDeployments />
        </div>
        <div className="lg:col-span-6">
          <RecentUpdates />
        </div>
      </div>

      {/* GitHub Activity */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
        <GitHubActivity />
      </div>

      {/* Growth Chart + Recent Commits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
        <div className="lg:col-span-7">
          <ProjectGrowthChart />
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
