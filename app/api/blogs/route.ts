import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Blog } from "@/models/Blog";
import { requireAdmin } from "@/lib/auth/helpers";
import { notify } from "@/lib/services/notification";

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({ published: true }).sort({ publishedAt: -1 }).lean();
    return NextResponse.json(blogs, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (error) {
    console.error("Blogs fetch error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;

    const data = await req.json();
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
    await connectDB();
    const blog = await Blog.create(data);
    if (data.published) notify.blogPublished(data.title, data.slug);
    return NextResponse.json(blog, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
