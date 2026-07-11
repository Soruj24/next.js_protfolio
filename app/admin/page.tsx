import { getDashboardData } from "@/lib/services/dashboard";
import DashboardPage from "@/features/admin/components/DashboardPage";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const data = await getDashboardData();
  return <DashboardPage data={data} />;
}
