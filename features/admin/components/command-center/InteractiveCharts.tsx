"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, BarChart3, Loader2 } from "lucide-react";

interface WeeklyData {
  day: string;
  visitors: number;
  pageViews: number;
}

interface MonthlyData {
  date: string;
  count: number;
}

interface AnalyticsResponse {
  weekly: WeeklyData[];
  submissionsByDay: MonthlyData[];
  overview: {
    visitors: number;
    sessions: number;
    pageViews: number;
    projectViews: number;
    resumeDownloads: number;
    contactSubmissions: number;
    githubClicks: number;
    conversionRate: number;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function ChartTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl px-4 py-3 shadow-2xl shadow-black/50">
      <p className="text-xs font-semibold text-gray-400 mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-400 font-medium capitalize">{entry.name}:</span>
          <span className="text-white font-bold tabular-nums">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="h-[240px] flex items-center justify-center">
      <Loader2 size={20} className="text-gray-600 animate-spin" />
    </div>
  );
}

function WeeklyActivityChart({ data }: { data: WeeklyData[] }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={16} className="text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">Weekly Activity</h3>
          </div>
          <p className="text-xs text-gray-500 font-medium">Page views & visitors by day</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Views</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Visitors</span>
          </div>
        </div>
      </div>

      <div className="h-[240px] -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="visitorsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)", fontWeight: 500 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)", fontWeight: 500 }}
              dx={-8}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="pageViews"
              stroke="#22d3ee"
              strokeWidth={2}
              fill="url(#viewsGradient)"
              dot={false}
              activeDot={{ r: 5, strokeWidth: 2, stroke: "#0a0a0f", fill: "#22d3ee" }}
            />
            <Area
              type="monotone"
              dataKey="visitors"
              stroke="#a78bfa"
              strokeWidth={2}
              fill="url(#visitorsGradient)"
              dot={false}
              activeDot={{ r: 5, strokeWidth: 2, stroke: "#0a0a0f", fill: "#a78bfa" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ContactSubmissionsChart({ data }: { data: MonthlyData[] }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 size={16} className="text-purple-400" />
            <h3 className="text-sm font-semibold text-white">Contact Submissions</h3>
          </div>
          <p className="text-xs text-gray-500 font-medium">Submissions per day</p>
        </div>
      </div>

      <div className="h-[240px] -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.slice(-12)} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)", fontWeight: 500 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)", fontWeight: 500 }}
              dx={-8}
            />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="count" fill="#a78bfa" radius={[6, 6, 0, 0]} barSize={16} name="Submissions" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function EngagementStats({ data }: { data: AnalyticsResponse["overview"] }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6 overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp size={16} className="text-amber-400" />
        <h3 className="text-sm font-semibold text-white">Engagement Overview</h3>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Project Views", value: data.projectViews.toLocaleString(), color: "text-cyan-400" },
          { label: "Resume Downloads", value: data.resumeDownloads.toLocaleString(), color: "text-purple-400" },
          { label: "Contact Forms", value: data.contactSubmissions.toLocaleString(), color: "text-amber-400" },
        ].map((stat) => (
          <div key={stat.label} className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <p className={`text-xl font-bold ${stat.color} tabular-nums`}>{stat.value}</p>
            <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export { WeeklyActivityChart, ContactSubmissionsChart, EngagementStats };

export default function InteractiveCharts() {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"><ChartSkeleton /></div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"><ChartSkeleton /></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-12 text-center">
        <p className="text-sm text-gray-500">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <WeeklyActivityChart data={data.weekly || []} />
      <ContactSubmissionsChart data={data.submissionsByDay || []} />
      <EngagementStats data={data.overview} />
    </div>
  );
}
