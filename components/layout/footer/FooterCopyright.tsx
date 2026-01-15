import React from "react";

interface FooterCopyrightProps {
  year: number;
  fullName: string;
}

const FooterCopyright: React.FC<FooterCopyrightProps> = ({ year, fullName }) => {
  return (
    <div className="footer-float text-gray-400 text-lg text-center md:text-left">
      © {year} {fullName}. Built with ❤️ using Next.js & GSAP
    </div>
  );
};

export default FooterCopyright;
