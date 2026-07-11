"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  FolderKanban,
  Code2,
  Mail,
  ShieldCheck,
} from "lucide-react";
import dynamic from "next/dynamic";
import type { DashboardData } from "@/lib/services/dashboard";
import StatCard from "./command-center/StatCard";
import ActivityFeed from "./command-center/ActivityFeed";
import QuickActions from "./command-center/QuickActions";
import SystemStatus from "./command-center/SystemStatus";
import RecentInquiries from "@/features/admin/components/RecentInquiries";

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

export default function DashboardPage({ data }: { data: DashboardData }) {
  const { data: session } = useSession();
  const userName = session?.user?.name?.split(" ")[0] || "Admin";

  const [greeting, setGreeting] = useState("Welcome");
  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening");
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/[0.06] blur-[120px] rounded-full pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-status-pulse" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">System Online</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-1">
            {greeting}, <span className="text-gradient">{userName}</span>
          </h1>
          <p className="text-sm text-gray-500 font-medium max-w-xl">
            Central command for your technical portfolio. Monitor deployments, manage skill sets, and analyze engagement.
          </p>
        </div>
      </div>

      {/* Stat Cards - 4 column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Charts Row - 12 col grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8">
          <WeeklyActivityChart />
        </div>
        <div className="lg:col-span-4">
          <SkillDistributionChart />
        </div>
      </div>

      {/* Bottom Row - 12 col grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Recent Inquiries - 5 cols */}
        <div className="lg:col-span-5">
          <RecentInquiries messages={data.recentMessages} />
        </div>

        {/* Activity Feed - 4 cols */}
        <div className="lg:col-span-4">
          <ActivityFeed />
        </div>

        {/* Right sidebar - 3 cols */}
        <div className="lg:col-span-3 space-y-4">
          <QuickActions />
          <SystemStatus />
        </div>
      </div>

      {/* Growth Metrics - full width */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-12">
          <ProjectGrowthChart />
        </div>
      </div>
    </div>
  );
}
