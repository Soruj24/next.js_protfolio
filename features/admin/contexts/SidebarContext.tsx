"use client";

import { useState, useEffect, createContext, useContext } from "react";
import type { SidebarContextType } from "@/features/admin/types/sidebar";
import { getStorageItem, setStorageItem } from "@/features/admin/lib/storage";

const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  setCollapsed: () => {},
  mobileOpen: false,
  setMobileOpen: () => {},
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(() => getStorageItem("sb-collapsed", false));
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setStorageItem("sb-collapsed", collapsed);
  }, [collapsed]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        setCollapsed((p) => !p);
      }
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
