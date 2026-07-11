"use client";

import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { usePortfolioSettings } from "@/hooks/usePortfolioSettings";

interface FooterSocialsProps {
  email: string;
}

const iconMap: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  website: ExternalLink,
};

export default function FooterSocials({ email }: FooterSocialsProps) {
  const { settings } = usePortfolioSettings();

  const socials = (settings?.social_links || [])
    .filter((s) => s.visible)
    .map((s) => ({
      icon: iconMap[s.platform.toLowerCase()] || ExternalLink,
      label: s.platform,
      link: s.platform.toLowerCase() === "email" ? `mailto:${email || s.url}` : s.url,
    }));

  if (socials.length === 0) return null;

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
            className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
            aria-label={social.label}
          >
            <Icon className="w-4 h-4" />
          </a>
        );
      })}
    </div>
  );
}
