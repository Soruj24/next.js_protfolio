import React from "react";

const FooterLinks: React.FC = () => {
  const links = [
    { label: "Privacy", link: "#" },
    { label: "Terms", link: "#" },
    { label: "Contact", link: "#contact" },
  ];

  const handleClick = (link: string) => {
    if (link.startsWith("#")) {
      document.getElementById(link.slice(1))?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(link, "_blank");
    }
  };

  return (
    <div className="flex space-x-8">
      {links.map((item) => (
        <button
          key={item.label}
          className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 footer-float font-medium"
          onClick={() => handleClick(item.link)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default FooterLinks;
