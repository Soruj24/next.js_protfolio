import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { FAQ } from "@/models/FAQ";
import { requireAdmin } from "@/lib/auth/helpers";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await connectDB();
    const faq = await FAQ.findById(id).lean();
    if (!faq) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(faq);
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
    const faq = await FAQ.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!faq) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(faq);
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
    const faq = await FAQ.findByIdAndDelete(id);
    if (!faq) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted" });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
