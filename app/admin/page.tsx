import { getDashboardData } from "@/lib/services/dashboard";
import DashboardStatsGrid from "@/components/features/admin/DashboardStatsGrid";
import RecentInquiries from "@/components/features/admin/RecentInquiries";
import SideWidgets from "@/components/features/admin/SideWidgets";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const data = await getDashboardData();

  return (
    <div className="space-y-10">
      <div className="relative">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">
          System{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            Command Center
          </span>
        </h1>
        <p className="text-gray-400 font-medium max-w-2xl">
          Central command for your technical portfolio. Monitor deployments, manage skill sets, and analyze engagement.
        </p>
      </div>

      <DashboardStatsGrid data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <RecentInquiries messages={data.recentMessages} />
        <SideWidgets data={data} />
      </div>
    </div>
  );
}
