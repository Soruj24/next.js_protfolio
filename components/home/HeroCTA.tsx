import React, { forwardRef } from "react";
import DynamicResume from "../ui/DynamicResume";

const HeroCTA = forwardRef<HTMLDivElement, {}>(({}, ref) => {
  return (
    <div
      ref={ref}
      className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-16 md:mb-24"
    >
      <button
        onClick={() =>
          document
            .getElementById("projects")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="group relative w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white text-black rounded-2xl font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <div className="absolute inset-0 bg-cyan-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity" />
        <span className="relative flex items-center justify-center">
          Explore Projects
          <span className="ml-2 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </span>
      </button>

      <DynamicResume />

      <button
        onClick={() =>
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-2xl font-bold text-base md:text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        Get In Touch
      </button>
    </div>
  );
});

HeroCTA.displayName = "HeroCTA";

export default HeroCTA;
