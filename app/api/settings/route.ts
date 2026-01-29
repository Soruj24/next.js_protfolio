import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Settings } from "@/models/Settings";
import { auth } from "@/auth";

export async function GET() {
  try {
    await connectDB();
    const settings = await Settings.findOne();

    if (!settings) {
      // Return empty settings or some default structure if needed
      return NextResponse.json({});
    }

    return NextResponse.json(settings);
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userRole = (session?.user as { role?: string })?.role;
    if (!session || userRole !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    await connectDB();

    let settings = await Settings.findOne();

    if (settings) {
      settings = await Settings.findByIdAndUpdate(settings._id, data, {
        new: true,
        runValidators: true,
      });
    } else {
      settings = await Settings.create(data);
    }

    return NextResponse.json(settings);
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal Server Error" }, { status: 500 });
  }
}
