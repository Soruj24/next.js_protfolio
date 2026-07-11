"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { usePortfolioSettings } from "@/hooks/usePortfolioSettings";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 1.6,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.5 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const iconMap: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  website: ExternalLink,
};

export default function HeroSocial() {
  const { settings } = usePortfolioSettings();

  const socials = (settings?.social_links || [])
    .filter((s) => s.visible)
    .map((s) => ({
      icon: iconMap[s.platform.toLowerCase()] || ExternalLink,
      href: s.platform.toLowerCase() === "email" ? `mailto:${s.url}` : s.url,
      label: s.platform,
    }));

  if (socials.length === 0) return null;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex items-center gap-2"
    >
      {socials.map((social) => {
        const Icon = social.icon;
        return (
          <motion.a
            key={social.label}
            variants={item}
            href={social.href}
            target={social.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center
              text-gray-400 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15]
              transition-colors duration-300"
            aria-label={social.label}
          >
            <Icon className="w-4 h-4" />
          </motion.a>
        );
      })}
    </motion.div>
  );
}
