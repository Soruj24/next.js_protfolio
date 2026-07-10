"use client";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import type { IProject } from "@/types";
import FeaturedProjectCard from "./FeaturedProjectCard";

interface FeaturedProjectsGridProps {
  projects: IProject[];
  hasMore: boolean;
  onLoadMore: () => void;
  isLoadingMore: boolean;
}

export default function FeaturedProjectsGrid({
  projects,
  hasMore,
  onLoadMore,
  isLoadingMore,
}: FeaturedProjectsGridProps) {
  return (
    <div className="space-y-10">
      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {projects.map((project, index) => (
          <FeaturedProjectCard
            key={project._id || project.id}
            project={project}
            index={index}
          />
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="group relative px-8 py-3.5 rounded-2xl text-sm font-semibold text-white border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isLoadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More Projects"
              )}
            </span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
