"use client";
import { motion } from "framer-motion";
import { FolderCode } from "lucide-react";

export default function FeaturedProjectsLoading() {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <FolderCode className="w-4 h-4 text-gray-400" />
          <div className="h-3 w-24 bg-white/[0.04] rounded-lg" />
        </div>
        <div className="h-10 w-64 bg-white/[0.04] rounded-2xl mx-auto" />
        <div className="h-4 w-96 max-w-full bg-white/[0.03] rounded-lg mx-auto" />
      </div>

      {/* Filters skeleton */}
      <div className="flex gap-3 justify-center">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 w-20 bg-white/[0.03] rounded-xl" />
        ))}
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-3xl bg-white/[0.02] border border-white/[0.04] overflow-hidden"
          >
            <div className="aspect-[16/9] bg-white/[0.03] animate-pulse" />
            <div className="p-6 sm:p-8 space-y-4">
              <div className="h-6 w-3/4 bg-white/[0.04] rounded-lg" />
              <div className="h-4 w-full bg-white/[0.03] rounded-lg" />
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-5 w-14 bg-white/[0.03] rounded-md" />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
