"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar, { SidebarProvider } from "@/features/admin/components/AdminSidebar";
import TopNavigation from "@/features/admin/components/command-center/TopNavigation";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleKeyboardShortcuts = useCallback(
    (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) return;

      switch (e.key) {
        case "g":
          setTimeout(() => {
            const handler = (e2: KeyboardEvent) => {
              document.removeEventListener("keydown", handler);
              switch (e2.key) {
                case "d":
                  router.push("/admin");
                  break;
                case "p":
                  router.push("/admin/projects");
                  break;
                case "s":
                  router.push("/admin/skills");
                  break;
                case "i":
                  router.push("/admin/inquiries");
                  break;
                case "x":
                  router.push("/admin/settings");
                  break;
              }
            };
            document.addEventListener("keydown", handler, { once: true });
          }, 0);
          break;
        case "n":
          setTimeout(() => {
            const handler = (e2: KeyboardEvent) => {
              document.removeEventListener("keydown", handler);
              if (e2.key === "p") router.push("/admin/projects/new");
              if (e2.key === "s") router.push("/admin/skills/new");
            };
            document.addEventListener("keydown", handler, { once: true });
          }, 0);
          break;
      }
    },
    [router],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardShortcuts);
    return () => document.removeEventListener("keydown", handleKeyboardShortcuts);
  }, [handleKeyboardShortcuts]);

  return (
    <SidebarProvider>
      <div className="flex h-dvh bg-[#020617] text-white selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden">
        <AdminSidebar />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <TopNavigation />

          <main className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="relative p-6 lg:p-8 max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
