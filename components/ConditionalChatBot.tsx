"use client";

import ChatBotWrapper from "@/components/chat/widget/ChatBotWrapper";
import { usePathname } from "next/navigation";

export default function ConditionalChatBot() {
  const pathname = usePathname();

  const hiddenRoutes = ["/resume"];

  if (hiddenRoutes.some((route) => pathname.startsWith(route))) {
    return null;
  }

  return <ChatBotWrapper />;
}
