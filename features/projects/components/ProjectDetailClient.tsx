"use client";

import BackButton from "@/components/shared/BackButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Github,
  Globe,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Clock,
  Users,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import TableOfContents from "./TableOfContents";
import ReadingProgress from "./ReadingProgress";
import ProblemSection from "./sections/ProblemSection";
import SolutionSection from "./sections/SolutionSection";
import ArchitectureSection from "./sections/ArchitectureSection";
import FolderStructureSection from "./sections/FolderStructureSection";
import FeaturesSection from "./sections/FeaturesSection";
import TechnicalChallengesSection from "./sections/TechnicalChallengesSection";
import PerformanceSection from "./sections/PerformanceSection";
import AccessibilitySection from "./sections/AccessibilitySection";
import SEOSection from "./sections/SEOSection";
import ScreenshotsSection from "./sections/ScreenshotsSection";
import CodeSnippetsSection from "./sections/CodeSnippetsSection";
import TechnologyDecisionsSection from "./sections/TechnologyDecisionsSection";
import LessonsSection from "./sections/LessonsSection";
import FutureImprovementsSection from "./sections/FutureImprovementsSection";
import { IFolderNode, ICodeSnippet, ITechDecision, IAccessibilityItem, ISEOItem, IPerformanceStats } from "@/types";
import RelatedProjectsSection from "./sections/RelatedProjectsSection";

interface AdjacentProject {
  id: string;
  title: string;
  slug: string;
}

interface AllProjectsItem {
  _id: string;
  title: string;
  category?: string;
  emoji?: string;
}

interface ProjectDetailClientProps {
  project: any;
  prev: AdjacentProject | null;
  next: AdjacentProject | null;
  allProjects: AllProjectsItem[];
}

