import React from "react";

interface ScrollProgressBarProps {
  progress: number;
}

const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ progress }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ScrollProgressBar;
