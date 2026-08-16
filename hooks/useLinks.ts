"use client";

import { useEffect, useState, useCallback } from "react";
import type { LinkData, LinkType, LinkCategory } from "@/lib/links/link-types";

interface UseLinksOptions {
  category?: LinkCategory;
  type?: LinkType;
  activeOnly?: boolean;
}

interface UseLinksReturn {
  links: LinkData[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  getLinkByType: (type: LinkType) => LinkData | undefined;
  getLinksByCategory: (category: LinkCategory) => LinkData[];
}

export function useLinks(options: UseLinksOptions = {}): UseLinksReturn {
  const { category, type, activeOnly = true } = options;
  const [links, setLinks] = useState<LinkData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLinks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (activeOnly) params.set("active", "true");
      if (category) params.set("category", category);
      if (type) params.set("type", type);

      const res = await fetch(`/api/links?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch links");
      const data = await res.json();
      setLinks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [category, type, activeOnly]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const getLinkByType = useCallback(
    (t: LinkType) => links.find((l) => l.type === t && l.isActive),
    [links]
  );

  const getLinksByCategory = useCallback(
    (c: LinkCategory) => links.filter((l) => l.category === c && l.isActive),
    [links]
  );

  return { links, loading, error, refetch: fetchLinks, getLinkByType, getLinksByCategory };
}

export function useSocialLinks(): UseLinksReturn {
  return useLinks({ category: "social" });
}

export function useContactLinks(): UseLinksReturn {
  return useLinks({ category: "contact" });
}
