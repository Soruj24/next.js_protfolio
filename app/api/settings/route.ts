import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Settings } from "@/models/Settings";
import { requireAdmin } from "@/lib/auth/helpers";
import { notify } from "@/lib/services/notification";

export async function GET() {
  try {
    await connectDB();
    const settings = await Settings.findOne();

    if (!settings) {
      return NextResponse.json({});
    }

    return NextResponse.json(settings);
  } catch (error: unknown) {
    return NextResponse.json({}, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;

    const data = await req.json();
    await connectDB();

    let settings = await Settings.findOne();

    if (settings) {
      settings = await Settings.findByIdAndUpdate(settings._id, data, {
        new: true,
        runValidators: true,
        overwrite: true,
      });
    } else {
      settings = await Settings.create(data);
    }

    try {
      await notify.systemEvent(
        "Settings Updated",
        `Portfolio settings were updated by ${session?.user?.name || "admin"}`,
      );
    } catch {
      // Notification failure should not block settings update
    }

    return NextResponse.json(settings);
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal Server Error" }, { status: 500 });
  }
}
