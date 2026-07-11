"use client";

import { useState, useEffect, useCallback } from "react";
import { Activity, Server, Database, Wifi, Clock, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthCheck {
  label: string;
  value: string;
  status: "operational" | "degraded" | "down";
}

interface HealthResponse {
  status: string;
  checks: HealthCheck[];
  lastChecked: string;
}

const iconMap: Record<string, typeof Server> = {
  "API Server": Server,
  Database: Database,
  Network: Wifi,
};

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

const statusLabels = {
  operational: "All Systems Operational",
  degraded: "Partial Degradation",
  down: "System Issues Detected",
};

const statusLabelColors = {
  operational: "text-emerald-400",
  degraded: "text-amber-400",
  down: "text-red-400",
};

export default function SystemStatus() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchHealth = useCallback(async () => {
    try {
      const res = await fetch("/api/health", { cache: "no-store" });
      if (res.ok) {
        const d = await res.json();
        setData(d);
      }
    } catch {
      setData({
        status: "down",
        checks: [
          { label: "API Server", value: "Unreachable", status: "down" },
          { label: "Database", value: "Unknown", status: "down" },
          { label: "Network", value: "Unknown", status: "down" },
        ],
        lastChecked: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, [fetchHealth]);

  const status = (data?.status || "down") as keyof typeof statusColors;
  const Icon = Activity;

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">System Status</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={cn("w-2 h-2 rounded-full animate-status-pulse", statusColors[status])} />
          <span className={cn("text-[10px] font-bold uppercase tracking-widest", statusLabelColors[status])}>
            {loading ? "Checking..." : statusLabels[status]}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded bg-white/5" />
                <div className="h-3 w-20 bg-white/5 rounded" />
              </div>
              <div className="h-3 w-16 bg-white/5 rounded" />
            </div>
          ))
        ) : (
          (data?.checks || []).map((metric) => {
            const MetricIcon = iconMap[metric.label] || Server;
            return (
              <div
                key={metric.label}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MetricIcon size={15} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-300">{metric.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn("text-xs font-semibold", statusText[metric.status])}>
                    {metric.value}
                  </span>
                  <div className={cn("w-2 h-2 rounded-full", statusColors[metric.status])} />
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={12} className="text-gray-600" />
          <span className="text-[10px] text-gray-600 font-medium">
            {data?.lastChecked
              ? `Last checked: ${new Date(data.lastChecked).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`
              : "Not checked yet"}
          </span>
        </div>
        <button
          onClick={fetchHealth}
          className="p-1 rounded hover:bg-white/5 text-gray-600 hover:text-gray-400 transition-colors"
          title="Refresh status"
        >
          <RefreshCw size={12} />
        </button>
      </div>
    </div>
  );
}
