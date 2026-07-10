"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";

interface FeaturedProjectFiltersProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  selectedTech: string[];
  toggleTech: (t: string) => void;
  categories: string[];
  allTechnologies: string[];
  totalResults: number;
}

export default function FeaturedProjectFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedTech,
  toggleTech,
  categories,
  allTechnologies,
  totalResults,
}: FeaturedProjectFiltersProps) {
  const [showTechPanel, setShowTechPanel] = useState(false);
  const [techSearch, setTechSearch] = useState("");
  const techPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (techPanelRef.current && !techPanelRef.current.contains(e.target as Node)) {
        setShowTechPanel(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTechs = allTechnologies.filter((t) =>
    t.toLowerCase().includes(techSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search + Tech Toggle Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Search */}
        <div className="flex-1 relative group">
          <div className="absolute inset-0 bg-cyan-500/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center bg-white/[0.03] border border-white/[0.06] rounded-2xl px-5 py-3.5 group-focus-within:border-cyan-500/30 transition-all duration-300">
            <Search className="w-4 h-4 text-gray-500 mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by name, tech, or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent text-white text-sm placeholder:text-gray-600 focus:outline-none font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="ml-2 p-1 rounded-lg hover:bg-white/[0.06] text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Tech Filter Toggle */}
        <div className="relative" ref={techPanelRef}>
          <button
            onClick={() => setShowTechPanel(!showTechPanel)}
            className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-medium transition-all duration-300 border ${
              selectedTech.length > 0
                ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                : "bg-white/[0.03] border-white/[0.06] text-gray-500 hover:text-white hover:border-white/[0.12]"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Tech Stack</span>
            {selectedTech.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-cyan-500 text-white text-[10px] font-bold flex items-center justify-center">
                {selectedTech.length}
              </span>
            )}
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                showTechPanel ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {showTechPanel && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-2 right-0 w-72 bg-[#0a0f1a] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/50 z-50 overflow-hidden"
              >
                <div className="p-3 border-b border-white/[0.06]">
                  <div className="flex items-center bg-white/[0.03] rounded-xl px-3 py-2">
                    <Search className="w-3.5 h-3.5 text-gray-500 mr-2" />
                    <input
                      type="text"
                      placeholder="Filter technologies..."
                      value={techSearch}
                      onChange={(e) => setTechSearch(e.target.value)}
                      className="flex-1 bg-transparent text-white text-xs placeholder:text-gray-600 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="p-2 max-h-60 overflow-y-auto">
                  {filteredTechs.map((tech) => {
                    const active = selectedTech.includes(tech);
                    return (
                      <button
                        key={tech}
                        onClick={() => toggleTech(tech)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                          active
                            ? "bg-cyan-500/10 text-cyan-400"
                            : "text-gray-500 hover:text-white hover:bg-white/[0.04]"
                        }`}
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                            active
                              ? "bg-cyan-500 border-cyan-500"
                              : "border-white/20"
                          }`}
                        >
                          {active && (
                            <svg
                              className="w-2.5 h-2.5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        {tech}
                      </button>
                    );
                  })}
                </div>
                {selectedTech.length > 0 && (
                  <div className="p-2 border-t border-white/[0.06]">
                    <button
                      onClick={() => selectedTech.forEach((t) => toggleTech(t))}
                      className="w-full px-3 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Category Tabs + Result Count */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border ${
                selectedCategory === cat
                  ? "bg-white/[0.08] text-white border-white/[0.12] shadow-lg shadow-white/[0.02]"
                  : "bg-transparent text-gray-600 border-transparent hover:text-gray-400 hover:bg-white/[0.02]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-600 font-medium tabular-nums">
          {totalResults} project{totalResults !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Active Tech Tags */}
      <AnimatePresence>
        {selectedTech.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2 overflow-hidden"
          >
            {selectedTech.map((tech) => (
              <motion.button
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => toggleTech(tech)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-semibold hover:bg-cyan-500/15 transition-colors"
              >
                {tech}
                <X className="w-3 h-3" />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
