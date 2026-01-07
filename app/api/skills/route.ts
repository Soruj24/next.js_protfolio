import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { SkillCategory } from "@/models/Skill";
import { auth } from "@/auth";

export async function GET() {
  try {
    await connectDB();
    const categories = await SkillCategory.find({}).sort({ createdAt: -1 });
    return NextResponse.json(categories);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || (session.user as { role?: string }).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
