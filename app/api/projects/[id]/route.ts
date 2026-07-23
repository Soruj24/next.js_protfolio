import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Project } from "@/models/Project";
import { isValidObjectId } from "@/lib/utils/validation";
import { requireAdmin } from "@/lib/auth/helpers";
import { notify } from "@/lib/services/notification";

function getQuery(id: string) {
  return isValidObjectId(id) ? { _id: id } : { id: id };
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const project = await Project.findOne(getQuery(id));

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message || "Unknown error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;

    const data = await req.json();
    await connectDB();

    const project = await Project.findOneAndUpdate(getQuery(id), data, {
      new: true,
      runValidators: true,
      upsert: true,
    });

    notify.projectUpdated(project?.title || project?.name || "Untitled", id);
    return NextResponse.json(project);
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message || "Unknown error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;

    await connectDB();
    const project = await Project.findOneAndDelete(getQuery(id));

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    notify.projectDeleted(project.title || project.name || "Untitled");
    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message || "Unknown error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { session, error: authError } = await requireAdmin();
    if (authError) return authError;

    const { action, data: actionData } = await req.json();
    await connectDB();

    const query = getQuery(id);

    switch (action) {
      case "duplicate": {
        const original = await Project.findOne(query);
        if (!original) {
          return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        const duplicateData = original.toObject();
        delete duplicateData._id;
        delete duplicateData.createdAt;
        delete duplicateData.updatedAt;
        duplicateData.id = `${original.id}-copy-${Date.now()}`;
        duplicateData.title = `${original.title} (Copy)`;
        duplicateData.featured = false;
        duplicateData.archived = false;
        duplicateData.published = false;
        duplicateData.order = 0;
        duplicateData.versions = [];

        const duplicate = await Project.create(duplicateData);
        return NextResponse.json(duplicate, { status: 201 });
      }
      case "archive": {
        const project = await Project.findOneAndUpdate(query, { $set: { archived: actionData?.archived ?? true } }, { new: true });
        if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
        return NextResponse.json(project);
      }
      case "publish": {
        const project = await Project.findOneAndUpdate(query, { $set: { published: actionData?.published ?? true } }, { new: true });
        if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
        if (actionData?.published) notify.projectPublished(project.title || project.name || "Untitled", id);
        return NextResponse.json(project);
      }
      case "feature": {
        const project = await Project.findOneAndUpdate(query, { $set: { featured: actionData?.featured ?? true } }, { new: true });
        if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
        return NextResponse.json(project);
      }
      case "save-version": {
        const project = await Project.findOne(query);
        if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

        const versionNumber = (project.versions?.length || 0) + 1;
        const snapshot = project.toObject();
        delete snapshot._id;
        delete snapshot.versions;
        delete snapshot.createdAt;
        delete snapshot.updatedAt;

        project.versions = project.versions || [];
        project.versions.push({
          version: versionNumber,
          label: actionData?.label || `Version ${versionNumber}`,
          snapshot,
          savedAt: new Date(),
        });

        await project.save();
        return NextResponse.json(project);
      }
      case "reorder": {
        const project = await Project.findOneAndUpdate(query, { $set: { order: actionData?.order ?? 0 } }, { new: true });
        if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
        return NextResponse.json(project);
      }
      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message || "Unknown error" }, { status: 500 });
  }
}
