"use client";

import { usePathname } from "next/navigation";
import CustomCursor from "@/components/shared/CustomCursor";
import ConditionalChatBot from "@/features/chat/components/ConditionalChatBot";
import { Toaster } from "sonner";
import Link from "next/link";

export default function PortfolioChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isResumeRoute = pathname.startsWith("/resume");

  if (isResumeRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Link
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-cyan-500 focus:text-white focus:outline-none"
      >
        Skip to content
      </Link>
      <CustomCursor />
      <ConditionalChatBot />
      <div className="relative z-10 content-wrapper" id="main-content">
        {children}
      </div>
      <Toaster position="top-right" />
    </>
  );
}
