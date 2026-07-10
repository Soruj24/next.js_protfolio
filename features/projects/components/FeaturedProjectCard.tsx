"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ExternalLink,
  Github,
  BookOpen,
  ArrowUpRight,
  Layers,
  Zap,
  Check,
  ChevronRight,
} from "lucide-react";
import type { IProject } from "@/types";
import TechStack from "./TechStack";
import PerformanceBar from "./PerformanceBar";

interface FeaturedProjectCardProps {
  project: IProject;
  index: number;
}

export default function FeaturedProjectCard({
  project,
  index,
}: FeaturedProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const projectId = project._id || project.id;

  const openLink = (e: React.MouseEvent, url?: string) => {
    e.stopPropagation();
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const goToCaseStudy = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/projects/${projectId}`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-3xl overflow-hidden bg-[#080c15] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
    >
      {/* Premium Glow Effect */}
      <div
        className={`absolute -inset-px rounded-3xl bg-gradient-to-b from-cyan-500/20 via-transparent to-purple-500/20 opacity-0 transition-opacity duration-500 ${
          isHovered ? "opacity-100" : ""
        }`}
      />
      <div
        className={`absolute -inset-px rounded-3xl bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 ${
          isHovered ? "opacity-0" : "opacity-100"
        } transition-opacity duration-500`}
      />

      <div className="relative bg-[#080c15] rounded-3xl overflow-hidden">
        {/* ── Hero Image ── */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-700 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          />

          {/* Image Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080c15] via-[#080c15]/40 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/80">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-3 py-1.5 bg-amber-500/20 backdrop-blur-xl border border-amber-500/30 rounded-xl text-[10px] font-bold uppercase tracking-widest text-amber-400">
                  Featured
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl text-[10px] font-bold text-white/60">
                {project.duration}
              </span>
            </div>
          </div>

          {/* Hover Action Buttons */}
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-5 left-5 right-5 flex items-center gap-2"
          >
            {project.githubUrl && (
              <button
                onClick={(e) => openLink(e, project.githubUrl)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-xs font-semibold text-white hover:bg-white/20 transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </button>
            )}
            {project.liveUrl && (
              <button
                onClick={(e) => openLink(e, project.liveUrl)}
                className="flex items-center gap-2 px-4 py-2.5 bg-cyan-500/20 backdrop-blur-xl border border-cyan-500/30 rounded-xl text-xs font-semibold text-cyan-400 hover:bg-cyan-500/30 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </button>
            )}
            <button
              onClick={goToCaseStudy}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/10 transition-all ml-auto"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Case Study
            </button>
          </motion.div>
        </div>

        {/* ── Content Body ── */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Title + Description */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors duration-300 leading-tight">
                {project.title}
              </h3>
              <motion.div
                animate={{ rotate: isHovered ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 mt-1"
              >
                <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-cyan-400 transition-colors" />
              </motion.div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                Tech Stack
              </span>
            </div>
            <TechStack technologies={project.technologies} compact />
          </div>

          {/* Problem Solved */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                Problem Solved
              </span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
              {project.fullDescription}
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
              Key Features
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {project.features.slice(0, 4).map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-cyan-400" />
                  </div>
                  <span className="text-[11px] text-gray-500 truncate">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Summary */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                Architecture
              </span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">
              {project.architecture}
            </p>
          </div>

          {/* Performance Highlights */}
          {project.performance && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                  Performance
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {project.performance.loadTime != null && (
                  <PerformanceBar
                    label="Speed"
                    value={project.performance.loadTime}
                    delay={0}
                  />
                )}
                {project.performance.interactivity != null && (
                  <PerformanceBar
                    label="Interactive"
                    value={project.performance.interactivity}
                    delay={0.1}
                  />
                )}
                {project.performance.seo != null && (
                  <PerformanceBar
                    label="SEO"
                    value={project.performance.seo}
                    delay={0.2}
                  />
                )}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          {/* Footer Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[11px] text-gray-600">
              <span>{project.teamSize}</span>
              <span className="w-1 h-1 rounded-full bg-gray-700" />
              <span>{project.difficulty}</span>
            </div>
            <button
              onClick={goToCaseStudy}
              className="flex items-center gap-1 text-[11px] font-semibold text-cyan-400/70 hover:text-cyan-400 transition-colors group/study"
            >
              Read case study
              <ChevronRight className="w-3 h-3 group-hover/study:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
