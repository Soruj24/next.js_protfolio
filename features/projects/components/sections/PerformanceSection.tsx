"use client";
import { Gauge } from "lucide-react";
import { motion } from "framer-motion";
import { IPerformanceStats } from "@/types";

interface PerformanceSectionProps {
  performance: IPerformanceStats;
}

const metricColors: Record<string, string> = {
  loadTime: "from-cyan-500 to-blue-500",
  accessibility: "from-emerald-500 to-teal-500",
  bestPractices: "from-purple-500 to-pink-500",
  interactivity: "from-amber-500 to-orange-500",
  seo: "from-blue-500 to-indigo-500",
};

const metricIcons: Record<string, string> = {
  loadTime: "⚡",
  accessibility: "♿",
  bestPractices: "✅",
  interactivity: "🔄",
  seo: "🔍",
};

export default function PerformanceSection({ performance }: PerformanceSectionProps) {
  if (!performance) return null;

  const metrics = Object.entries(performance) as [string, number][];

  return (
    <section id="performance" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
          <Gauge className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Performance</h2>
          <p className="text-sm text-gray-500 mt-0.5">Optimization metrics and scores</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metrics.map(([key, value], i) => {
          const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{metricIcons[key] || "📊"}</span>
                  <span className="text-sm text-gray-400">{label}</span>
                </div>
                <span className="text-lg font-bold text-white">{value}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                  className={`h-full rounded-full bg-gradient-to-r ${metricColors[key] || "from-cyan-500 to-purple-500"}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
