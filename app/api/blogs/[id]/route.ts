import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Blog } from "@/models/Blog";
import { requireAdmin } from "@/lib/auth/helpers";
import { notify } from "@/lib/services/notification";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await connectDB();
    const blog = await Blog.findOne({ slug: id }).lean();
    if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(blog);
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;

    const data = await req.json();
    await connectDB();
    const blog = await Blog.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
    notify.blogUpdated(blog.title, blog.slug);
    return NextResponse.json(blog);
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;

    await connectDB();
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted" });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
