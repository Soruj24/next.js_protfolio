import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Service } from "@/models/Service";
import { requireAdmin } from "@/lib/auth/helpers";

export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({ active: true }).sort({ order: 1 }).lean();
    return NextResponse.json(services, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (error) {
    console.error("Services fetch error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;

    const data = await req.json();
    await connectDB();
    const service = await Service.create(data);
    return NextResponse.json(service, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
