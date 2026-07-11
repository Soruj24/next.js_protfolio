import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Activity } from "@/models/Activity";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const userRole = session?.user?.role;
    if (!session || (userRole !== "admin" && userRole !== "editor")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const activities = await Activity.find().sort({ createdAt: -1 }).limit(20).lean();
    return NextResponse.json(activities);
  } catch (error) {
    console.error("Activities API error:", error);
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const userRole = session?.user?.role;
    if (!session || (userRole !== "admin" && userRole !== "editor")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    await connectDB();
    const activity = await Activity.create(body);
    return NextResponse.json(activity, { status: 201 });
  } catch (error) {
    console.error("Activity create error:", error);
    return NextResponse.json({ error: "Failed to create activity" }, { status: 500 });
  }
}
