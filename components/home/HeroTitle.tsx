import React, { forwardRef } from "react";

interface HeroTitleProps {
  firstName: string;
  lastName: string;
  subtitle: string;
  splitText: (text: string) => React.ReactNode[];
}

const HeroTitle = forwardRef<HTMLHeadingElement, HeroTitleProps>(
  ({ firstName, lastName, subtitle, splitText }, ref) => {
    return (
      <>
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
          ref={ref}
          className="text-[clamp(3rem,10vw,8rem)] font-black mb-8 leading-[0.9] tracking-tight text-white"
        >
          <span className="block opacity-40">{firstName}</span>
          <span className="text-gradient block drop-shadow-[0_0_50px_rgba(6,182,212,0.3)]">
            {lastName.toUpperCase()}
          </span>
        </h1>

        <div className="text-xl md:text-2xl text-gray-400 mb-12 font-medium tracking-wide max-w-3xl mx-auto leading-relaxed">
          {splitText(subtitle)}
        </div>
      </>
    );
  }
);

HeroTitle.displayName = "HeroTitle";

export default HeroTitle;
