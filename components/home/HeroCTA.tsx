import React, { forwardRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

const HeroCTA = forwardRef<HTMLDivElement>((props, ref) => {
  const router = useRouter();

  return (
    <div
      ref={ref}
      className="flex flex-col sm:flex-row gap-5 md:gap-8 justify-center items-center mb-20"
    >
      {/* Resume */}
      <Button
        onClick={() => router.push("/resume")}
        className="relative group px-8 py-4 text-lg font-semibold rounded-2xl
        bg-gradient-to-r from-cyan-500 to-blue-600 text-white
        shadow-lg hover:shadow-cyan-500/40 transition-all duration-300
        overflow-hidden"
      >
        <Download className="w-5 h-5 group-hover:animate-bounce mr-2" />
        Resume
      </Button>

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
