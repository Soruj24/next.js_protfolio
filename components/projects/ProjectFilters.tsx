import React from "react";

interface ProjectFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  categories: string[];
  projects: any[];
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  projects,
}) => {
  return (
    <div className="mt-20 mb-16 space-y-10">
      {/* Search Bar */}
      <div className="max-w-3xl mx-auto">
        <div className="group relative">
          <div className="absolute inset-0 bg-cyan-500/20 rounded-[2rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <input
            type="text"
            placeholder="Query projects by name, tech, or functionality..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] px-8 py-6 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all backdrop-blur-xl relative z-10 text-lg font-medium"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-3 z-20">
            <div className="h-8 w-px bg-white/10 mx-2" />
            <div className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-cyan-500/20">
              AI Powered Search
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-8 py-4 rounded-2xl text-sm font-black transition-all duration-500 uppercase tracking-[0.2em] border relative overflow-hidden group/btn ${
              selectedCategory === category
                ? "bg-cyan-500 text-white border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)] scale-105"
                : "bg-white/[0.02] text-gray-500 border-white/5 hover:border-white/20 hover:text-white"
            }`}
          >
            <span className="relative z-10">{category}</span>
            <span className="ml-3 px-2 py-0.5 rounded-md bg-black/20 text-[10px] font-black group-hover/btn:bg-white/20 transition-colors">
              {category === "All"
                ? projects.length
                : projects.filter((p) => p.category === category).length}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectFilters;
