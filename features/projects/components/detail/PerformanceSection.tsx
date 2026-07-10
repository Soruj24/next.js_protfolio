"use client";
import { motion } from "framer-motion";
import { Gauge } from "lucide-react";
import type { IPerformanceStats } from "@/types";

interface PerformanceSectionProps {
  performance: IPerformanceStats;
}

function getBarColor(value: number): string {
  if (value >= 90) return "from-emerald-400 to-emerald-500";
  if (value >= 70) return "from-amber-400 to-amber-500";
  return "from-red-400 to-red-500";
}

function getScoreLabel(value: number): string {
  if (value >= 90) return "Excellent";
  if (value >= 70) return "Good";
  return "Needs Work";
}

function getScoreColor(value: number): string {
  if (value >= 90) return "text-emerald-400";
  if (value >= 70) return "text-amber-400";
  return "text-red-400";
}

export default function PerformanceSection({ performance }: PerformanceSectionProps) {
  const metrics = [
    { label: "Performance", value: performance.loadTime },
    { label: "Interactivity", value: performance.interactivity },
    { label: "Accessibility", value: performance.accessibility },
    { label: "SEO", value: performance.seo },
    { label: "Best Practices", value: performance.bestPractices },
  ].filter((m) => m.value != null);

  const avg = Math.round(metrics.reduce((acc, m) => acc + m.value!, 0) / metrics.length);

  return (
    <section id="performance" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Gauge className="w-4 h-4 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Performance Optimization
          </h2>
        </div>

        {/* Score Summary */}
        <div className="flex items-center gap-6 mb-8 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="2.5"
              />
              <motion.path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0, 100" }}
                whileInView={{ strokeDasharray: `${avg}, 100` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-white">{avg}</span>
              <span className="text-[9px] text-gray-400 uppercase tracking-wider">avg</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-1">Lighthouse Score</h4>
            <p className="text-[13px] text-gray-500">
              {getScoreLabel(avg)} — All core metrics pass industry thresholds.
            </p>
          </div>
        </div>

        {/* Individual Metrics */}
        <div className="space-y-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-medium text-gray-400">{metric.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-400">{getScoreLabel(metric.value!)}</span>
                  <span className={`text-sm font-bold ${getScoreColor(metric.value!)}`}>
                    {metric.value}
                  </span>
                </div>
              </div>
              <div className="h-2 bg-white/[0.03] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${metric.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                  className={`h-full rounded-full bg-gradient-to-r ${getBarColor(metric.value!)}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
