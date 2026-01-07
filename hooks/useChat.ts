"use client";

import { useState, useEffect, useRef } from "react";
import { pusherClient } from "@/lib/pusher";
import { v4 as uuidv4 } from "uuid";

export const useChat = (receiverId: string = "admin") => {
  const [messages, setMessages] = useState<{
    id: string;
    content: string;
    senderId: string;
    receiverId: string;
    timestamp: string;
  }[]>([]);
  const [clientId, setClientId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get or create client ID
    let storedId = localStorage.getItem("portfolio_client_id");
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem("portfolio_client_id", storedId);
    }
    setClientId(storedId);

    // Fetch history
    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `/api/chat/history?senderId=${storedId}&receiverId=${receiverId}`
        );
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();

    // Subscribe to Pusher
    const participants = [storedId, receiverId].sort().join("-");
    const channel = pusherClient.subscribe(`chat-${participants}`);

    channel.bind(
      "new-message",
      (newMessage: {
        id: string;
        content: string;
        senderId: string;
        receiverId: string;
        timestamp: string;
      }) => {
        setMessages((prev) => [...prev, newMessage]);
      }
    );

    return () => {
      pusherClient.unsubscribe(`chat-${participants}`);
    };
  }, [receiverId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || !clientId) return;

    try {
      const res = await fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          senderId: clientId,
          receiverId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return { messages, sendMessage, isLoading, clientId, messagesEndRef };
};
