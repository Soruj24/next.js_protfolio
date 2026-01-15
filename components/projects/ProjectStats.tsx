import React from "react";

interface ProjectStatsProps {
  projects: any[];
}

const ProjectStats: React.FC<ProjectStatsProps> = ({ projects }) => {
  const stats = [
    {
      label: "Total Intelligence",
      value: projects.length,
      color: "text-cyan-400",
    },
    {
      label: "Production Ready",
      value: projects.filter((p) => p.status === "completed").length,
      color: "text-green-400",
    },
    {
      label: "Tech Stacks",
      value: new Set(projects.flatMap((p) => p.technologies)).size,
      color: "text-blue-400",
    },
    {
      label: "Domain Reach",
      value: new Set(projects.map((p) => p.category)).size,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white/[0.02] rounded-[2rem] p-8 border border-white/5 backdrop-blur-xl"
        >
          <div className={`text-4xl font-black mb-1 ${stat.color}`}>
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

export default ProjectStats;
