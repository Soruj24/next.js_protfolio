"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ExperienceItem } from "@/data/experience";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".exp-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: -30, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative space-y-6">
      <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/50 via-blue-500/30 to-transparent" />

      {experiences.map((exp) => (
        <article
          key={exp.id}
          className="exp-card relative pl-12 group"
        >
          <div className="absolute left-3 top-5 w-3 h-3 rounded-full bg-cyan-500 border-2 border-[#0a0f1e] shadow-[0_0_12px_rgba(34,211,238,0.5)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-shadow duration-300 z-10" />

          <div className="glass-card rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <div>
                <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {exp.role}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 font-medium text-sm flex items-center gap-1 hover:underline"
                    >
                      {exp.company}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-cyan-400 font-medium text-sm">
                      {exp.company}
                    </span>
                  )}
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Calendar className="w-3 h-3" />
                {exp.period}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
              <MapPin className="w-3 h-3" />
              {exp.location}
              <span className="mx-1 text-gray-600">|</span>
              <span className="capitalize">{exp.type}</span>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              {exp.description}
            </p>

            <ul className="space-y-2 mb-4">
              {exp.achievements.map((achievement, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-gray-300"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                  {achievement}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-gray-400 border border-white/5 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
