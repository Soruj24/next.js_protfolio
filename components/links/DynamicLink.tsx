"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { LinkData } from "@/lib/links/link-types";
import { isInternalLink, getInternalPath } from "@/lib/links/link-utils";

interface DynamicLinkProps {
  link: LinkData;
  children: React.ReactNode;
  className?: string;
  showExternalIcon?: boolean;
  onClick?: () => void;
}

export default function DynamicLink({
  link,
  children,
  className = "",
  showExternalIcon = false,
  onClick,
}: DynamicLinkProps) {
  if (!link?.url) return null;

  const isExternal = isInternalLink(link.url) ? false : true;

  if (!isExternal) {
    const href = getInternalPath(link.url);
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={link.url}
      target={link.openInNewTab ? "_blank" : undefined}
      rel={link.openInNewTab ? "noopener noreferrer" : undefined}
      className={className}
      onClick={onClick}
    >
      {children}
      {showExternalIcon && <ExternalLink className="inline ml-1 opacity-50" size={12} />}
    </a>
  );
}
