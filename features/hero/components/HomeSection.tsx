"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import HeroBackground from "./HeroBackground";
import HeroTyping from "./HeroTyping";
import HeroCTA from "./HeroCTA";
import HeroSocial from "./HeroSocial";
import { usePortfolioSettings } from "@/hooks/usePortfolioSettings";

export default function HomeSection() {
  const { settings } = usePortfolioSettings();
  const pi = settings?.personal_info;
  const profile = settings?.profile;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-20 sm:scroll-mt-28"
    >
      <HeroBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 md:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {profile?.availability === "available" ? "Available for Work" : profile?.availability || "Available for Work"}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 leading-[1.1]"
            >
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {pi?.full_name || "Soruj Mahmud"}
              </span>
            </motion.h1>

            {/* Typing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl sm:text-2xl md:text-3xl font-medium mb-6 h-12"
            >
              <HeroTyping />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              {settings?.experience?.professional_experience ||
                profile?.bio ||
                "Building high-performance, accessible web applications with modern frontend technologies."}
            </motion.p>

            {/* CTA + Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center gap-4 lg:justify-start justify-center"
            >
              <HeroCTA />
              <HeroSocial />
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-3xl animate-pulse" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 blur-2xl" />
              <Image
                src={profile?.avatar || "/soruj.jpg"}
                alt={pi?.full_name || "Profile"}
                fill
                className="object-cover rounded-full relative z-10"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="text-xs text-gray-500 font-medium uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
