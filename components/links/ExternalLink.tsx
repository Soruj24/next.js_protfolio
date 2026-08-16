"use client";

import { ExternalLink } from "lucide-react";

interface ExternalLinkComponentProps {
  url: string;
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
  onClick?: () => void;
}

export default function ExternalLinkComponent({
  url,
  children,
  className = "",
  showIcon = false,
  onClick,
}: ExternalLinkComponentProps) {
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onClick}
    >
      {children}
      {showIcon && <ExternalLink className="inline ml-1 opacity-50" size={12} />}
    </a>
  );
}
