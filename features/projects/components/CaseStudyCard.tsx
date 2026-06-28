"use client";
import { ArrowRight, Terminal, Cpu, Zap, BarChart } from "lucide-react";

interface CaseStudyCardProps {
  study: {
    title: string; description: string; challenge: string; solution: string;
    impact: string; technologies: string[]; image: string;
  };
  index: number;
}

export default function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  return (
    <div className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 md:gap-12 items-center`}>
      <div className="w-full lg:w-1/2 relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-slate-900">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
          <div className="absolute inset-0 flex items-center justify-center text-slate-700 opacity-20 group-hover:opacity-30 transition-opacity"><Cpu size={120} /></div>
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20">
            <div className="flex flex-wrap gap-2">
              {study.technologies.map((tech: string, i: number) => (
                <span key={i} className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-medium bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-cyan-400">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] md:text-xs font-semibold uppercase tracking-wider">
          <Terminal size={14} /> Case Study #{index + 1}
        </div>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">{study.title}</h3>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed">{study.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-6 pt-4 md:pt-6">
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center gap-2 text-red-400 font-semibold text-xs md:text-sm uppercase tracking-wider"><Zap size={16} /> The Challenge</div>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{study.challenge}</p>
          </div>
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs md:text-sm uppercase tracking-wider"><Cpu size={16} /> The Solution</div>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{study.solution}</p>
          </div>
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs md:text-sm uppercase tracking-wider"><BarChart size={16} /> The Impact</div>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{study.impact}</p>
          </div>
        </div>

        <div className="pt-6 md:pt-8">
          <button className="group flex items-center gap-2 text-white text-sm md:text-base font-semibold hover:text-cyan-400 transition-colors">
            View Full Architecture Details <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
