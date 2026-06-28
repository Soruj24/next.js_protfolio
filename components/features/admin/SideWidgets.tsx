import Link from "next/link";
import { Cpu, Activity } from "lucide-react";
import type { DashboardData } from "@/lib/services/dashboard";

function QuickDeployment() {
  return (
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
        <div className="space-y-3 space-between flex-1">
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
  );
}

function SkillDistribution() {
  const items = [
    { label: "Frontend", value: 45, color: "bg-cyan-500" },
    { label: "Backend", value: 30, color: "bg-purple-500" },
    { label: "Database", value: 15, color: "bg-orange-500" },
    { label: "DevOps", value: 10, color: "bg-pink-500" },
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Activity className="text-orange-400" size={20} />
        Skill Distribution
      </h2>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
              <span className="text-gray-400">{item.label}</span>
              <span className="text-white">{item.value}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${item.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityLog() {
  const logs = [
    { label: "System Boot", time: "2m ago", color: "bg-green-500" },
    { label: "DB Connected", time: "5m ago", color: "bg-blue-500" },
    { label: "API Optimized", time: "1h ago", color: "bg-purple-500" },
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Activity className="text-orange-400" size={20} />
        Activity Log
      </h2>
      <div className="space-y-6">
        {logs.map((log, i) => (
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
  );
}

export default function SideWidgets({ data }: { data: DashboardData }) {
  return (
    <div className="space-y-8">
      <QuickDeployment />
      <SkillDistribution />
      {data.skillCount > 0 && <ActivityLog />}
    </div>
  );
}
