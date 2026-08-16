import { NextRequest, NextResponse } from "next/server";
import { trackLinkClick, getLinkById } from "@/lib/links";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Link ID is required" }, { status: 400 });
    }

    const link = await getLinkById(id);
    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    await trackLinkClick(id);

    return NextResponse.json({ success: true, url: link.url });
  } catch (error) {
    return NextResponse.json({ error: "Failed to track click" }, { status: 500 });
  }
}
