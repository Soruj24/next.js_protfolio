"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "@/components/shared/SectionTitle";
import CaseStudyCard from "./CaseStudyCard";

gsap.registerPlugin(ScrollTrigger);

interface TechnicalCaseStudiesProps { data?: any[]; }

export default function TechnicalCaseStudies({ data }: TechnicalCaseStudiesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const displayData = data || [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".case-studies-header", { y: 50, opacity: 0, duration: 1, scrollTrigger: { trigger: ".case-studies-header", start: "top 80%" } });
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.from(card, { x: index % 2 === 0 ? -100 : 100, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 80%", toggleActions: "play none none reverse" } });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [displayData]);

  return (
    <section id="case-studies" ref={containerRef} className="py-20 md:py-32 relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="case-studies-header">
          <SectionTitle title="Technical Case Studies" subtitle="Deep dives into complex architectural solutions and high-performance frontend systems." />
        </div>

        <div className="mt-12 sm:mt-16 md:mt-24 space-y-14 sm:space-y-20 md:space-y-32">
          {displayData.map((study, index) => (
            <div key={index} ref={(el) => { cardsRef.current[index] = el; }}>
              <CaseStudyCard study={study} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
