import React from "react";

const FooterLinks: React.FC = () => {
  const links = [
    { label: "Privacy", href: "#" },
    { label: "Sitemap", href: "/sitemap.xml" },
  ];

  return (
    <div className="flex items-center gap-6">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="text-xs text-gray-400 hover:text-gray-400 transition-colors duration-300 font-mono"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};

export default FooterLinks;
