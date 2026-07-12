"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroProfile() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, x: 40 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative flex items-center justify-center"
    >
      {/* Outer glow */}
      <motion.div
        className="absolute w-[380px] h-[380px] sm:w-[420px] sm:h-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.08) 0%, rgba(139,92,246,0.04) 50%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rotating ring */}
      <motion.div
        className="absolute w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] rounded-full border border-dashed border-white/[0.06]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Accent dots on the ring */}
      <motion.div
        className="absolute w-[340px] h-[340px] sm:w-[380px] sm:h-[380px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(139,92,246,0.6)]" />
      </motion.div>

      {/* Inner ring */}
      <div className="absolute w-[300px] h-[300px] sm:w-[330px] sm:h-[330px] rounded-full border border-white/[0.06]" />

      {/* Photo container */}
      <div className="relative w-[260px] h-[260px] sm:w-[290px] sm:h-[290px] rounded-full overflow-hidden border border-white/[0.1] bg-[#0a0f1e]">
        <Image
          src="./../../../public/soruj.jpg"
          alt="Soruj Mahmud - Frontend Developer"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 640px) 260px, 290px"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/30 via-transparent to-transparent" />
      </div>

      {/* Floating badges */}
      <motion.div
        className="absolute -top-2 -right-2 sm:top-0 sm:right-4"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="px-3 py-1.5 rounded-lg bg-[#0a0f1e]/90 border border-white/[0.1] backdrop-blur-sm shadow-lg">
          <span className="text-xs font-mono text-cyan-400">React</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-2 -left-2 sm:bottom-4 sm:-left-4"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="px-3 py-1.5 rounded-lg bg-[#0a0f1e]/90 border border-white/[0.1] backdrop-blur-sm shadow-lg">
          <span className="text-xs font-mono text-purple-400">Next.js</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 -right-8 sm:-right-12"
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <div className="px-3 py-1.5 rounded-lg bg-[#0a0f1e]/90 border border-white/[0.1] backdrop-blur-sm shadow-lg">
          <span className="text-xs font-mono text-pink-400">UI/UX</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
