"use client";
import { motion } from "framer-motion";
import { FolderOpen } from "lucide-react";

export default function FeaturedProjectsEmpty() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 rounded-3xl bg-white/[0.01] border border-dashed border-white/[0.06]"
    >
      <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-5">
        <FolderOpen className="w-7 h-7 text-gray-700" />
      </div>
      <h3 className="text-lg font-semibold text-white/60 mb-2">
        No projects found
      </h3>
      <p className="text-sm text-gray-600 text-center max-w-sm">
        Try adjusting your search or filters to discover more projects.
      </p>
    </motion.div>
  );
}
