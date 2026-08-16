"use client";

import { useEffect, useState } from "react";
import type { LinkData } from "@/lib/links/link-types";

const STATIC_LINKS = [
  { label: "Sitemap", href: "/sitemap.xml" },
];

export default function FooterLinks() {
  const [dynamicLinks, setDynamicLinks] = useState<LinkData[]>([]);

  useEffect(() => {
    fetch("/api/links?category=navigation&active=true")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: LinkData[]) => setDynamicLinks(data))
      .catch(() => {});
  }, []);

  const allLinks = [
    ...dynamicLinks.map((l) => ({ label: l.label, href: l.url })),
    ...STATIC_LINKS,
  ];

  return (
    <div className="flex items-center gap-6">
      {allLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("/") ? undefined : "_blank"}
          rel={link.href.startsWith("/") ? undefined : "noopener noreferrer"}
          className="text-xs text-gray-400 hover:text-gray-400 transition-colors duration-300 font-mono"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
