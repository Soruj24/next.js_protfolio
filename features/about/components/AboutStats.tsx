"use client";
import React from "react";

interface Stat {
  value: string;
  label: string;
  color: string;
}

interface AboutStatsProps {
  stats: Stat[];
  addCardRef: (el: HTMLDivElement | null, index: number) => void;
}

const AboutStats: React.FC<AboutStatsProps> = ({ stats, addCardRef }) => {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          ref={(el) => addCardRef(el, index)}
          className="glass-card-premium rounded-2xl p-4 sm:p-6 group relative overflow-hidden cursor-default"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div
            className={`text-base sm:text-xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
          >
            {stat.value}
          </div>
          <div className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutStats;
