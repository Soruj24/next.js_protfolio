"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../ui/SectionTitle";

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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionTitle
          title="Social Proof"
          subtitle="What industry leaders say about my AI architectural expertise."
        />

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card group p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-cyan-500/50 transition-all duration-500 backdrop-blur-3xl hover:bg-white/[0.05]"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-bold text-lg">{t.name}</div>
                  <div className="text-cyan-400 text-sm font-mono">{t.role}</div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed italic text-lg">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="mt-6 flex text-yellow-500">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
