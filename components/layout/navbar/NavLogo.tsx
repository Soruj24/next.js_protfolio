"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NavLogo() {
  return (
    <Link href="/" className="relative group flex items-center gap-2.5" aria-label="Home">
      {/* Monogram */}
      <motion.div
        className="relative w-9 h-9 flex items-center justify-center rounded-lg overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative text-white font-bold text-sm tracking-tight">
          SM
        </span>
      </motion.div>

      {/* Wordmark */}
      <span className="hidden sm:flex items-baseline text-[15px] font-semibold tracking-tight text-white/80 group-hover:text-white transition-colors duration-300">
        soruj
        <span className="text-cyan-400 mx-[1px]">.</span>
        <span className="text-white/50 group-hover:text-white/70 transition-colors duration-300">dev</span>
      </span>
    </Link>
  );
}
