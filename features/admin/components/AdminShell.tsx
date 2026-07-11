"use client";

import { useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar, { SidebarProvider } from "@/features/admin/components/AdminSidebar";
import TopNavigation from "@/features/admin/components/command-center/TopNavigation";
import ErrorBoundary from "@/features/admin/components/ErrorBoundary";

const NAV_ROUTES: Record<string, string> = {
  d: "/admin",
  a: "/admin/analytics",
  p: "/admin/projects",
  s: "/admin/skills",
  i: "/admin/inquiries",
  x: "/admin/settings",
};

const CREATE_ROUTES: Record<string, string> = {
  p: "/admin/projects/new",
  s: "/admin/skills/new",
};

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pendingKey = useRef<string | null>(null);
  const pendingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const target = e.target as HTMLElement;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.isContentEditable
      ) {
        return;
      }

      // If we have a pending key, check for the second keypress
      if (pendingKey.current) {
        const firstKey = pendingKey.current;
        pendingKey.current = null;
        if (pendingTimer.current) {
          clearTimeout(pendingTimer.current);
          pendingTimer.current = null;
        }

        const route =
          (firstKey === "g" && NAV_ROUTES[e.key]) ||
          (firstKey === "n" && CREATE_ROUTES[e.key]);
        if (route) {
          e.preventDefault();
          router.push(route);
        }
        return;
      }

      // Start waiting for second key
      if (e.key === "g" || e.key === "n") {
        pendingKey.current = e.key;
        pendingTimer.current = setTimeout(() => {
          pendingKey.current = null;
          pendingTimer.current = null;
        }, 800);
      }
    },
    [router],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (pendingTimer.current) clearTimeout(pendingTimer.current);
    };
  }, [handleKeyDown]);

  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="flex h-dvh bg-[#020617] text-white selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden">
          <AdminSidebar />

          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <TopNavigation />

            <main
              className="flex-1 overflow-y-auto scrollbar-hide"
              id="main-content"
              role="main"
              aria-label="Admin content"
            >
              <div className="relative p-6 lg:p-8 max-w-[1600px] mx-auto">
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  );
}
