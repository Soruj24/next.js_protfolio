import React, { forwardRef } from "react";
import Image from "next/image";

const AboutImage = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="relative order-1 lg:order-2 flex justify-center">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 group">
        {/* Outer glowing rings */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl group-hover:blur-2xl transition-all duration-700 animate-pulse-slow" />
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-20 group-hover:opacity-40 transition-opacity duration-700" />

        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 glass-morphism p-2">
          <div className="relative w-full h-full rounded-full bg-gray-800 overflow-hidden group-hover:scale-110 transition-transform duration-700 ease-out">
            <Image
              src="/soruj.jpg"
              alt="Soruj Mahmud"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Floating tech badges */}
        <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl glass-card flex items-center justify-center animate-float shadow-lg border border-white/20">
          <span className="text-xl">🤖</span>
        </div>
        <div className="absolute bottom-4 -left-8 w-14 h-14 rounded-2xl glass-card flex items-center justify-center animate-float delay-700 shadow-lg border border-white/20">
          <span className="text-2xl">⚡</span>
        </div>
        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl glass-card flex items-center justify-center animate-float delay-1000 shadow-lg border border-white/20">
          <span className="text-lg">🧠</span>
        </div>
      </div>
    </div>
  );
});

AboutImage.displayName = "AboutImage";

export default AboutImage;
