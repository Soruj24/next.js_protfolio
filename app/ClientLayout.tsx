"use client";

import { usePathname } from "next/navigation";
import CustomCursor from "@/components/ui/CustomCursor";
import PageTransition from "@/components/ui/PageTransition";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";
import { Toaster } from "sonner";
import ChatBotWrapper from "@/components/chat/widget/ChatBotWrapper";
import { RecentlyViewedProvider } from "@/context/RecentlyViewedContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const shouldShowChatBot = pathname !== "/resume";

  return (
    <NextAuthProvider>
      <RecentlyViewedProvider>
        <CustomCursor />
        {shouldShowChatBot && <ChatBotWrapper />}
        <div className="relative z-10 content-wrapper">{children}</div>
        <Toaster position="top-right" />
      </RecentlyViewedProvider>
    </NextAuthProvider>
  );
}
