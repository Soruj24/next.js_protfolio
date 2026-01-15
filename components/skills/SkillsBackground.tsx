import React from "react";

const SkillsBackground: React.FC = () => {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
    </div>
  );
};

export default SkillsBackground;
