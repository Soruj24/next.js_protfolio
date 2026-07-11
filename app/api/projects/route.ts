import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Project } from "@/models/Project";
import { requireAdmin } from "@/lib/auth/helpers";
import { notify } from "@/lib/services/notification";

export async function GET() {
  try {
    await connectDB();
    const dbProjects = await Project.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(dbProjects);
  } catch (error: unknown) {
    console.error("Database error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;

    const data = await req.json();
    await connectDB();
    const project = await Project.create(data);
    notify.projectPublished(project.title || project.name || "Untitled", String(project._id));
    return NextResponse.json(project, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;

    const { action, ids, data } = await req.json();
    await connectDB();

    switch (action) {
      case "bulk-delete": {
        const result = await Project.deleteMany({ _id: { $in: ids } });
        return NextResponse.json({ deleted: result.deletedCount });
      }
      case "bulk-archive": {
        const result = await Project.updateMany({ _id: { $in: ids } }, { $set: { archived: data?.archived ?? true } });
        return NextResponse.json({ modified: result.modifiedCount });
      }
      case "bulk-publish": {
        const result = await Project.updateMany({ _id: { $in: ids } }, { $set: { published: data?.published ?? true } });
        return NextResponse.json({ modified: result.modifiedCount });
      }
      case "bulk-feature": {
        const result = await Project.updateMany({ _id: { $in: ids } }, { $set: { featured: data?.featured ?? true } });
        return NextResponse.json({ modified: result.modifiedCount });
      }
      case "bulk-order": {
        const updates = ids.map((id: string, index: number) => ({
          updateOne: { filter: { _id: id }, update: { $set: { order: index } } },
        }));
        const result = await Project.bulkWrite(updates);
        return NextResponse.json({ modified: result.modifiedCount });
      }
      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
