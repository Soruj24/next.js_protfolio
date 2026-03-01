"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, Rocket, Shield, Cpu, Zap, Globe } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, any> = {
  "🤖": <Cpu className="w-8 h-8 text-cyan-400" />,
  "🚀": <Rocket className="w-8 h-8 text-purple-400" />,
  "⚡": <Zap className="w-8 h-8 text-yellow-400" />,
  "🛡️": <Shield className="w-8 h-8 text-green-400" />,
  "🌐": <Globe className="w-8 h-8 text-blue-400" />,
  "💡": <Lightbulb className="w-8 h-8 text-red-400" />,
};

const colorMap: Record<string, { color: string, border: string }> = {
  cyan: { color: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/30" },
  purple: { color: "from-purple-500/20 to-pink-500/20", border: "border-purple-500/30" },
  yellow: { color: "from-yellow-500/20 to-orange-500/20", border: "border-yellow-500/30" },
  green: { color: "from-green-500/20 to-emerald-500/20", border: "border-green-500/30" },
  blue: { color: "from-blue-500/20 to-indigo-500/20", border: "border-blue-500/30" },
  red: { color: "from-red-500/20 to-rose-500/20", border: "border-red-500/30" },
};

const defaultInnovationData = [
  {
    title: "Modern Frontend Stack",
    description: "Leveraging the power of Next.js 14, React 18, and TypeScript to build type-safe, high-performance web applications.",
    icon: "🤖",
    color: "cyan",
  },
  {
    title: "Immersive UI/UX",
    description: "Creating captivating digital experiences using GSAP, Framer Motion, and Three.js for smooth, meaningful interactions.",
    icon: "🚀",
    color: "purple",
  },
  {
    title: "Performance Engineering",
    description: "Deep-diving into Core Web Vitals and edge computing to deliver lightning-fast, SEO-optimized user experiences globally.",
    icon: "⚡",
    color: "yellow",
  },
  {
    title: "Accessible Design",
    description: "Implementing WCAG 2.1 standards and semantic HTML to ensure inclusive digital products for all users.",
    icon: "🛡️",
    color: "green",
  },
  {
    title: "Atomic Architecture",
    description: "Building scalable design systems and reusable component libraries that speed up development and maintain consistency.",
    icon: "🌐",
    color: "blue",
  },
  {
    title: "Future of Web",
    description: "Exploring the potential of WebGL, WebAssembly, and PWAs to push the boundaries of what's possible in the browser.",
    icon: "💡",
    color: "red",
  }
];

interface TechInnovationProps {
  data?: any[];
}

export default function TechInnovation({ data }: TechInnovationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const displayData = data && data.length > 0 ? data : defaultInnovationData;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(".innovation-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".innovation-header",
          start: "top 80%",
        }
      });

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            y: 60,
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          });

          // Hover effect setup
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -10,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.in",
              boxShadow: "0 0px 0px rgba(0,0,0,0)"
            });
          });
        }
      });

      // Floating particles background animation
      gsap.to(".bg-particle", {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, [displayData]);

  return (
    <section
      id="innovation"
      className="min-h-screen py-24 bg-[#0a0a1a] relative overflow-hidden"
      ref={containerRef}
    >
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="bg-particle absolute w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/5 to-cyan-500/5 blur-3xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="innovation-header mb-16">
          <SectionTitle
            title="Frontend Innovation"
            subtitle="Pushing the boundaries of web development through modern technologies and creative engineering."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayData.map((item, index) => {
            const theme = colorMap[item.color] || colorMap.cyan;
            return (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                onClick={() => {
                  const el = document.getElementById("case-studies");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`p-8 rounded-2xl bg-gradient-to-br ${theme.color} border ${theme.border} backdrop-blur-xl transition-all duration-300 group cursor-pointer`}
              >
                <div className="mb-6 p-4 rounded-xl bg-gray-900/50 w-fit group-hover:scale-110 transition-transform duration-300">
                  {iconMap[item.icon] || <Lightbulb className="w-8 h-8 text-cyan-400" />}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {item.description}
                </p>
                
                <div 
                  className="mt-8 flex items-center text-sm font-semibold text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity hover:text-cyan-400"
                >
                  <span>Explore More</span>
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
