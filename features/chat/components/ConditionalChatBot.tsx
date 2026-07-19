"use client";

import ChatBotWrapper from "@/features/chat/components/ChatBotWrapper";
import { usePathname } from "next/navigation";

export default function ConditionalChatBot() {
  const pathname = usePathname();

  const hiddenRoutes: string[] = [];

  if (hiddenRoutes.some((route) => pathname.startsWith(route))) {
    return null;
  }

  return <ChatBotWrapper />;
}
