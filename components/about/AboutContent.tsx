import React, { forwardRef } from "react";

interface AboutContentProps {
  professionalTitle: string;
  fullName: string;
  expProfessional: string;
}

const AboutContent = forwardRef<HTMLDivElement, AboutContentProps>(
  ({ professionalTitle, fullName, expProfessional }, ref) => {
    return (
      <div ref={ref} className="space-y-8 order-2 lg:order-1">
        <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
          {professionalTitle}
        </div>

        <div className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
          <span className="text-white">I build </span>
          <span className="text-gradient">Intelligent Systems</span>
          <span className="text-white">
            {" "}
            that bridge the gap between imagination and reality.
          </span>
        </div>

        <div className="space-y-6 text-lg text-gray-400 leading-relaxed max-w-2xl">
          <p>
            Hello! I&apos;m{" "}
            <span className="text-white font-medium underline decoration-cyan-500/30 decoration-2 underline-offset-4">
              {fullName}
            </span>
            , a developer obsessed with the frontier of AI technology. I
            specialize in the
            <span className="text-cyan-400"> LangChain ecosystem</span> and
            <span className="text-purple-400"> MCP Server architecture</span>.
          </p>

          <p>
            {expProfessional} Whether it&apos;s custom AI agents or
            sophisticated data pipelines, I focus on creating seamless,
            high-performance solutions.
          </p>
        </div>
      </div>
    );
  }
);

AboutContent.displayName = "AboutContent";

export default AboutContent;
