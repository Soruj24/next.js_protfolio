import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Activity } from "@/models/Activity";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const session = await auth();
  const role = session?.user?.role;
  if (!session || (role !== "admin" && role !== "editor")) return null;
  return session;
}

export async function GET(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();

    const { searchParams } = new URL(request.url);
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")));
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const type = searchParams.get("type");

    const filter: Record<string, any> = {};
    if (type && type !== "all") filter.type = type;

    const [data, total, unreadCount] = await Promise.all([
      Activity.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Activity.countDocuments(filter),
      Activity.countDocuments({ read: false }),
    ]);

    return NextResponse.json({
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      unreadCount,
    });
  } catch (error) {
    console.error("Activities API error:", error);
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    await connectDB();
    const activity = await Activity.create({
      ...body,
      read: body.read ?? false,
    });
    return NextResponse.json(activity, { status: 201 });
  } catch (error) {
    console.error("Activity create error:", error);
    return NextResponse.json({ error: "Failed to create activity" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const body = await request.json();
    const { id, readAll } = body;

    if (readAll) {
      await Activity.updateMany({ read: false }, { read: true });
      return NextResponse.json({ success: true, message: "All notifications marked as read" });
    }

    if (id) {
      await Activity.findByIdAndUpdate(id, { read: true });
      return NextResponse.json({ success: true, message: "Notification marked as read" });
    }

    return NextResponse.json({ error: "id or readAll is required" }, { status: 400 });
  } catch (error) {
    console.error("Activity PATCH error:", error);
    return NextResponse.json({ error: "Failed to update activity" }, { status: 500 });
  }
}
