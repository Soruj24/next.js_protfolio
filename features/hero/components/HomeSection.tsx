"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import personalData from "@/data/Personal.json";
import HeroBackground from "./HeroBackground";
import HeroTyping from "./HeroTyping";
import HeroCTA from "./HeroCTA";
import HeroSocial from "./HeroSocial";

interface HomeSectionProps {
  data?: Record<string, unknown>;
}

export default function HomeSection({ data }: HomeSectionProps) {
  const displayData = data || personalData;
  const pi = (displayData.personal_info || {}) as Record<string, string>;
  const exp = (displayData.experience || {}) as Record<string, string>;

  const firstName = (pi.full_name || "Soruj").split(" ")[0];
  const lastName = (pi.full_name || "Mahmud").split(" ").slice(1).join(" ") || "Mahmud";
  const tagline = exp.focus || "Building high-performance, accessible, and visually stunning user interfaces";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <HeroBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-28 sm:py-32 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">

          {/* ─── Left: Content ─── */}
          <div className="flex flex-col gap-8 lg:gap-10 order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-mono text-emerald-400/90 tracking-wider uppercase">
                  Available for Frontend Roles
                </span>
              </span>
            </motion.div>

            {/* Name */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-sm sm:text-base text-gray-500 font-light tracking-wide mb-3"
              >
                Hello, I&apos;m
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.9] tracking-tighter"
              >
                <span className="block text-white">{firstName}</span>
                <span
                  className="block text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4)",
                    backgroundSize: "300% 300%",
                    animation: "gradient-shift 8s ease infinite",
                  }}
                >
                  {lastName.toUpperCase()}
                </span>
              </motion.h1>
            </div>

            {/* Role typing */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light"
            >
              I&apos;m a&nbsp;
              <HeroTyping />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-lg"
            >
              {tagline}
            </motion.p>

            {/* CTAs + Social */}
            <div className="flex flex-col gap-5">
              <HeroCTA />
              <HeroSocial />
            </div>
          </div>

          {/* ─── Right: Profile ─── */}
          <div className="order-1 lg:order-2 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              {/* Glow */}
              <motion.div
                className="absolute inset-0 m-auto w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(6,182,212,0.1) 0%, rgba(139,92,246,0.05) 50%, transparent 70%)",
                  filter: "blur(50px)",
                }}
                animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Rotating dashed ring */}
              <motion.div
                className="absolute inset-0 m-auto w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] rounded-full border border-dashed border-white/[0.05]"
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              />

              {/* Dots on ring */}
              <motion.div
                className="absolute inset-0 m-auto w-[320px] h-[320px] sm:w-[360px] sm:h-[360px]"
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.7)]" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(139,92,246,0.7)]" />
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-pink-400 shadow-[0_0_12px_rgba(236,72,153,0.7)]" />
              </motion.div>

              {/* Static inner ring */}
              <div className="absolute inset-0 m-auto w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full border border-white/[0.06]" />

              {/* Photo */}
              <div className="relative w-[250px] h-[250px] sm:w-[280px] sm:h-[280px] mx-auto rounded-full overflow-hidden border border-white/[0.1] bg-[#0a0f1e]">
                <Image
                  src="/soruj.jpg"
                  alt="Soruj Mahmud"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 250px, 280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/20 via-transparent to-transparent" />
              </div>

              {/* Floating tech badges */}
              <motion.div
                className="absolute -top-1 right-4 sm:top-2 sm:right-8"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="px-3 py-1.5 rounded-lg bg-[#0a0f1e]/90 border border-white/[0.1] backdrop-blur-sm">
                  <span className="text-[11px] font-mono text-cyan-400">React</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-1 left-2 sm:bottom-4 sm:left-6"
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
              >
                <div className="px-3 py-1.5 rounded-lg bg-[#0a0f1e]/90 border border-white/[0.1] backdrop-blur-sm">
                  <span className="text-[11px] font-mono text-purple-400">Next.js</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-6 sm:-right-10 -translate-y-1/2"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              >
                <div className="px-3 py-1.5 rounded-lg bg-[#0a0f1e]/90 border border-white/[0.1] backdrop-blur-sm">
                  <span className="text-[11px] font-mono text-pink-400">UI/UX</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -left-6 sm:-left-10 -translate-y-1/2"
                animate={{ y: [0, 5, 0] }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              >
                <div className="px-3 py-1.5 rounded-lg bg-[#0a0f1e]/90 border border-white/[0.1] backdrop-blur-sm">
                  <span className="text-[11px] font-mono text-blue-400">TypeScript</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-gray-600 tracking-[0.2em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
