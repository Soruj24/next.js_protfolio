import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { SkillCategory } from "@/models/Skill";
import { requireAdmin } from "@/lib/auth/helpers";

export async function GET() {
  try {
    await connectDB();
    const dbCategories = await SkillCategory.find({}).sort({ createdAt: -1 });
    return NextResponse.json(dbCategories);
  } catch (error) {
    console.error("Database error in skills API:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;

    const data = await req.json();
    await connectDB();
    const category = await SkillCategory.create(data);
    return NextResponse.json(category, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
