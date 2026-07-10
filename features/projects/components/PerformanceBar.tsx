"use client";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface PerformanceBarProps {
  label: string;
  value: number;
  color?: string;
  delay?: number;
}

function getBarColor(value: number): string {
  if (value >= 90) return "from-emerald-400 to-emerald-500";
  if (value >= 70) return "from-amber-400 to-amber-500";
  return "from-red-400 to-red-500";
}

function getTextColor(value: number): string {
  if (value >= 90) return "text-emerald-400";
  if (value >= 70) return "text-amber-400";
  return "text-red-400";
}

export default function PerformanceBar({
  label,
  value,
  delay = 0,
}: PerformanceBarProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
          {label}
        </span>
        <span className={`text-[11px] font-bold ${getTextColor(value)}`}>
          {value}
        </span>
      </div>
      <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${getBarColor(value)}`}
        />
      </div>
    </div>
  );
}
