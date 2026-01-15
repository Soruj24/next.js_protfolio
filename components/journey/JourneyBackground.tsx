import React from "react";

const JourneyBackground: React.FC = () => {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-20 right-1/4 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-purple-500/5 rounded-full blur-3xl"></div>
    </div>
  );
};

export default JourneyBackground;
