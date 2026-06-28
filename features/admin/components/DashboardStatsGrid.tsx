import Link from "next/link";
import { FolderKanban, MessageSquare, Zap, ShieldCheck, ArrowUpRight } from "lucide-react";
import type { DashboardData } from "@/lib/services/dashboard";

interface Stat {
  title: string;
  value: string | number;
  icon: any;
  color: string;
  description: string;
  trend: string;
  href?: string;
}

export default function DashboardStatsGrid({ data }: { data: DashboardData }) {
  const stats: Stat[] = [
    { title: "Total Projects", value: data.projectCount, icon: FolderKanban, color: "from-cyan-500 to-blue-600", description: "Deployed projects", trend: "+2", href: "/admin/projects" },
    { title: "Core Skills", value: data.skillCount, icon: Zap, color: "from-purple-500 to-pink-600", description: "Technical expertise", trend: "Stable", href: "/admin/skills" },
    { title: "Inquiries", value: data.messageCount, icon: MessageSquare, color: "from-green-500 to-emerald-600", description: "Total messages", trend: data.unreadMessageCount > 0 ? `${data.unreadMessageCount} new` : "All read", href: "/admin/inquiries" },
    { title: "System Status", value: "Online", icon: ShieldCheck, color: "from-orange-500 to-red-600", description: "API & DB active", trend: "100%" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Link
          key={stat.title}
          href={stat.href || "#"}
          className="group relative bg-white/5 border border-white/10 rounded-3xl p-6 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.07] overflow-hidden block"
        >
          <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity`} />
          <div className="flex flex-col gap-4 relative z-10">
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon size={22} />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-black text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-full border border-cyan-400/20">
                <ArrowUpRight size={10} />
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.title}</p>
              <div className="text-3xl font-black text-white tracking-tighter">{stat.value}</div>
            </div>
            <p className="text-xs text-gray-500 font-medium">{stat.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
