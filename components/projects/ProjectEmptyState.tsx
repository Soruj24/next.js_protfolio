import React from "react";

const ProjectEmptyState: React.FC = () => {
  return (
    <div className="text-center py-32 bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10">
      <div className="text-5xl mb-6 opacity-20">∅</div>
      <h3 className="text-2xl font-bold text-white mb-2">
        No matching intelligence found
      </h3>
      <p className="text-gray-500 font-medium">
        Adjust your parameters and try again.
      </p>
    </div>
  );
};

export default ProjectEmptyState;
