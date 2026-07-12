"use client";

import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { allPages } from "@/features/admin/data/navigation";
import { getStorageItem, setStorageItem } from "@/features/admin/lib/storage";
import type { NavItem } from "@/features/admin/types/sidebar";

export function useRecentlyVisited() {
  const pathname = usePathname();
  const [recentHrefs, setRecentHrefs] = useState<string[]>(() =>
    getStorageItem("sb-recent", [])
  );

  useEffect(() => {
    const page = allPages.find(
      (p) => pathname === p.href || (p.href !== "/admin" && pathname.startsWith(p.href))
    );
    if (!page) return;

    setRecentHrefs((prev) => {
      const filtered = prev.filter((h) => h !== page.href);
      const updated = [page.href, ...filtered].slice(0, 5);
      setStorageItem("sb-recent", updated);
      return updated;
    });
  }, [pathname]);

  const recent = useMemo(
    () =>
      recentHrefs
        .map((href) => allPages.find((p) => p.href === href))
        .filter(Boolean) as NavItem[],
    [recentHrefs]
  );

  return recent;
}
