import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import personalData from "@/data/Parsonal.json";
import HeroBackground from "../home/HeroBackground";
import HeroTitle from "../home/HeroTitle";
import HeroCTA from "../home/HeroCTA";
import HeroStats from "../home/HeroStats";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface HomeSectionProps {
  data?: any;
}

function HomeSection({ data }: HomeSectionProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayData = data || personalData;
  const personalInfo = displayData.personal_info || {};
  const expFocus = displayData.experience?.focus || "Specializing in Next.js, React, and crafting high-performance user interfaces.";
  const firstName = personalInfo.full_name?.split(" ")[0] || "SORUJ";
  const lastName = personalInfo.full_name?.split(" ").slice(1).join(" ") || "MAHMUD";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleTl = gsap.timeline();

      // Title Animation
      titleTl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 100,
          rotationX: 45,
          filter: "blur(20px)",
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "expo.out",
        }
      );

      // Char Animation for Subtitle
      gsap.fromTo(
        ".char",
        {
          opacity: 0,
          y: 20,
          filter: "blur(5px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.02,
          ease: "power2.out",
          delay: 0.5,
        }
      );

      // CTA buttons animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.children,
          {
            opacity: 0,
            y: 30,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            delay: 1,
          }
        );
      }

      // Floating animation for stats
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          delay: 1.2,
          ease: "power3.out",
        }
      );

      // Continuous slow float for background elements
      gsap.to(".float-element", {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        rotation: "random(-10, 10)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="min-h-screen md:min-h-[110vh] flex items-center justify-center relative overflow-hidden bg-[#020617] py-20 md:py-0"
    >
      <HeroBackground />

      <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-10 md:pt-20">
        <HeroTitle
          ref={titleRef}
          firstName={firstName}
          lastName={lastName}
          subtitle={expFocus}
          splitText={splitText}
        />

        <HeroCTA ref={ctaRef} />

        <HeroStats />
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-30">
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}

export default HomeSection;

