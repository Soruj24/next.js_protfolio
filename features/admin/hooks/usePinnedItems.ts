"use client";

import { useState, useCallback, useMemo } from "react";
import { allPages } from "@/features/admin/data/navigation";
import { getStorageItem, setStorageItem } from "@/features/admin/lib/storage";

export function usePinnedItems() {
  const [pinned, setPinned] = useState<string[]>(() =>
    getStorageItem("sb-pinned", ["Dashboard", "Projects"])
  );

  const togglePin = useCallback((name: string) => {
    setPinned((prev) => {
      const next = prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name];
      setStorageItem("sb-pinned", next);
      return next;
    });
  }, []);

  const pinnedItems = useMemo(
    () => allPages.filter((p) => pinned.includes(p.name)),
    [pinned]
  );

  const isPinned = useCallback((name: string) => pinned.includes(name), [pinned]);

  return { pinnedItems, togglePin, isPinned };
}
