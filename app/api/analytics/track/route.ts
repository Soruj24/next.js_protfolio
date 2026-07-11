import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { AnalyticsEvent } from "@/models/AnalyticsEvent";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, page, projectId, referrer, userAgent } = body;

    if (!event) {
      return NextResponse.json({ error: "Event type is required" }, { status: 400 });
    }

    const validEvents = ["page_view", "project_view", "like", "contact_submit", "resume_download", "github_click"];
    if (!validEvents.includes(event)) {
      return NextResponse.json({ error: "Invalid event type" }, { status: 400 });
    }

    await connectDB();

    const ua = userAgent || request.headers.get("user-agent") || "";
    const device = /mobile/i.test(ua) ? "Mobile" : /tablet/i.test(ua) ? "Tablet" : "Desktop";

    let browser = "Other";
    if (/chrome/i.test(ua) && !/edg/i.test(ua)) browser = "Chrome";
    else if (/firefox/i.test(ua)) browser = "Firefox";
    else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = "Safari";
    else if (/edg/i.test(ua)) browser = "Edge";

    let os = "Other";
    if (/windows/i.test(ua)) os = "Windows";
    else if (/macintosh|mac os/i.test(ua)) os = "macOS";
    else if (/linux/i.test(ua)) os = "Linux";
    else if (/android/i.test(ua)) os = "Android";
    else if (/iphone|ipad/i.test(ua)) os = "iOS";

    await AnalyticsEvent.create({
      event,
      page: page || "/",
      projectId,
      referrer: referrer || request.headers.get("referer") || "",
      userAgent: ua,
      device,
      browser,
      os,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Analytics track error:", error);
    return NextResponse.json({ success: true }, { status: 201 });
  }
}
