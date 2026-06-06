"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../ui/SectionTitle";
import { defaultInnovationData } from "@/lib/sections/tech-innovation";
import InnovationCard from "./tech-innovation/InnovationCard";

gsap.registerPlugin(ScrollTrigger);

interface TechInnovationProps { data?: any[]; }

export default function TechInnovation({ data }: TechInnovationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const displayData = data && data.length > 0 ? data : defaultInnovationData;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".innovation-header", { y: 50, opacity: 0, duration: 1, scrollTrigger: { trigger: ".innovation-header", start: "top 80%" } });
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.from(card, { y: 60, opacity: 0, scale: 0.9, duration: 0.8, delay: index * 0.1, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" } });
        card.addEventListener("mouseenter", () => gsap.to(card, { y: -10, scale: 1.02, duration: 0.3, ease: "power2.out", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }));
        card.addEventListener("mouseleave", () => gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.in", boxShadow: "0 0px 0px rgba(0,0,0,0)" }));
      });
      gsap.to(".bg-particle", { y: "random(-20, 20)", x: "random(-20, 20)", duration: "random(2, 4)", repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.2 });
    }, containerRef);
    return () => ctx.revert();
  }, [displayData]);

  return (
    <section id="innovation" className="min-h-screen py-24 bg-[#0a0a1a] relative overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bg-particle absolute w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/5 to-cyan-500/5 blur-3xl" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="innovation-header mb-16">
          <SectionTitle title="Frontend Innovation" subtitle="Pushing the boundaries of web development through modern technologies and creative engineering." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayData.map((item, index) => (
            <InnovationCard
              key={index}
              item={item}
              index={index}
              cardRef={(el) => { cardsRef.current[index] = el; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
