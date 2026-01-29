import { connectDB } from "@/config/db";
import { Project } from "@/models/Project";
import { Contact } from "@/models/Contact";
import { SkillCategory } from "@/models/Skill";
import {
  FolderKanban,
  MessageSquare,
  Zap,
  Activity,
  User,
  ShieldCheck,
  Cpu,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getDashboardData() {
  const conn = await connectDB();

  if (!conn) {
    return {
      projectCount: 0,
      skillCount: 0,
      messageCount: 0,
      unreadMessageCount: 0,
      recentMessages: [],
    };
  }

  try {
    const [projectCount, skillCategories, messageCount, unreadMessageCount, recentMessages] =
      await Promise.all([
        Project.countDocuments(),
        SkillCategory.find().lean(),
        Contact.countDocuments(),
        Contact.countDocuments({ status: { $ne: 'read' } }), // Assuming there's a status field
        Contact.find().sort({ createdAt: -1 }).limit(5).lean(),
      ]);

    // Calculate total individual skills
    const skillCount = (skillCategories as any[]).reduce((acc, cat) => acc + (cat.skills?.length || 0), 0);

    return {
      projectCount,
      skillCount,
      messageCount,
      unreadMessageCount,
      recentMessages: JSON.parse(JSON.stringify(recentMessages)),
    };
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return {
      projectCount: 0,
      skillCount: 0,
      messageCount: 0,
      unreadMessageCount: 0,
      recentMessages: [],
    };
  }
}

export default async function AdminDashboard() {
  const data = await getDashboardData();

  const stats = [
    {
      title: "Total Projects",
      value: data.projectCount,
      icon: FolderKanban,
      color: "from-cyan-500 to-blue-600",
      description: "Deployed projects",
      trend: "+2",
      href: "/admin/projects",
    },
    {
      title: "Core Skills",
      value: data.skillCount,
      icon: Zap,
      color: "from-purple-500 to-pink-600",
      description: "Technical expertise",
      trend: "Stable",
      href: "/admin/skills",
    },
    {
      title: "Inquiries",
      value: data.messageCount,
      icon: MessageSquare,
      color: "from-green-500 to-emerald-600",
      description: "Total messages",
      trend: data.unreadMessageCount > 0 ? `${data.unreadMessageCount} new` : "All read",
      href: "/admin/inquiries",
    },
    {
      title: "System Status",
      value: "Online",
      icon: ShieldCheck,
      color: "from-orange-500 to-red-600",
      description: "API & DB active",
      trend: "100%",
    },
  ];

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
          Central command for your technical portfolio. Monitor deployments,
          manage skill sets, and analyze engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.title}
            href={stat.href || "#"}
            className="group relative bg-white/5 border border-white/10 rounded-3xl p-6 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.07] overflow-hidden block"
          >
            <div
              className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity`}
            />

            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-start justify-between">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-500`}
                >
                  <stat.icon size={22} />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-black text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-full border border-cyan-400/20">
                  <ArrowUpRight size={10} />
                  {stat.trend}
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">
                  {stat.title}
                </p>
                <div className="text-3xl font-black text-white tracking-tighter">
                  {stat.value}
                </div>
              </div>

              <p className="text-xs text-gray-500 font-medium">
                {stat.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <MessageSquare className="text-cyan-400" size={20} />
              Recent Inquiries
            </h2>
            <Link
              href="/admin/inquiries"
              className="text-xs font-bold text-cyan-400 uppercase tracking-widest hover:text-cyan-300 transition-colors bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {data.recentMessages.length > 0 ? (
              data.recentMessages.map((msg: any) => (
                <div
                  key={msg._id}
                  className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/[0.08] hover:border-white/10 transition-all duration-300 group/msg"
                >
                  <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 group-hover/msg:scale-110 transition-transform">
                    <User size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-white truncate">
                        {msg.name}
                      </p>
                      <span className="text-[10px] text-gray-500 font-medium">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 truncate font-medium">
                      {msg.message}
                    </p>
                  </div>
                  {msg.status !== 'read' && (
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <MessageSquare className="text-gray-600" size={24} />
                </div>
                <p className="text-gray-500 font-medium">
                  No recent messages
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />

            <div className="relative flex flex-col h-full">
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Cpu className="text-purple-400" size={20} />
                Quick Deployment
              </h2>
              <p className="text-sm text-purple-200/60 font-medium mb-8">
                Instantly push new technical skills or projects to your production matrix.
              </p>

              <div className="space-y-3">
                <Link
                  href="/admin/projects/new"
                  className="block w-full py-4 bg-white text-black font-black text-center text-xs uppercase tracking-widest rounded-2xl hover:bg-cyan-400 hover:text-white transition-all duration-300 shadow-xl shadow-black/20"
                >
                  New Project
                </Link>
                <Link
                  href="/admin/skills/new"
                  className="block w-full py-4 bg-white/10 text-white border border-white/10 font-black text-center text-xs uppercase tracking-widest rounded-2xl hover:bg-white/20 transition-all duration-300"
                >
                  Update Skills
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Activity className="text-orange-400" size={20} />
              Skill Distribution
            </h2>
            <div className="space-y-4">
              {data.skillCount > 0 ? (
                // Simple bar chart representation
                [
                  { label: "Frontend", value: 45, color: "bg-cyan-500" },
                  { label: "Backend", value: 30, color: "bg-purple-500" },
                  { label: "Database", value: 15, color: "bg-orange-500" },
                  { label: "DevOps", value: 10, color: "bg-pink-500" },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="text-white">{item.value}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-xs italic">No data available</p>
              )}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Activity className="text-orange-400" size={20} />
              Activity Log
            </h2>
            <div className="space-y-6">
              {[
                { label: "System Boot", time: "2m ago", color: "bg-green-500" },
                { label: "DB Connected", time: "5m ago", color: "bg-blue-500" },
                { label: "API Optimized", time: "1h ago", color: "bg-purple-500" },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${log.color} shadow-[0_0_8px_rgba(0,0,0,0.5)]`} />
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">{log.label}</p>
                    <p className="text-[10px] text-gray-500 font-medium">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
