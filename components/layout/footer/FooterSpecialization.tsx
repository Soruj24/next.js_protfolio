import React from "react";

interface FooterSpecializationProps {
  text: string;
}

const FooterSpecialization: React.FC<FooterSpecializationProps> = ({ text }) => {
  return (
    <div className="text-center mt-8 pt-6 border-t border-white/10">
      <div className="text-cyan-400 text-sm font-medium tracking-wide">
        Specializing in {text} • 20+ Projects Completed
      </div>
    </div>
  );
};

export default FooterSpecialization;
