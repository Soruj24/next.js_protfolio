"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ExternalLink,
  GitBranch,
  Star,
  Users,
  Code2,
  Loader2,
} from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { useGitHubData } from "@/features/admin/hooks/useGitHubMcp";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  icon: React.ElementType;
  color: string;
}

export default function GitHubStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const { profile, repos, loading } = useGitHubData();
console.log("repo",repos)
  const stats: StatItem[] = [
    {
      label: "Projects Completed",
      value: repos.filter((r) => !r.fork).length,
      suffix: "+",
      icon: Code2,
      color: "text-cyan-400",
    },
    {
      label: "GitHub Stars",
      value: profile?.stars ?? 0,
      suffix: "+",
      icon: Star,
      color: "text-amber-400",
    },
    {
      label: "Repositories",
      value: profile?.publicRepos ?? 0,
      suffix: "+",
      icon: GitBranch,
      color: "text-purple-400",
    },
    {
      label: "Followers",
      value: profile?.followers ?? 0,
      suffix: "",
      icon: Users,
      color: "text-emerald-400",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gh-stat",
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const username = profile?.username || "Soruj24";

  return (
    <section
      id="github"
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden scroll-mt-20 sm:scroll-mt-28"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-950/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle
          title="GitHub Activity"
          subtitle="Open-source contributions, personal projects, and continuous learning reflected through code."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="glass-card-premium rounded-2xl p-6 sm:p-8 text-center animate-pulse"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] mx-auto mb-4" />
                  <div className="h-8 w-20 bg-white/5 rounded mx-auto mb-2" />
                  <div className="h-4 w-24 bg-white/5 rounded mx-auto" />
                </div>
              ))
            : stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="gh-stat glass-card-premium rounded-2xl p-6 sm:p-8 text-center group cursor-default"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <p className="text-3xl sm:text-4xl font-black text-white mb-2">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                      />
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl glass-card-premium group"
          >
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
              View GitHub Profile
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
          </Link>
        </div>
      </div>
    </section>
  );
}
