import React from "react";

const ContactBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none noise-bg">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_50%)]"></div>
      <div className="floating-bg-element absolute top-1/4 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]"></div>
      <div className="floating-bg-element absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"></div>
    </div>
  );
};

export default ContactBackground;
