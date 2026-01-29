"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../ui/SectionTitle";
import { ArrowRight, Terminal, Cpu, Zap, BarChart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const defaultCaseStudies = [
  {
    title: "High-Performance E-commerce Platform",
    description: "Built a modern e-commerce storefront using Next.js 14, focusing on speed and user experience.",
    challenge: "Managing complex state across multiple filters while maintaining under 200ms TTFB and perfect Lighthouse scores.",
    solution: "Leveraged Next.js Server Components for data fetching, implemented optimistic updates for cart actions, and used edge caching.",
    impact: "Achieved 100/100 Lighthouse score, 40% increase in mobile conversion, and 50% faster page loads.",
    technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Stripe"],
    image: "/case-studies/ecommerce-platform.jpg"
  },
  {
    title: "Enterprise Design System",
    description: "Architected and implemented a scalable UI component library for a large-scale enterprise application.",
    challenge: "Ensuring design consistency across 50+ internal tools while maintaining accessibility and developer flexibility.",
    solution: "Developed an Atomic Design based library with Radix UI primitives, documented using Storybook and TSDoc.",
    impact: "Reduced UI development time by 60%, ensured 100% WCAG compliance, and unified brand identity across all platforms.",
    technologies: ["React", "Radix UI", "Tailwind CSS", "Storybook", "Jest"],
    image: "/case-studies/design-system.jpg"
  }
];

interface CaseStudyProps {
  data?: any[];
}

export default function TechnicalCaseStudies({ data }: CaseStudyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const displayData = data && data.length > 0 ? data : defaultCaseStudies;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".case-studies-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".case-studies-header",
          start: "top 80%",
        }
      });

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [displayData]);

  return (
    <section id="case-studies" ref={containerRef} className="py-20 md:py-32 relative overflow-hidden bg-slate-950">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="case-studies-header">
          <SectionTitle 
            title="Technical Case Studies" 
            subtitle="Deep dives into complex architectural solutions and high-performance frontend systems."
          />
        </div>

        <div className="mt-16 md:mt-24 space-y-20 md:space-y-32">
          {displayData.map((study, index) => (
            <div 
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 md:gap-12 items-center`}
            >
              {/* Image Container */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-slate-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-slate-700 opacity-20 group-hover:opacity-30 transition-opacity">
                    <Cpu size={120} />
                  </div>
                  {/* Overlay content for image */}
                  <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20">
                    <div className="flex flex-wrap gap-2">
                      {study.technologies.map((tech: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-medium bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-cyan-400">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] md:text-xs font-semibold uppercase tracking-wider">
                  <Terminal size={14} /> Case Study #{index + 1}
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  {study.title}
                </h3>
                <p className="text-base md:text-lg text-slate-400 leading-relaxed">
                  {study.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-6 pt-4 md:pt-6">
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex items-center gap-2 text-red-400 font-semibold text-xs md:text-sm uppercase tracking-wider">
                      <Zap size={16} /> The Challenge
                    </div>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs md:text-sm uppercase tracking-wider">
                      <Cpu size={16} /> The Solution
                    </div>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                      {study.solution}
                    </p>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs md:text-sm uppercase tracking-wider">
                      <BarChart size={16} /> The Impact
                    </div>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                      {study.impact}
                    </p>
                  </div>
                </div>

                <div className="pt-6 md:pt-8">
                  <button className="group flex items-center gap-2 text-white text-sm md:text-base font-semibold hover:text-cyan-400 transition-colors">
                    View Full Architecture Details <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
