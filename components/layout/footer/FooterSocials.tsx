import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

interface FooterSocialsProps {
  email: string;
}

const FooterSocials: React.FC<FooterSocialsProps> = ({ email }) => {
  const socials = [
    { icon: Github, label: "GitHub", link: "https://github.com/Soruj24" },
    { icon: Linkedin, label: "LinkedIn", link: "https://linkedin.com/in/soruj-mahmud" },
    { icon: Mail, label: "Email", link: `mailto:${email}` },
  ];

  return (
    <div className="flex items-center gap-3">
      {socials.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.label}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
            aria-label={social.label}
          >
            <Icon className="w-4 h-4" />
          </a>
        );
      })}
    </div>
  );
};

export default FooterSocials;
