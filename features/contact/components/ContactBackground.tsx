"use client";
import { motion } from "framer-motion";

export default function ContactBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

      {/* Animated orbs */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-cyan-500/[0.03] rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 20, -30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-purple-500/[0.03] rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, 20, -10, 0],
          y: [0, -10, 20, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute top-[60%] left-[50%] w-[300px] h-[300px] bg-blue-500/[0.02] rounded-full blur-[100px]"
      />
    </div>
  );
}
