"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import CommandPalette from "./CommandPalette";
import NotificationCenter from "./NotificationCenter";
import UserProfileMenu from "./UserProfileMenu";
import { cn } from "@/lib/utils";

const segmentLabels: Record<string, string> = {
  admin: "Command Center",
  projects: "Projects",
  skills: "Skills",
  inquiries: "Inquiries",
  settings: "Settings",
  new: "New",
  edit: "Edit",
};

export default function TopNavigation() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = segmentLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    const isLast = index === segments.length - 1;
    return { href, label, isLast };
  });

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="relative">
        <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative flex items-center justify-between h-16 px-6 lg:px-8">
          <nav className="flex items-center gap-1 text-sm font-medium min-w-0">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors shrink-0"
            >
              <Home size={14} />
            </Link>
            {breadcrumbs.map((crumb) => (
              <span key={crumb.href} className="flex items-center gap-1.5 min-w-0">
                <ChevronRight size={12} className="text-gray-600 shrink-0" />
                {crumb.isLast ? (
                  <span className="text-white font-semibold truncate">{crumb.label}</span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-gray-500 hover:text-white transition-colors truncate"
                  >
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <CommandPalette />
            <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block" />
            <NotificationCenter />
            <UserProfileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
