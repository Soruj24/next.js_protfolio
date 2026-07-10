"use client";
import React, { forwardRef } from "react";
import Image from "next/image";

const AboutImage = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="relative flex justify-center lg:justify-end">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 group">
        {/* Outer glow */}
        <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Ring */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-cyan-500/30 via-purple-500/20 to-pink-500/30 opacity-30 group-hover:opacity-60 transition-opacity duration-700" />

        {/* Image container */}
        <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 glass-morphism p-1.5">
          <div className="relative w-full h-full rounded-full bg-[#0a0f1e] overflow-hidden group-hover:scale-105 transition-transform duration-700 ease-out">
            <Image
              src="/soruj.jpg"
              alt="Soruj Mahmud - Frontend Developer"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
            />
          </div>
        </div>

        {/* Floating badges */}
        <div className="absolute -top-3 -right-3 w-14 h-14 rounded-2xl glass-card flex items-center justify-center animate-float shadow-lg border border-white/10 hover:border-cyan-500/30 transition-colors">
          <span className="text-2xl">⚛️</span>
        </div>
        <div className="absolute bottom-6 -left-6 w-16 h-16 rounded-2xl glass-card flex items-center justify-center animate-float [animation-delay:2s] shadow-lg border border-white/10 hover:border-purple-500/30 transition-colors">
          <span className="text-2xl">⚡</span>
        </div>
        <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl glass-card flex items-center justify-center animate-float [animation-delay:4s] shadow-lg border border-white/10 hover:border-pink-500/30 transition-colors">
          <span className="text-lg">🎨</span>
        </div>
      </div>
    </div>
  );
});

AboutImage.displayName = "AboutImage";

export default AboutImage;
