import React from "react";

const FooterScrollToTop: React.FC = () => {
  return (
    <button
      className="footer-float px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl font-semibold text-white hover:shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 shadow-lg"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ↑ Back to Top
    </button>
  );
};

export default FooterScrollToTop;
