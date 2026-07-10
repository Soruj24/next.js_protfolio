"use client";
import React, { forwardRef } from "react";

interface AboutContentProps {
  professionalTitle: string;
  fullName: string;
  expProfessional: string;
}

const AboutContent = forwardRef<HTMLDivElement, AboutContentProps>(
  ({ professionalTitle, fullName, expProfessional }, ref) => {
    return (
      <div ref={ref} className="space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          {professionalTitle}
        </div>

        <div className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
          <span className="text-white">I Build </span>
          <span className="text-gradient-premium">Modern Web Interfaces</span>
          <span className="text-white">
            {" "}that bridge the gap between imagination and reality.
          </span>
        </div>

        <div className="space-y-5 text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl">
          <p>
            Hello! I&apos;m{" "}
            <span className="text-white font-semibold">
              {fullName}
            </span>
            , a developer obsessed with creating beautiful, high-performance
            user interfaces. I specialize in the{" "}
            <span className="text-cyan-400 font-medium">React ecosystem</span> and{" "}
            <span className="text-purple-400 font-medium">Modern CSS/Animations</span>.
          </p>

          <p>
            {expProfessional} Whether it&apos;s pixel-perfect UI or
            sophisticated frontend architecture, I focus on creating seamless,
            intuitive user experiences that make a real impact.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          {["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"].map(
            (tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] text-gray-400 border border-white/[0.06] hover:border-cyan-500/30 hover:text-cyan-400 transition-all duration-300"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </div>
    );
  }
);

AboutContent.displayName = "AboutContent";

export default AboutContent;
