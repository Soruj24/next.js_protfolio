"use client";

import {
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  Globe,
  Mail,
  Phone,
  MessageCircle,
  Share2,
} from "lucide-react";
import type { LinkData } from "@/lib/links/link-types";
import { buildMailtoUrl, buildTelUrl } from "@/lib/links/link-utils";

const PLATFORM_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  youtube: Youtube,
  discord: MessageCircle,
  portfolio: Globe,
  email: Mail,
  phone: Phone,
  social: Share2,
};

interface SocialLinkProps {
  link: LinkData;
  className?: string;
  size?: number;
  onClick?: () => void;
}

export default function SocialLink({ link, className = "", size = 18, onClick }: SocialLinkProps) {
  if (!link?.url || !link.isActive) return null;

  const Icon = PLATFORM_ICONS[link.type] || Globe;

  let href = link.url;
  if (link.type === "email") {
    href = buildMailtoUrl(link.url);
  } else if (link.type === "phone") {
    href = buildTelUrl(link.url);
  }

  const isExternal = !href.startsWith("/") && !href.startsWith("mailto:") && !href.startsWith("tel:");

  return (
    <a
      href={href}
      target={isExternal && link.openInNewTab ? "_blank" : undefined}
      rel={isExternal && link.openInNewTab ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center justify-center transition-colors ${className}`}
      aria-label={link.label}
      title={link.label}
      onClick={onClick}
    >
      <Icon size={size} />
    </a>
  );
}
