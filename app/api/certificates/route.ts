import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Certificate } from "@/models/Certificate";
import { requireAdmin } from "@/lib/auth/helpers";

export async function GET() {
  try {
    await connectDB();
    const certs = await Certificate.find({ active: true }).sort({ order: 1 }).lean();
    return NextResponse.json(certs, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (error) {
    console.error("Certificates fetch error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;

    const data = await req.json();
    await connectDB();
    const cert = await Certificate.create(data);
    return NextResponse.json(cert, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
