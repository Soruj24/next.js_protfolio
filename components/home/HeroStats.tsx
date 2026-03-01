import React from "react";

const HeroStats: React.FC = () => {
  const stats = [
    {
      label: "Projects Done",
      value: "20+",
      color: "group-hover:text-cyan-400",
    },
    {
      label: "UI Components",
      value: "500+",
      color: "group-hover:text-purple-400",
    },
    {
      label: "Performance",
      value: "95%+",
      color: "group-hover:text-blue-400",
    },
    {
      label: "Happy Clients",
      value: "10+",
      color: "group-hover:text-pink-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-8 max-w-5xl mx-auto border-t border-white/5 pt-8 sm:pt-12">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="stat-card group p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors"
        >
          <div className={`text-3xl sm:text-4xl font-black text-white mb-1 ${stat.color} transition-colors`}>
            {stat.value}
          </div>
          <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroStats;
