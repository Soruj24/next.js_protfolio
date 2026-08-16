"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { LinkData } from "@/lib/links/link-types";
import { isInternalLink, getInternalPath } from "@/lib/links/link-utils";

interface ValidatedLinkProps {
  href?: string;
  linkId?: string;
  children: React.ReactNode;
  className?: string;
  trackClick?: boolean;
  showExternalIcon?: boolean;
}

export default function ValidatedLink({
  href,
  linkId,
  children,
  className = "",
  trackClick = false,
  showExternalIcon = false,
}: ValidatedLinkProps) {
  const [url, setUrl] = useState(href);

  useEffect(() => {
    if (linkId && !href) {
      fetch(`/api/links/${linkId}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data: LinkData | null) => {
          if (data?.url) setUrl(data.url);
        })
        .catch(() => {});
    }
  }, [linkId, href]);

  const handleClick = useCallback(async () => {
    if (trackClick && linkId) {
      fetch("/api/links/target", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: linkId }),
      }).catch(() => {});
    }
  }, [trackClick, linkId]);

  if (!url) return null;

  const isExternal = isInternalLink(url) ? false : true;

  if (!isExternal) {
    const path = getInternalPath(url);
    return (
      <Link href={path} className={className} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
      {showExternalIcon && <ExternalLink className="inline ml-1 opacity-50" size={12} />}
    </a>
  );
}
