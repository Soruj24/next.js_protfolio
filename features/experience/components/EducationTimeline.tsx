"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MapPin, GraduationCap } from "lucide-react";

interface EducationItem {
  id?: string;
  degree: string;
  institution: string;
  period: string;
  location?: string;
  description?: string;
  highlights?: string[];
}

gsap.registerPlugin(ScrollTrigger);

interface EducationTimelineProps {
  education: EducationItem[];
}

export default function EducationTimeline({ education }: EducationTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".edu-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: 30, scale: 0.95 },
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
      <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500/50 via-pink-500/30 to-transparent" />

      {education.map((edu) => (
        <article
          key={edu.id}
          className="edu-card relative pl-12 group"
        >
          <div className="absolute left-3 top-5 w-3 h-3 rounded-full bg-purple-500 border-2 border-[#0a0f1e] shadow-[0_0_12px_rgba(168,85,247,0.5)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.8)] transition-shadow duration-300 z-10" />

          <div className="glass-card rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <div>
                <h4 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-purple-400" />
                  {edu.degree}
                </h4>
                <p className="text-purple-400 font-medium text-sm mt-1">
                  {edu.institution}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Calendar className="w-3 h-3" />
                {edu.period}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
              <MapPin className="w-3 h-3" />
              {edu.location}
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              {edu.description}
            </p>

            <ul className="space-y-2">
              {(edu.highlights || []).map((highlight, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-gray-300"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
