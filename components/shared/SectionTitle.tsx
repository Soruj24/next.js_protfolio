"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
      const chars = titleRef.current?.querySelectorAll(".char");
      if (chars && chars.length > 0) {
        gsap.fromTo(
          chars,
          { opacity: 0, y: 30, rotateX: -60 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.015,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
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
    <div ref={containerRef} className="text-center mb-16 sm:mb-20 md:mb-24 relative">
      <h2
        ref={titleRef}
        className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 sm:mb-8 tracking-tighter leading-tight flex flex-wrap justify-center gap-x-[0.25em]"
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

      <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
        <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-r from-transparent to-cyan-500/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
        <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-l from-transparent to-cyan-500/40" />
      </div>

      <p
        ref={subtitleRef}
        className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light"
      >
        {subtitle}
      </p>
    </div>
  );
}

export default SectionTitle;
