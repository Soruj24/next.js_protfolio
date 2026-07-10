"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Clock,
  Users,
  BarChart3,
  Tag,
} from "lucide-react";
import { useProjectDetails } from "@/features/projects/hooks/useProjectDetails";
import { projects as localProjects } from "@/data/projects";
import Loading from "@/features/projects/components/Loading";
import ReadingProgressBar from "@/features/projects/components/detail/ReadingProgressBar";
import StickyTOC from "@/features/projects/components/detail/StickyTOC";
import ProblemSection from "@/features/projects/components/detail/ProblemSection";
import SolutionSection from "@/features/projects/components/detail/SolutionSection";
import ArchitectureSection from "@/features/projects/components/detail/ArchitectureSection";
import FolderStructureSection from "@/features/projects/components/detail/FolderStructureSection";
import TechDecisionsSection from "@/features/projects/components/detail/TechDecisionsSection";
import ChallengesSection from "@/features/projects/components/detail/ChallengesSection";
import CodeSnippetsSection from "@/features/projects/components/detail/CodeSnippetsSection";
import PerformanceSection from "@/features/projects/components/detail/PerformanceSection";
import AccessibilitySection from "@/features/projects/components/detail/AccessibilitySection";
import SEOSection from "@/features/projects/components/detail/SEOSection";
import ScreenshotsSection from "@/features/projects/components/detail/ScreenshotsSection";
import LessonsSection from "@/features/projects/components/detail/LessonsSection";
import FutureSection from "@/features/projects/components/detail/FutureSection";
import RelatedProjectsSection from "@/features/projects/components/detail/RelatedProjectsSection";

const tocItems = [
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "architecture", label: "Architecture" },
  { id: "folder-structure", label: "Folder Structure" },
  { id: "features", label: "Features" },
  { id: "tech-decisions", label: "Tech Decisions" },
  { id: "challenges", label: "Challenges" },
  { id: "code-snippets", label: "Code Snippets" },
  { id: "performance", label: "Performance" },
  { id: "accessibility", label: "Accessibility" },
  { id: "seo", label: "SEO" },
  { id: "screenshots", label: "Screenshots" },
  { id: "lessons", label: "Lessons Learned" },
  { id: "future", label: "Future" },
  { id: "related", label: "Related" },
];

export default function ProjectDetails() {
  const { id } = useParams();
  const { project, loading } = useProjectDetails(id);
  const [activeTocId, setActiveTocId] = useState(tocItems[0].id);

  // Filter TOC items based on available data
  const availableTocItems = tocItems.filter((item) => {
    if (!project) return false;
    switch (item.id) {
      case "problem": return !!project.problem;
      case "solution": return !!project.solution;
      case "architecture": return !!project.architecture;
      case "folder-structure": return !!project.folderStructure?.length;
      case "features": return !!project.features?.length;
      case "tech-decisions": return !!project.techDecisions?.length;
      case "challenges": return !!project.challenges?.length;
      case "code-snippets": return !!project.codeSnippets?.length;
      case "performance": return !!project.performance;
      case "accessibility": return !!project.accessibility?.length;
      case "seo": return !!project.seo?.length;
      case "screenshots": return !!project.screenshots?.length;
      case "lessons": return !!project.lessonsLearned?.length;
      case "future": return !!project.futureImprovements?.length;
      case "related": return localProjects.length > 1;
      default: return true;
    }
  });

  // Intersection Observer for active TOC
  useEffect(() => {
    if (!project) return;
    const observers: IntersectionObserver[] = [];

    availableTocItems.forEach(({ id: sectionId }) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveTocId(sectionId);
          }
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [project, availableTocItems]);

  if (loading) return <Loading />;
  if (!project) return null;

  return (
    <div className="min-h-screen bg-[#030014] text-white relative">
      <ReadingProgressBar />

      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero */}
      <div className="relative z-10 pt-8 pb-12 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10 group text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                {project.category}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                {project.difficulty}
              </span>
              {project.featured && (
                <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-5 leading-[1.1]">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-gray-400 text-base sm:text-lg max-w-3xl leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-[13px] text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                {typeof project.completionDate === "string"
                  ? new Date(project.completionDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                  : project.completionDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </div>
              <div className="flex items-center gap-2 text-[13px] text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                {project.duration}
              </div>
              <div className="flex items-center gap-2 text-[13px] text-gray-400">
                <Users className="w-3.5 h-3.5" />
                {project.teamSize}
              </div>
              <div className="flex items-center gap-2 text-[13px] text-gray-400">
                <BarChart3 className="w-3.5 h-3.5" />
                {project.stats?.views?.toLocaleString()} views
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-white text-sm font-semibold hover:bg-cyan-600 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              )}
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 relative aspect-[21/9] rounded-3xl overflow-hidden border border-white/[0.06]"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-40" />
          </motion.div>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-[11px] font-medium text-gray-400 hover:text-gray-300 hover:border-white/[0.1] transition-colors"
              >
                <Tag className="w-3 h-3" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content + TOC */}
      <div className="relative z-10 px-5 sm:px-8 pb-24">
        <div className="max-w-7xl mx-auto flex gap-16">
          {/* Main Content */}
          <div className="flex-1 min-w-0 max-w-3xl space-y-14">
            {project.problem && <ProblemSection problem={project.problem} />}
            {project.solution && <SolutionSection solution={project.solution} />}
            {project.architecture && <ArchitectureSection architecture={project.architecture} />}
            {project.folderStructure?.length && <FolderStructureSection folderStructure={project.folderStructure} />}

            {/* Features */}
            {project.features?.length && (
              <section id="features" className="scroll-mt-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <span className="text-cyan-400 text-sm">✦</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      Key Features
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.03 }}
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-[13px] text-gray-400"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 flex-shrink-0" />
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </section>
            )}

            {project.techDecisions?.length && <TechDecisionsSection techDecisions={project.techDecisions} />}
            {project.challenges?.length && project.solutions?.length && (
              <ChallengesSection challenges={project.challenges} solutions={project.solutions} />
            )}
            {project.codeSnippets?.length && <CodeSnippetsSection codeSnippets={project.codeSnippets} />}
            {project.performance && <PerformanceSection performance={project.performance} />}
            {project.accessibility?.length && <AccessibilitySection accessibility={project.accessibility} />}
            {project.seo?.length && <SEOSection seo={project.seo} />}
            {project.screenshots?.length && <ScreenshotsSection screenshots={project.screenshots} title={project.title} />}
            {project.lessonsLearned?.length && <LessonsSection lessonsLearned={project.lessonsLearned} />}
            {project.futureImprovements?.length && <FutureSection futureImprovements={project.futureImprovements} />}
            {localProjects.length > 1 && <RelatedProjectsSection currentId={project.id} allProjects={localProjects} />}
          </div>

          {/* Sidebar */}
          <StickyTOC items={availableTocItems} activeId={activeTocId} />
        </div>
      </div>
    </div>
  );
}
