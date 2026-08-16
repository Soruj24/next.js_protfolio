import { NextRequest, NextResponse } from "next/server";
import { getAllLinks, createLink, getActiveLinks } from "@/lib/links";
import { validateLinkInput } from "@/lib/links/link-validation";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get("active") === "true";
    const category = searchParams.get("category");
    const type = searchParams.get("type");

    let links;
    if (activeOnly) {
      links = await getActiveLinks();
    } else {
      links = await getAllLinks();
    }

    if (category) {
      links = links.filter((l) => l.category === category);
    }
    if (type) {
      links = links.filter((l) => l.type === type);
    }

    return NextResponse.json(links);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch links" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const errors = validateLinkInput(body);

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
    }

    const link = await createLink(body);
    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create link" }, { status: 500 });
  }
}
