"use client";

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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, BarChart3, PieChart as PieIcon } from "lucide-react";

const weeklyData = [
  { day: "Mon", views: 42, visitors: 28 },
  { day: "Tue", views: 68, visitors: 45 },
  { day: "Wed", views: 95, visitors: 62 },
  { day: "Thu", views: 78, visitors: 51 },
  { day: "Fri", views: 112, visitors: 73 },
  { day: "Sat", views: 89, visitors: 58 },
  { day: "Sun", views: 64, visitors: 41 },
];

const monthlyData = [
  { month: "Jan", projects: 2, inquiries: 8 },
  { month: "Feb", projects: 3, inquiries: 12 },
  { month: "Mar", projects: 5, inquiries: 18 },
  { month: "Apr", projects: 4, inquiries: 15 },
  { month: "May", projects: 7, inquiries: 22 },
  { month: "Jun", projects: 6, inquiries: 28 },
];

const skillData = [
  { name: "Frontend", value: 42, color: "#22d3ee" },
  { name: "Backend", value: 28, color: "#a78bfa" },
  { name: "Database", value: 15, color: "#f97316" },
  { name: "DevOps", value: 10, color: "#ec4899" },
  { name: "Mobile", value: 5, color: "#34d399" },
];

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

function WeeklyActivityChart() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={16} className="text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">Weekly Activity</h3>
          </div>
          <p className="text-xs text-gray-500 font-medium">Page views & unique visitors</p>
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
          <AreaChart data={weeklyData}>
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
              dataKey="views"
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

function ProjectGrowthChart() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 size={16} className="text-purple-400" />
            <h3 className="text-sm font-semibold text-white">Growth Metrics</h3>
          </div>
          <p className="text-xs text-gray-500 font-medium">Projects & inquiries per month</p>
        </div>
      </div>

      <div className="h-[240px] -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="month"
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
            <Bar dataKey="projects" fill="#a78bfa" radius={[6, 6, 0, 0]} barSize={16} />
            <Bar dataKey="inquiries" fill="#22d3ee" radius={[6, 6, 0, 0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SkillDistributionChart() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6 overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <PieIcon size={16} className="text-amber-400" />
        <h3 className="text-sm font-semibold text-white">Skill Distribution</h3>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-[160px] h-[160px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={skillData}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {skillData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.[0]) return null;
                  return (
                    <div className="rounded-xl border border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl px-3 py-2 shadow-2xl shadow-black/50">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: payload[0].payload.color }} />
                        <span className="text-white font-semibold">{payload[0].name}</span>
                        <span className="text-gray-400 font-medium">{payload[0].value}%</span>
                      </div>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-3">
          {skillData.map((skill) => (
            <div key={skill.name} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: skill.color }} />
              <span className="text-xs text-gray-400 font-medium flex-1">{skill.name}</span>
              <span className="text-xs text-white font-bold tabular-nums">{skill.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { WeeklyActivityChart, ProjectGrowthChart, SkillDistributionChart };
