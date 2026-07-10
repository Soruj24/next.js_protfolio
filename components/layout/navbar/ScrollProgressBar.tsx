"use client";
import { motion } from "framer-motion";

interface ScrollProgressProps {
  progress: number;
}

export default function ScrollProgress({ progress }: ScrollProgressProps) {
  return (
    <div className="absolute top-0 left-0 w-full h-[1px] bg-white/[0.03]">
      <motion.div
        className="h-full origin-left"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6)",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
    </div>
  );
}
