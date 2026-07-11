"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 1.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function HeroCTA() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col sm:flex-row gap-3 sm:gap-4"
    >
      {/* Primary: View Projects */}
      <motion.button
        variants={item}
        onClick={() => scrollTo("projects")}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.97 }}
        className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl
          bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm
          shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]
          transition-shadow duration-500 overflow-hidden"
      >
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="relative flex items-center gap-2">
          View Projects
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
        </span>
      </motion.button>

      {/* Secondary: Download Resume */}
      <motion.button
        variants={item}
        onClick={() => window.open("/resume", "_blank")}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.97 }}
        className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl
          bg-white/[0.06] border border-white/[0.1] text-white font-semibold text-sm
          hover:bg-white/[0.1] hover:border-white/[0.2]
          transition-all duration-300 backdrop-blur-sm"
      >
        <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
        <span>Download Resume</span>
      </motion.button>

      {/* Tertiary: Hire Me */}
      <motion.button
        variants={item}
        onClick={() => scrollTo("contact")}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.97 }}
        className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl
          bg-white/[0.06] border border-white/[0.1] text-white font-semibold text-sm
          hover:bg-white/[0.1] hover:border-white/[0.2]
          transition-all duration-300 backdrop-blur-sm"
      >
        <Mail className="w-4 h-4" />
        <span>Hire Me</span>
      </motion.button>
    </motion.div>
  );
}
