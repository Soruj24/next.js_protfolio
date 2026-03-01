"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  GitBranch, 
  FileCode2, 
  Code2,
  TestTube2
} from "lucide-react";
import SectionTitle from "../ui/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, any> = {
  "🧪": <TestTube2 className="w-6 h-6 text-emerald-400" />,
  "🌿": <GitBranch className="w-6 h-6 text-blue-400" />,
  "💎": <Code2 className="w-6 h-6 text-purple-400" />,
  "📄": <FileCode2 className="w-6 h-6 text-orange-400" />,
};

const defaultStandards = [
  {
    title: "Component Excellence",
    description: "Building highly reusable, atomic components following the Compound Component and Render Props patterns for maximum flexibility.",
    icon: "💎",
    metrics: "High Reusability",
    features: ["Atomic Design", "Compound Components", "Custom Hooks"]
  },
  {
    title: "Performance First",
    description: "Optimizing for Core Web Vitals, implementing advanced code splitting, and ensuring 95+ Lighthouse scores for all production frontends.",
    icon: "🌿",
    metrics: "95+ Score",
    features: ["Core Web Vitals", "Image Optimization", "Code Splitting"]
  },
  {
    title: "Testing & Reliability",
    description: "Adopting TDD with Vitest, React Testing Library, and Playwright to ensure robust components and zero-regression deployments.",
    icon: "🧪",
    metrics: "90% Coverage",
    features: ["Component Testing", "E2E Testing", "Visual Regression"]
  },
  {
    title: "Design Systems",
    description: "Scaling UI development through robust design systems, Storybook documentation, and maintaining consistent design tokens.",
    icon: "📄",
    metrics: "Documented",
    features: ["Storybook", "Design Tokens", "TSDoc Documentation"]
  }
];

interface EngineeringStandardsProps {
  data?: any[];
}

export default function EngineeringStandards({ data }: EngineeringStandardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const displayData = data && data.length > 0 ? data : defaultStandards;

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [displayData]);

  return (
    <section id="standards" className="py-20 md:py-24 bg-black relative overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle title="Engineering Standards" subtitle="How I ensure production-grade reliability and maintainability" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-12 md:mt-16">
          {displayData.map((std, index) => (
            <div
              key={index}
              ref={(el) => { itemsRef.current[index] = el; }}
              className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-cyan-500/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 rounded-xl bg-zinc-800 group-hover:bg-cyan-500/10 transition-colors">
                  {iconMap[std.icon] || <Code2 className="w-6 h-6 text-cyan-400" />}
                </div>
                <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase bg-zinc-800/50 px-3 py-1 rounded-full border border-zinc-700">
                  {std.metrics}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                  {std.title}
              </h3>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                  {std.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {std.features.map((feature: string, fIndex: number) => (
                  <div key={fIndex} className="flex items-center text-xs text-zinc-500">
                    <div className="w-1 h-1 rounded-full bg-cyan-500 mr-2"></div>
                    {feature}
                  </div>
                ))}
              </div>
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
            <div className="w-px h-12 bg-white/10 mx-4"></div>
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
