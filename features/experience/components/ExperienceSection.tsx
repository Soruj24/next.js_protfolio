"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "@/components/shared/SectionTitle";
import { usePortfolioSettings } from "@/hooks/usePortfolioSettings";

gsap.registerPlugin(ScrollTrigger);

const defaultExperiences = [
  {
    role: "Frontend Developer",
    company: "Freelance / Self-Employed",
    year: "2025",
    description: "Building high-performance web applications using Next.js, React, and TypeScript. Delivering pixel-perfect, accessible UI components for clients.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    role: "Open Source Contributor",
    company: "GitHub Community",
    year: "2024",
    description: "Contributed TypeScript type definitions, bug fixes, and documentation improvements to several open-source React and Node.js projects.",
    technologies: ["TypeScript", "Node.js", "Git", "CI/CD"],
  },
  {
    role: "Full-Stack Developer — E-Commerce Platform",
    company: "Personal Project",
    year: "2024",
    description: "Designed and built a full-featured e-commerce platform with Next.js, including payment integration with Stripe, admin dashboard, and real-time inventory management.",
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Stripe", "Tailwind CSS"],
  },
  // {
  //   role: "Computer Science Foundations",
  //   company: "Harvard CS50x",
  //   year: "2023",
  //   description: "Completed Harvard's CS50x covering algorithms, data structures, memory management, web development, and cybersecurity fundamentals.",
  //   technologies: ["C", "Python", "SQL", "JavaScript", "Flask"],
  // },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { settings } = usePortfolioSettings();
  const experiences = settings?.experiences?.length ? settings.experiences : defaultExperiences;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-tab",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
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

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen py-20 md:py-32 relative overflow-hidden scroll-mt-20 sm:scroll-mt-28"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle
          title="Experience"
          subtitle="A journey of continuous growth, building expertise in modern frontend technologies."
        />

        <div className="mt-16 space-y-6">
          {experiences.map((exp: any, idx: number) => (
            <div key={idx} className="glass-card rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-500">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div>
                  <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                  <span className="text-cyan-400 font-medium text-sm">{exp.company}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {exp.year}
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-3">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {(exp.technologies || []).map((tech: string) => (
                  <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-gray-400 border border-white/5">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
