import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Message } from "@/models/Message";
import { pusherServer } from "@/lib/pusher";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const { content, senderId, receiverId } = await req.json();
    const session = await auth();

    // If sender is admin, verify session
    if (senderId === "admin") {
      if (!session || session.user?.email !== "admin@example.com") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    await connectDB();

    const newMessage = await Message.create({
      senderId,
      receiverId,
      content,
      isRead: false,
    });

    // Trigger Pusher event
    // Channel name: chat-{senderId}-{receiverId} or similar
    // For simplicity, let's use a dynamic channel based on participants
    const participants = [senderId, receiverId].sort().join("-");
    await pusherServer.trigger(`chat-${participants}`, "new-message", newMessage);

    // Also trigger a notification channel for the receiver
    await pusherServer.trigger(`notifications-${receiverId}`, "new-message-notification", {
      from: senderId,
      message: content.substring(0, 50),
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
