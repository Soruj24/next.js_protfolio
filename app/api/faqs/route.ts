import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { FAQ } from "@/models/FAQ";
import { requireAdmin } from "@/lib/auth/helpers";

export async function GET() {
  try {
    await connectDB();
    const faqs = await FAQ.find({ active: true }).sort({ order: 1 }).lean();
    return NextResponse.json(faqs, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (error) {
    console.error("FAQs fetch error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;

    const data = await req.json();
    await connectDB();
    const faq = await FAQ.create(data);
    return NextResponse.json(faq, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
