import React from "react";

const AboutBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute -bottom-1/4 -left-20 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>

      {/* Animated Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>
    </div>
  );
};

export default AboutBackground;
