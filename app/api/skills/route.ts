import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { SkillCategory } from "@/models/Skill";
import { auth } from "@/auth";
import { skillCategories as localSkills } from "@/data/skills";

export async function GET() {
  try {
    await connectDB();
    const dbCategories = await SkillCategory.find({}).sort({ createdAt: -1 });
    
    // Combine DB categories with local ones, avoiding duplicates by title
    const combined = [...dbCategories];
    
    localSkills.forEach(local => {
      if (!combined.some(db => db.title === local.title)) {
        // Add a temporary ID for local skills so the UI doesn't break
        // but they won't be editable/deletable until saved to DB
        combined.push({
          ...local,
          _id: `local-${local.title.toLowerCase().replace(/\s+/g, '-')}`,
          isLocal: true
        } as any);
      }
    });

    return NextResponse.json(combined);
  } catch (error: unknown) {
    console.error("Database error in skills API:", error);
    return NextResponse.json(localSkills);
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userRole = (session?.user as { role?: string })?.role;
    if (!session || userRole !== "admin") {
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
