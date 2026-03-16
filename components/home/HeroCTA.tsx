import React, { forwardRef } from "react";
import { Button } from "../ui/button";

const HeroCTA = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      className="flex flex-col sm:flex-row gap-5 md:gap-8 justify-center items-center mb-20"
    >
      {/* Explore Projects */}
      <Button
        onClick={() =>
          document
            .getElementById("projects")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="relative group px-8 py-4 text-lg font-semibold rounded-2xl 
        bg-gradient-to-r from-cyan-500 to-blue-600 text-white 
        shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 
        overflow-hidden"
      >
        {/* glow effect */}
        <span
          className="absolute inset-0 bg-white/20 opacity-0 
          group-hover:opacity-100 blur-xl transition duration-500"
        />

        <span className="relative flex items-center">
          Explore Projects
          <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </span>
      </Button>

      {/* Resume */}
      <Button
        className="relative group px-8 py-4 text-lg font-semibold rounded-2xl
        border border-gray-300 bg-white text-gray-900
        hover:bg-gray-100 transition-all duration-300 shadow-sm"
      >
        Download Resume
      </Button>

      {/* Contact */}
      <Button
        onClick={() =>
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="relative group px-8 py-4 text-lg font-semibold rounded-2xl
        bg-black text-white shadow-lg
        hover:shadow-white/30 transition-all duration-300 overflow-hidden"
      >
        <span
          className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent
          opacity-0 group-hover:opacity-100 transition"
        />

        <span className="relative">Get In Touch</span>
      </Button>
    </div>
  );
});

HeroCTA.displayName = "HeroCTA";

export default HeroCTA;