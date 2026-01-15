import React from "react";

const ProjectsBackground: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] bg-cyan-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-purple-500/5 rounded-full blur-[120px]" />
    </div>
  );
};

export default ProjectsBackground;
