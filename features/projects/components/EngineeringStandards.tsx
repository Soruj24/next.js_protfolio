"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "@/components/shared/SectionTitle";
import StandardCard from "./StandardCard";

gsap.registerPlugin(ScrollTrigger);

interface EngineeringStandardsProps { data?: any[]; }

export default function EngineeringStandards({ data }: EngineeringStandardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const displayData = data || [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.from(item, { opacity: 0, y: 50, duration: 0.8, delay: index * 0.2, scrollTrigger: { trigger: item, start: "top 85%" } });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [displayData]);

  return (
    <section id="standards" className="py-20 md:py-24 bg-black relative overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle title="Engineering Standards" subtitle="How I ensure production-grade reliability and maintainability" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-12 md:mt-16">
          {displayData.map((std, index) => (
            <div key={index} ref={(el) => { itemsRef.current[index] = el; }}>
              <StandardCard std={std} />
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-cyan-900/20 via-blue-900/20 to-purple-900/20 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="text-xl font-bold text-white mb-2">Ready for Enterprise Challenges</h4>
            <p className="text-zinc-400">I build applications that are not just functional, but reliable, secure, and ready for scale.</p>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-cyan-400">100%</span>
              <span className="text-xs text-zinc-500 uppercase tracking-widest">Type Safety</span>
            </div>
            <div className="w-px h-12 bg-white/10 mx-4" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-purple-400">A+</span>
              <span className="text-xs text-zinc-500 uppercase tracking-widest">Security</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
