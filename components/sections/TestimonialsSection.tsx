"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../ui/SectionTitle";
import TestimonialsBackground from "../testimonials/TestimonialsBackground";
import TestimonialCard from "../testimonials/TestimonialCard";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Alex Rivera",
    role: "CTO at TechFlow AI",
    content: "Soruj's expertise in LangChain and MCP servers is unparalleled. He transformed our manual workflows into a seamless autonomous ecosystem.",
    avatar: "AR",
    color: "from-cyan-500 to-blue-500"
  },
  {
    name: "Sarah Chen",
    role: "Product Manager at DataPulse",
    content: "Working with Soruj was a game-changer. His ability to architect complex AI solutions with such precision is truly impressive.",
    avatar: "SC",
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "James Wilson",
    role: "Lead Developer at CloudScale",
    content: "The custom AI agents Soruj built for us have increased our efficiency by 40%. Highly recommend him for any high-end AI project.",
    avatar: "JW",
    color: "from-green-500 to-emerald-500"
  }
];

function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={containerRef} className="py-32 relative overflow-hidden bg-[#020617]">
      <TestimonialsBackground />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionTitle
          title="Social Proof"
          subtitle="What industry leaders say about my AI architectural expertise."
        />

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
