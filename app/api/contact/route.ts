import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Contact } from "@/models/Contact";
import { contactFormSchema } from "@/lib/schemas/contact";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const session = await auth();
  const role = session?.user?.role;
  if (!session || (role !== "admin" && role !== "editor")) {
    return null;
  }
  return session;
}

export async function GET(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")));
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";

    const filter: Record<string, any> = {};

    if (status && status !== "all") {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const [data, total, unreadCount] = await Promise.all([
      Contact.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Contact.countDocuments(filter),
      Contact.countDocuments({ status: { $in: ["pending", "read"] } }),
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
    console.error("Contact GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, message: "Invalid JSON body" }, { status: 400 });
    }

    const validation = contactFormSchema.safeParse(body);
    if (!validation.success) {
      const errorMessages = validation.error.issues.map((err) => err.message).join(", ");
      return NextResponse.json({ success: false, message: errorMessages }, { status: 400 });
    }

    try {
      await connectDB();
    } catch (dbError: unknown) {
      const message = dbError instanceof Error ? dbError.message : "Database connection failed";
      return NextResponse.json({ success: false, message }, { status: 500 });
    }

    try {
      const contact = await Contact.create({
        ...validation.data,
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
      });
      return NextResponse.json({ success: true, message: "Message sent successfully!", id: contact._id });
    } catch (saveError: unknown) {
      const message = saveError instanceof Error ? saveError.message : "Failed to save message";
      return NextResponse.json({ success: false, message }, { status: 500 });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const { id, ids, status } = body;

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    const validStatuses = ["pending", "read", "replied", "archived"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    if (ids && Array.isArray(ids)) {
      await Contact.updateMany({ _id: { $in: ids } }, { $set: { status } });
      return NextResponse.json({ success: true, message: `${ids.length} messages updated` });
    }

    if (id) {
      await Contact.findByIdAndUpdate(id, { status });
      return NextResponse.json({ success: true, message: "Message updated" });
    }

    return NextResponse.json({ error: "id or ids is required" }, { status: 400 });
  } catch (error) {
    console.error("Contact PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      await Contact.findByIdAndDelete(id);
      return NextResponse.json({ success: true, message: "Inquiry deleted" });
    }

    const body = await request.json().catch(() => null);
    if (body?.ids && Array.isArray(body.ids)) {
      await Contact.deleteMany({ _id: { $in: body.ids } });
      return NextResponse.json({ success: true, message: `${body.ids.length} inquiries deleted` });
    }

    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  } catch (error) {
    console.error("Contact DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
