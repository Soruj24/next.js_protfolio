import Link from "next/link";
import { Cpu, Activity, Loader2 } from "lucide-react";
import type { DashboardData } from "@/lib/services/dashboard";
import { useEffect, useState } from "react";

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

interface SkillDistributionItem {
  label: string;
  value: number;
  color: string;
}

function SkillDistribution() {
  const [items, setItems] = useState<SkillDistributionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/skills")
      .then((r) => r.json())
      .then((data) => {
        const totalSkills = data.reduce(
          (acc: number, cat: any) => acc + (cat.skills?.length || 0),
          0
        );
        if (totalSkills === 0) {
          setItems([]);
          return;
        }
        const colors = ["bg-cyan-500", "bg-purple-500", "bg-orange-500", "bg-pink-500", "bg-emerald-500", "bg-amber-500"];
        const distribution = data.map((cat: any, i: number) => ({
          label: cat.title,
          value: Math.round(((cat.skills?.length || 0) / totalSkills) * 100),
          color: colors[i % colors.length],
        }));
        setItems(distribution);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Activity className="text-orange-400" size={20} />
        Skill Distribution
      </h2>
      {loading ? (
        <div className="flex justify-center py-6">
          <Loader2 size={16} className="text-gray-500 animate-spin" />
        </div>
      ) : items.length > 0 ? (
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
      ) : (
        <p className="text-xs text-gray-600 text-center py-6">No skills yet</p>
      )}
    </div>
  );
}

function ActivityLog({ data: _data }: { data: DashboardData }) {
  const [logs, setLogs] = useState<{ label: string; time: string; color: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/activities?limit=5")
      .then((r) => r.json())
      .then((result) => {
        const activities = result.data || [];
        const colorMap: Record<string, string> = {
          profile: "bg-blue-500",
          security: "bg-amber-500",
          system: "bg-green-500",
          project: "bg-purple-500",
          contact: "bg-cyan-500",
          blog: "bg-purple-500",
          analytics: "bg-pink-500",
          github: "bg-gray-500",
          deployment: "bg-orange-500",
        };
        setLogs(
          activities.slice(0, 5).map((a: any) => ({
            label: a.title,
            time: new Date(a.createdAt).toLocaleDateString(),
            color: colorMap[a.type] || "bg-gray-500",
          }))
        );
      })
      .catch(() => setLogs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Activity className="text-orange-400" size={20} />
        Activity Log
      </h2>
      {loading ? (
        <div className="flex justify-center py-6">
          <Loader2 size={16} className="text-gray-500 animate-spin" />
        </div>
      ) : logs.length > 0 ? (
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
      ) : (
        <p className="text-xs text-gray-600 text-center py-6">No activities yet</p>
      )}
    </div>
  );
}

export default function SideWidgets({ data }: { data: DashboardData }) {
  return (
    <div className="space-y-8">
      <QuickDeployment />
      <SkillDistribution />
      {data.skillCount > 0 && <ActivityLog data={data} />}
    </div>
  );
}
