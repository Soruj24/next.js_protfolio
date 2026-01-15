import React from "react";

interface FooterSocialsProps {
  email: string;
}

const FooterSocials: React.FC<FooterSocialsProps> = ({ email }) => {
  const socials = [
    { icon: "🐙", label: "GitHub", link: "https://github.com/Soruj24" },
    { icon: "💼", label: "LinkedIn", link: "https://linkedin.com/in/soruj-mahmud" },
    { icon: "📧", label: "Email", link: `mailto:${email}` },
  ];

  return (
    <div className="flex space-x-6">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
          title={social.label}
        >
          <span className="text-2xl">{social.icon}</span>
        </a>
      ))}
    </div>
  );
};

export default FooterSocials;
