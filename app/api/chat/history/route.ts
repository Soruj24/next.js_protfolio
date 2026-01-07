import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Message } from "@/models/Message";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const senderId = searchParams.get("senderId");
    const receiverId = searchParams.get("receiverId");

    if (!senderId || !receiverId) {
      return NextResponse.json(
        { error: "Missing participants" },
        { status: 400 }
      );
    }

    const session = await auth();
    // Security: Only allow admin or the client themselves to see their messages
    // (This is a simplified check, ideally we'd have client auth or tokens)
    const isAdmin =
      session && (session.user as { role?: string }).role === "admin";

    // If not admin, the requester must be one of the participants
    // For now, we trust the senderId/receiverId from query (improve with cookies/tokens later)

    await connectDB();

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Fetch messages error:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
