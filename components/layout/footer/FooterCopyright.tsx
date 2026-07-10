import React from "react";

interface FooterCopyrightProps {
  year: number;
  fullName: string;
}

const FooterCopyright: React.FC<FooterCopyrightProps> = ({ year, fullName }) => {
  return (
    <div className="text-gray-600 text-xs font-mono">
      © {year} {fullName}. All rights reserved.
    </div>
  );
};

export default FooterCopyright;
