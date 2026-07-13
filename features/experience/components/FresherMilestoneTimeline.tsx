"use client";
import { useRef, useEffect, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  Code2,
  BookOpen,
  Briefcase,
  Award,
  Trophy,
  GitFork,
  ChevronDown,
  Lightbulb,
  ExternalLink,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export interface Milestone {
  id: string;
  type: "project" | "opensource" | "learning" | "freelance" | "achievement" | "hackathon";
  title: string;
  description: string;
  technologies: string[];
  outcome: string;
  lessons: string[];
  date: string;
  link?: string;
}

interface FresherMilestoneTimelineProps {
  milestones: Milestone[];
}

const typeConfig: Record<string, { icon: ReactNode; gradient: string; shadowColor: string; label: string }> = {
  project: {
    icon: <Code2 className="w-4 h-4" />,
    gradient: "from-cyan-500 to-blue-600",
    shadowColor: "rgba(34,211,238,0.5)",
    label: "Personal Project",
  },
  opensource: {
    icon: <GitFork className="w-4 h-4" />,
    gradient: "from-purple-500 to-pink-600",
    shadowColor: "rgba(168,85,247,0.5)",
    label: "Open Source",
  },
  learning: {
    icon: <BookOpen className="w-4 h-4" />,
    gradient: "from-emerald-500 to-teal-600",
    shadowColor: "rgba(52,211,153,0.5)",
    label: "Learning Milestone",
  },
  freelance: {
    icon: <Briefcase className="w-4 h-4" />,
    gradient: "from-amber-500 to-orange-600",
    shadowColor: "rgba(251,191,36,0.5)",
    label: "Freelance Work",
  },
  achievement: {
    icon: <Award className="w-4 h-4" />,
    gradient: "from-rose-500 to-red-600",
    shadowColor: "rgba(244,63,94,0.5)",
    label: "Achievement",
  },
  hackathon: {
    icon: <Trophy className="w-4 h-4" />,
    gradient: "from-violet-500 to-indigo-600",
    shadowColor: "rgba(139,92,246,0.5)",
    label: "Hackathon",
  },
};

function MilestoneCard({ milestone, index }: { milestone: Milestone; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const config = typeConfig[milestone.type] || typeConfig.project;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          delay: index * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    return () => ctx.revert();
  }, [index]);

  return (
    <article
      ref={cardRef}
      className="group relative pl-14 sm:pl-16 opacity-0"
    >
      <div
        className={`absolute left-[18px] sm:left-5 top-6 w-3 h-3 rounded-full border-2 border-[#020617] z-10 transition-all duration-500`}
        style={{
          background: `linear-gradient(135deg, ${config.gradient.replace("from-", "").replace("to-", "").split(" ").map((s) => `var(--${s})`).join(", ")})`,
          boxShadow: `0 0 12px ${config.shadowColor}`,
        }}
      />

      <div
        className={`rounded-2xl p-5 sm:p-6 border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.06] cursor-pointer`}
        onClick={() => setExpanded(!expanded)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExpanded(!expanded); } }}
        aria-expanded={expanded}
      >
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span
              className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-white text-xs bg-gradient-to-br ${config.gradient}`}
            >
              {config.icon}
            </span>
            <span
              className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-md bg-white/5`}
              style={{ color: config.shadowColor.replace("0.5", "1") }}
            >
              {config.label}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 whitespace-nowrap">
            <Calendar className="w-3 h-3" />
            {milestone.date}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {milestone.title}
        </h3>

        <p className="text-sm text-gray-400 leading-relaxed mb-3 line-clamp-2">
          {milestone.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {milestone.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/5 text-gray-400 border border-white/5 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          {milestone.link && (
            <a
              href={milestone.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              View details
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          <div className={`flex items-center gap-1.5 text-xs text-gray-500 transition-all ${milestone.link ? "" : "ml-auto"}`}>
            <span>{expanded ? "Less" : "More"}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Outcome</h4>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{milestone.outcome}</p>
            </div>

            {milestone.lessons.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Lessons Learned</h4>
                </div>
                <ul className="space-y-1.5">
                  {milestone.lessons.map((lesson, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400/60 shrink-0" />
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function FresherMilestoneTimeline({ milestones }: FresherMilestoneTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!milestones?.length) return null;

  const sorted = [...milestones].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div ref={containerRef} className="relative">
      <div className="absolute left-[23px] sm:left-[25px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/40 via-purple-500/30 to-pink-500/20" />

      <div className="space-y-6 sm:space-y-8">
        {sorted.map((milestone, i) => (
          <MilestoneCard key={milestone.id} milestone={milestone} index={i} />
        ))}
      </div>
    </div>
  );
}
