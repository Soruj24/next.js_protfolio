import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { SkillCategory } from "@/models/Skill";
import { skillCategories as localSkills } from "@/data/skills";
import { isValidObjectId } from "@/lib/utils/validation";
import { requireAdmin } from "@/lib/auth/helpers";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Check if it's a local ID
    if (id.startsWith("local-")) {
      const title = id.replace("local-", "").replace(/-/g, " ");
      const localCategory = localSkills.find(
        (c) => c.title.toLowerCase() === title.toLowerCase(),
      );
      if (localCategory) {
        return NextResponse.json({ ...localCategory, _id: id, isLocal: true });
      }
    }

    await connectDB();
    // Search by _id or title (slug)
    const query = isValidObjectId(id)
      ? { _id: id }
      : { title: new RegExp(`^${id.replace(/-/g, " ")}$`, "i") };
    const category = await SkillCategory.findOne(query);

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(category);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 },
    );
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

    // If it's a local ID, we create a new entry in DB instead of updating
    if (id.startsWith("local-")) {
      const { _id, isLocal, ...rest } = data;
      const category = await SkillCategory.create(rest);
      return NextResponse.json(category);
    }

    // Search by _id or title (slug)
    const query = isValidObjectId(id)
      ? { _id: id }
      : { title: new RegExp(`^${id.replace(/-/g, " ")}$`, "i") };

    const category = await SkillCategory.findOneAndUpdate(query, data, {
      new: true,
      runValidators: true,
      upsert: true,
    });

    return NextResponse.json(category);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 },
    );
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

    // Search by _id or title (slug)
    const query = isValidObjectId(id)
      ? { _id: id }
      : { title: new RegExp(`^${id.replace(/-/g, " ")}$`, "i") };
    const category = await SkillCategory.findOneAndDelete(query);

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
