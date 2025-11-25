 import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../ui/MagneticButton";
import StatCard from "../ui/StatCard";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function HomeSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleTl = gsap.timeline();
      titleTl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 100,
          rotationX: 90,
          scale: 0.5,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 2,
          ease: "back.out(1.7)",
        }
      );

      gsap.to(".floating-tech", {
        y: () => gsap.utils.random(-30, 30),
        x: () => gsap.utils.random(-15, 15),
        rotation: () => gsap.utils.random(-10, 10),
        duration: () => gsap.utils.random(3, 6),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      gsap.fromTo(
        ".char",
        {
          opacity: 0,
          y: 50,
          rotationX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(1.7)",
          delay: 1,
        }
      );

      if (ctaRef.current) {
        gsap.fromTo(
          Array.from(ctaRef.current.children),
          {
            opacity: 0,
            y: 50,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: "elastic.out(1, 0.8)",
            delay: 1.5,
          }
        );
      }

      gsap.to(".parallax-bg", {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".rotate-slow", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".rotate-fast", {
        rotation: -360,
        duration: 10,
        repeat: -1,
        ease: "none",
      });
    });

    return () => ctx.revert();
  }, []);

  // const technologies = [
  //   "LangChain",
  //   "MCP Server",
  //   "Next.js",
  //   "React",
  //   "Node.js",
  //   "TypeScript",
  //   "OpenAI",
  //   "MongoDB",
  // ];

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
      className="min-h-screen flex items-center justify-center relative overflow-hidden parallax-bg"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl rotate-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl rotate-fast"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl rotate-slow"></div>
      </div>

      <div
        ref={floatingElementsRef}
        className="absolute inset-0 pointer-events-none"
      >
        {/* {technologies.map((tech, index) => (
          <div
            key={tech}
            className="floating-tech absolute px-6 py-3 bg-white/5 backdrop-blur-lg rounded-2xl border border-cyan-500/30 text-cyan-400 font-semibold cursor-pointer hover:bg-cyan-500/20 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
            style={{
              left: `${15 + index * 10}%`,
              top: `${20 + index * 8}%`,
            }}
            onClick={() => {
              gsap.to(`.floating-tech:nth-child(${index + 1})`, {
                y: -100,
                opacity: 0,
                rotation: 180,
                duration: 0.8,
                ease: "back.in(1.7)",
              });
            }}
          >
            {tech}
          </div>
        ))} */}
      </div>

      <div className="text-center max-w-6xl mx-auto px-4 relative z-10">
        <h1
          ref={titleRef}
          className="text-7xl md:text-9xl font-bold mb-8 leading-tight"
        >
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            SORUJ
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            MAHMUD
          </span>
        </h1>

        <div
          ref={subtitleRef}
          className="text-3xl md:text-4xl text-gray-300 mb-8 font-light tracking-wide"
        >
          {splitText("LangChain Specialist & MCP Server Expert")}
        </div>

        <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Building{" "}
          <span className="text-cyan-400 font-semibold">
            AI-powered applications
          </span>{" "}
          with cutting-edge technologies. Specializing in{" "}
          <span className="text-blue-400 font-semibold">
            LangChain framework
          </span>
          ,
          <span className="text-purple-400 font-semibold">
            {" "}
            MCP server development
          </span>
          , and
          <span className="text-pink-400 font-semibold">
            {" "}
            custom AI tool integration
          </span>
          .
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <MagneticButton
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-12 py-6 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-110 transition-all duration-500 group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              🚀 View My Projects
              <span className="ml-2 group-hover:translate-x-2 transition-transform">
                →
              </span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </MagneticButton>

          <MagneticButton
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-12 py-6 border-2 border-cyan-500 text-cyan-400 rounded-2xl font-bold text-xl hover:bg-cyan-500 hover:text-white transform hover:scale-110 transition-all duration-500 group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              💬 Let&apos;s Collaborate
              <span className="ml-2 group-hover:translate-x-2 transition-transform">
                →
              </span>
            </span>
            <div className="absolute inset-0 bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </MagneticButton>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
          {[
            {
              number: "40+",
              label: "AI Projects",
              color: "from-cyan-400 to-blue-400",
            },
            {
              number: "100%",
              label: "LangChain Focus",
              color: "from-purple-400 to-pink-400",
            },
            {
              number: "24/7",
              label: "Learning Mindset",
              color: "from-green-400 to-emerald-400",
            },
          ].map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-cyan-400 text-sm font-light">
              Scroll to explore
            </span>
            <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center relative">
              <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .parallax-bg {
          background: linear-gradient(
            135deg,
            #0f172a 0%,
            #1e1b4b 25%,
            #1e3a8a 50%,
            #0369a1 75%,
            #0f172a 100%
          );
          background-size: 400% 400%;
        }
      `}</style>
    </section>
  );
}

export default HomeSection;