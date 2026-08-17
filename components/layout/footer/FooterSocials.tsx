"use client";

import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { usePortfolioSettings } from "@/hooks/usePortfolioSettings";
import type { SocialLink } from "@/hooks/usePortfolioSettings";

const iconMap: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  website: ExternalLink,
  portfolio: ExternalLink,
  twitter: ExternalLink,
  facebook: ExternalLink,
  youtube: ExternalLink,
  instagram: ExternalLink,
};

export default function FooterSocials() {
  const { settings } = usePortfolioSettings();
  const socials = settings?.socials ?? [];

  if (socials.length === 0) return null;

  return (
    <div className="flex items-center gap-3">
      {socials.map((social: SocialLink) => {
        const Icon = iconMap[social.label.toLowerCase()] || ExternalLink;
        return (
          <a
            key={social.label}
            href={social.href}
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
