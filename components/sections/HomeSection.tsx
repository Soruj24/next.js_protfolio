import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DynamicResume from "../ui/DynamicResume";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function HomeSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
      className="min-h-[110vh] flex items-center justify-center relative overflow-hidden bg-[#020617]"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none noise-bg">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] float-element" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] float-element" />
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-blue-500/5 rounded-full blur-[80px] float-element" />

        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      </div>

      <div className="text-center max-w-7xl mx-auto px-4 relative z-10 pt-20">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
            Available for new AI ventures
          </span>
        </div>

        <h1
          ref={titleRef}
          className="text-[clamp(3rem,10vw,8rem)] font-black mb-8 leading-[0.9] tracking-tight text-white"
        >
          <span className="block opacity-40">EVOLVING THE</span>
          <span className="text-gradient block drop-shadow-[0_0_50px_rgba(6,182,212,0.3)]">
            AI FRONTIER
          </span>
        </h1>

        <div
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-400 mb-12 font-medium tracking-wide max-w-3xl mx-auto leading-relaxed"
        >
          {splitText(
            "Specializing in LangChain, MCP Servers, and Autonomous Agentic Workflows."
          )}
        </div>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24"
        >
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative px-10 py-5 bg-white text-black rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-cyan-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity" />
            <span className="relative flex items-center">
              Explore Intelligence
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </span>
          </button>

          <DynamicResume />

          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Connect Neural Link
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto border-t border-white/5 pt-12">
          <div className="stat-card group p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
            <div className="text-4xl font-black text-white mb-1 group-hover:text-cyan-400 transition-colors">
              15+
            </div>
            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
              Neural Models
            </div>
          </div>
          <div className="stat-card group p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
            <div className="text-4xl font-black text-white mb-1 group-hover:text-purple-400 transition-colors">
              99%
            </div>
            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
              Accuracy Rate
            </div>
          </div>
          <div className="stat-card group p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
            <div className="text-4xl font-black text-white mb-1 group-hover:text-blue-400 transition-colors">
              50+
            </div>
            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
              Agent Workflows
            </div>
          </div>
          <div className="stat-card group p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
            <div className="text-4xl font-black text-white mb-1 group-hover:text-pink-400 transition-colors">
              24/7
            </div>
            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
              Active R&D
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-30">
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}

export default HomeSection;
