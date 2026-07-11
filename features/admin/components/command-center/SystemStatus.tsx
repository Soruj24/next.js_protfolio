"use client";

import { Activity, Server, Database, Wifi, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemMetric {
  label: string;
  value: string;
  status: "operational" | "degraded" | "down";
  icon: typeof Server;
}

const metrics: SystemMetric[] = [
  { label: "API Server", value: "Online", status: "operational", icon: Server },
  { label: "Database", value: "Connected", status: "operational", icon: Database },
  { label: "Network", value: "Stable", status: "operational", icon: Wifi },
];

const statusColors = {
  operational: "bg-emerald-400",
  degraded: "bg-amber-400",
  down: "bg-red-400",
};

const statusText = {
  operational: "text-emerald-400",
  degraded: "text-amber-400",
  down: "text-red-400",
};

export default function SystemStatus() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">System Status</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-status-pulse" />
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">All Systems Operational</span>
        </div>
      </div>

      <div className="space-y-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex items-center gap-3">
              <metric.icon size={15} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-300">{metric.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn("text-xs font-semibold", statusText[metric.status])}>
                {metric.value}
              </span>
              <div className={cn("w-2 h-2 rounded-full", statusColors[metric.status])} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-2">
        <Clock size={12} className="text-gray-600" />
        <span className="text-[10px] text-gray-600 font-medium">
          Last checked: {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
}
