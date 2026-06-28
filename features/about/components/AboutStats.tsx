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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          ref={(el) => addCardRef(el, index)}
          className="glass-card rounded-2xl p-6 border border-white/5 hover:border-cyan-500/30 transition-all duration-500 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div
            className={`text-xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
          >
            {stat.value}
          </div>
          <div className="text-xs uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutStats;
