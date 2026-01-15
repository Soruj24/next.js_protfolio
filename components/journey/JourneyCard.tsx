import React, { forwardRef } from "react";
import { gsap } from "gsap";

interface Experience {
  year: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
  icon: string;
  color: string;
}

interface JourneyCardProps {
  exp: Experience;
  index: number;
}

const JourneyCard = forwardRef<HTMLDivElement, JourneyCardProps>(
  ({ exp, index }, ref) => {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      if (!card) return;

      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-700 group hover:shadow-[0_0_50px_rgba(6,182,212,0.1)] relative overflow-hidden"
      >
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-cyan-500/10 blur-[80px] group-hover:bg-cyan-500/20 transition-all duration-700" />

        <div className="flex items-start mb-6 relative z-10">
          <div
            className={`w-16 h-16 bg-gradient-to-br ${exp.color} rounded-2xl flex items-center justify-center text-3xl mr-5 group-hover:scale-110 transition-transform duration-500 border border-white/10 shadow-xl`}
          >
            <span className="drop-shadow-lg">{exp.icon}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-1">
              <span className="text-cyan-400 font-mono font-bold text-sm tracking-wider">
                {exp.year}
              </span>
              <span className="h-px w-8 bg-cyan-500/30"></span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">
              {exp.role}
            </h3>
            <div className="text-gray-400 font-medium">{exp.company}</div>
          </div>
        </div>

        <p className="text-gray-400 mb-8 leading-relaxed text-base font-medium relative z-10">
          {exp.description}
        </p>

        <div className="flex flex-wrap gap-2 relative z-10">
          {exp.technologies.map((tech) => (
            <span
              key={tech}
              className="px-4 py-1.5 bg-white/5 rounded-xl text-xs font-semibold text-cyan-300 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    );
  }
);

JourneyCard.displayName = "JourneyCard";

export default JourneyCard;
