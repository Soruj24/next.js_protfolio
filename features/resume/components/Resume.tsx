"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "@/components/shared/SectionTitle";
import { Briefcase, GraduationCap, MapPin, Calendar, Loader2 } from "lucide-react";
import { usePortfolioSettings } from "@/hooks/usePortfolioSettings";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  role: string;
  company: string;
  year: string;
  period?: string;
  location?: string;
  description: string;
  technologies: string[];
}

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

export default function Resume() {
  const sectionRef = useRef<HTMLElement>(null);
  const { settings, loading } = usePortfolioSettings();
  const experiences: ExperienceItem[] = settings?.experiences || [];
  const raw = settings as unknown as Record<string, unknown> | null | undefined;
  const education: EducationItem[] = Array.isArray(raw?.educations) ? (raw!.educations as EducationItem[]) : [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".resume-item",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (loading) {
    return (
      <section className="py-20 flex items-center justify-center">
        <Loader2 size={24} className="text-gray-600 animate-spin" />
      </section>
    );
  }

  if (experiences.length === 0 && education.length === 0) return null;

  return (
    <section
      id="resume"
      ref={sectionRef}
      className="min-h-screen py-20 md:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle
          title="Resume"
          subtitle="A summary of professional experience and education."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Experience Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <Briefcase className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Experience</h3>
            </div>
            <div className="space-y-6">
              {experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="resume-item glass-card rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                  <p className="text-cyan-400 font-medium text-sm mt-1">
                    {exp.company}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-xs bg-white/5 text-gray-400 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <GraduationCap className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Education</h3>
            </div>
            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="resume-item glass-card rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300"
                >
                  <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                  <p className="text-purple-400 font-medium text-sm mt-1">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {edu.period}
                  </p>
                  {edu.description && (
                    <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
