import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Message } from "@/models/Message";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user || (session.user as { role?: string }).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Find all messages involving admin and group by the other participant
    // This is a simplified way to get a list of "conversations"
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ senderId: "admin" }, { receiverId: "admin" }],
        },
      },
      {
        $project: {
          otherParty: {
            $cond: {
              if: { $eq: ["$senderId", "admin"] },
              then: "$receiverId",
              else: "$senderId",
            },
          },
          content: 1,
          createdAt: 1,
          isRead: 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: "$otherParty",
          lastMessage: { $first: "$content" },
          lastMessageTime: { $first: "$createdAt" },
          unreadCount: {
            $sum: {
              $cond: [
                { $and: [{ $ne: ["$senderId", "admin"] }, { $eq: ["$isRead", false] }] },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $sort: { lastMessageTime: -1 },
      },
    ]);

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("Fetch conversations error:", error);
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 });
  }
}
