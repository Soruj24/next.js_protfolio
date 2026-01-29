"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

function SectionTitle({ title, subtitle }: SectionTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title characters animation
      const chars = titleRef.current?.querySelectorAll(".char");
      if (chars && chars.length > 0) {
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: 20,
            rotateX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.02,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [title]);

  return (
    <div ref={containerRef} className="text-center mb-24 relative">
      {/* Decorative Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 blur-sm"></div>
      
      <h2
        ref={titleRef}
        className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-tight flex flex-wrap justify-center gap-x-[0.2em]"
      >
        {title.split(" ").map((word, wordIndex) => (
          <span key={wordIndex} className="whitespace-nowrap inline-flex">
            {word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                className="char inline-block text-white"
                style={{ transformStyle: "preserve-3d" }}
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </h2>
      
      {/* Decorative Element */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500/50"></div>
        <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse"></div>
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
      </div>

      <p
        ref={subtitleRef}
        className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light"
      >
        {subtitle}
      </p>
    </div>
  );
}

export default SectionTitle;
