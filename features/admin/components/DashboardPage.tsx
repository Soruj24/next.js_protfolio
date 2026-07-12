"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  FolderKanban,
  Code2,
  Mail,
  Gauge,
  FileText,
} from "lucide-react";
import dynamic from "next/dynamic";
import type { DashboardData } from "@/lib/services/dashboard";
import StatCard from "@/features/admin/components/command-center/StatCard";
import RecentInquiries from "@/features/admin/components/RecentInquiries";
import AnalyticsOverviewInline from "@/features/admin/components/dashboard/AnalyticsOverviewInline";
import ScoreCardsInline from "@/features/admin/components/dashboard/ScoreCardsInline";
import RecentDeploymentsInline from "@/features/admin/components/dashboard/RecentDeploymentsInline";
import RecentUpdatesInline from "@/features/admin/components/dashboard/RecentUpdatesInline";
import { ChartSkeleton, WidgetSkeleton, SectionSkeleton } from "@/features/admin/components/dashboard/skeletons";

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
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/[0.06] blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-purple-500/[0.04] blur-[140px] rounded-full pointer-events-none" aria-hidden="true" />

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <StatCard title="Total Projects" value={data.projects.total} icon={FolderKanban} color="cyan" trend={data.projects.featured > 0 ? `${data.projects.featured} featured` : "None featured"} trendUp={data.projects.featured > 0} description={`${data.projects.totalViews.toLocaleString()} total views`} href="/admin/projects" />
        <StatCard title="Core Skills" value={data.skills.totalSkills} icon={Code2} color="purple" trend={`${data.skills.totalCategories} categories`} trendUp={true} description={`${data.skills.totalSkills} technical expertise areas`} href="/admin/skills" />
        <StatCard title="Published Blogs" value={data.blogs.published} icon={FileText} color="emerald" trend={data.blogs.total > data.blogs.published ? `${data.blogs.total - data.blogs.published} drafts` : "All published"} trendUp={data.blogs.published > 0} description={`${data.blogs.totalViews.toLocaleString()} total views`} href="/admin/blogs" />
        <StatCard title="Contact Messages" value={data.contacts.total} icon={Mail} color="amber" trend={data.contacts.unread > 0 ? `${data.contacts.unread} unread` : "All read"} trendUp={data.contacts.unread > 0} description={`${data.contacts.total} total inquiries`} href="/admin/inquiries" />
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <AnalyticsOverviewInline analytics={data.analytics} />
      </div>

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

      <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <InteractiveCharts />
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <div className="lg:col-span-6">
          <RecentDeploymentsInline github={data.github} />
        </div>
        <div className="lg:col-span-6">
          <RecentUpdatesInline activities={data.activities} />
        </div>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
        <GitHubActivity />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
        <div className="lg:col-span-7">
          <RecentUpdatesInline activities={data.activities} />
        </div>
        <div className="lg:col-span-5">
          <RecentCommits />
        </div>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: "0.55s" }}>
        <PinnedActions />
      </div>
    </div>
  );
}