export default function ProjectDetailClient({
  project,
  prev,
  next,
  allProjects,
}: ProjectDetailClientProps) {
  const tocItems = [
    ...(project.challenges?.length ? [{ id: "problem", label: "Problem" }] : []),
    ...(project.solutions?.length ? [{ id: "solution", label: "Solution" }] : []),
    ...(project.architecture ? [{ id: "architecture", label: "Architecture" }] : []),
    ...((project.folderStructure as IFolderNode[])?.length ? [{ id: "folder-structure", label: "Folder Structure" }] : []),
    ...(project.features?.length ? [{ id: "features", label: "Features" }] : []),
    ...((project.developmentHighlights as any[])?.length ? [{ id: "technical-challenges", label: "Tech Challenges" }] : []),
    ...(project.performance ? [{ id: "performance", label: "Performance" }] : []),
    ...((project.accessibility as IAccessibilityItem[])?.length ? [{ id: "accessibility", label: "Accessibility" }] : []),
    ...((project.seo as ISEOItem[])?.length ? [{ id: "seo", label: "SEO" }] : []),
    ...(project.screenshots?.length ? [{ id: "screenshots", label: "Screenshots" }] : []),
    ...((project.codeSnippets as ICodeSnippet[])?.length ? [{ id: "code-snippets", label: "Code Snippets" }] : []),
    ...((project.techDecisions as ITechDecision[])?.length ? [{ id: "tech-decisions", label: "Tech Decisions" }] : []),
    ...(project.lessonsLearned?.length ? [{ id: "lessons-learned", label: "Lessons Learned" }] : []),
    ...(project.futureImprovements?.length ? [{ id: "future-improvements", label: "Future Improvements" }] : []),
    ...(allProjects.length > 1 ? [{ id: "related-projects", label: "Related Projects" }] : []),
  ];

  const detailItems = [
    ...(project.stats?.completionTime
      ? [{ icon: Clock, label: "Duration", value: project.stats.completionTime }]
      : []),
    ...(project.stats?.teamSize
      ? [{ icon: Users, label: "Team", value: project.stats.teamSize }]
      : []),
    ...(project.stats?.complexity
      ? [{ icon: BarChart3, label: "Complexity", value: project.stats.complexity }]
      : []),
  ];

  return (
    <>
      <ReadingProgress />
      <main className="min-h-screen bg-[#020617] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20 relative z-10">
          {/* Back button */}
          <div className="mb-10">
            <BackButton fallbackUrl="/">
              <ArrowLeft className="w-4 h-4" />
            </BackButton>
          </div>

          <div className="flex gap-10">
            {/* Main content */}
            <div className="flex-1 min-w-0 max-w-4xl">
              {/* Hero card */}
              <div className="glass-card-premium rounded-3xl p-6 sm:p-10 mb-12">
                {project.image && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 75vw"
                    />
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <Badge
                      variant="outline"
                      className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-xs font-medium"
                    >
                      {project.category || "Project"}
                    </Badge>
                    {project.featured && (
                      <Badge
                        variant="outline"
                        className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs font-medium"
                      >
                        ★ Featured
                      </Badge>
                    )}
                    {(project as any).difficulty && (
                      <Badge
                        variant="outline"
                        className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-xs font-medium capitalize"
                      >
                        {(project as any).difficulty}
                      </Badge>
                    )}
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                    {(project as any).emoji && (
                      <span className="mr-3">{(project as any).emoji}</span>
                    )}
                    {project.title}
                  </h1>

                  <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-3xl">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-500 mb-8">
                    {(project as any).completionDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date((project as any).completionDate).getFullYear()}</span>
                      </div>
                    )}
                    {detailItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <item.icon className="w-4 h-4" />
                        <span>
                          {item.label}: <span className="text-gray-300">{item.value}</span>
                        </span>
                      </div>
                    ))}
                  </div>

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies.map((tech: string) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="bg-white/5 text-gray-300 border-white/10 text-xs font-medium hover:bg-white/10 hover:border-cyan-500/30 transition-all"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    {project.liveUrl && (
                      <Button asChild size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold">
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <Globe className="w-4 h-4 mr-2" />
                          Live Demo
                          <ExternalLink className="w-3.5 h-3.5 ml-2 opacity-70" />
                        </Link>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button asChild variant="outline" size="lg" className="bg-white/5 border-white/10 text-white hover:bg-white/10 font-semibold">
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </Link>
                      </Button>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Sections */}
              <div className="space-y-16">
                <ProblemSection challenges={project.challenges || []} />
                <SolutionSection solutions={project.solutions || []} />
                <ArchitectureSection architecture={project.architecture || ""} />
                <FolderStructureSection structure={(project.folderStructure as IFolderNode[]) || []} />
                <FeaturesSection features={project.features || []} />
                <TechnicalChallengesSection highlights={(project.developmentHighlights as any[]) || []} />
                <PerformanceSection performance={project.performance as IPerformanceStats} />
                <AccessibilitySection items={(project.accessibility as IAccessibilityItem[]) || []} />
                <SEOSection items={(project.seo as ISEOItem[]) || []} />
                <ScreenshotsSection screenshots={project.screenshots || []} title={project.title} />
                <CodeSnippetsSection snippets={(project.codeSnippets as ICodeSnippet[]) || []} />
                <TechnologyDecisionsSection decisions={(project.techDecisions as ITechDecision[]) || []} />
                <LessonsSection lessons={project.lessonsLearned || []} />
                <FutureImprovementsSection improvements={project.futureImprovements || []} />
                <RelatedProjectsSection currentId={project._id?.toString() || ""} projects={(allProjects || []).map((p) => ({ id: p._id, title: p.title, category: p.category || "", emoji: p.emoji }))} />
              </div>

              {/* Adjacent navigation */}
              <div className="mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
                <div className="flex-1">
                  {prev ? (
                    <Link
                      href={`/projects/${prev.id}`}
                      className="group flex items-center gap-3 p-5 rounded-2xl glass-card hover:border-cyan-500/30 transition-all duration-300"
                    >
                      <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                      <div className="overflow-hidden">
                        <p className="text-xs text-gray-500 mb-1">Previous Project</p>
                        <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors truncate">
                          {prev.title}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
                <div className="flex-1">
                  {next ? (
                    <Link
                      href={`/projects/${next.id}`}
                      className="group flex items-center justify-end gap-3 p-5 rounded-2xl glass-card hover:border-cyan-500/30 transition-all duration-300 text-right"
                    >
                      <div className="overflow-hidden">
                        <p className="text-xs text-gray-500 mb-1">Next Project</p>
                        <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors truncate">
                          {next.title}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </div>

            {/* Sticky TOC */}
            {tocItems.length > 0 && (
              <div className="hidden xl:block">
                <TableOfContents items={tocItems} />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
