import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Project } from "@/models/Project";
import { isValidObjectId } from "@/lib/utils/validation";
import { requireAdmin } from "@/lib/auth/helpers";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    
    // Search by _id or slug id
    const query = isValidObjectId(id) ? { _id: id } : { id: id };
    const project = await Project.findOne(query);
    
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
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
    
    // Search by _id or slug id
    const query = isValidObjectId(id) ? { _id: id } : { id: id };
    
    const project = await Project.findOneAndUpdate(query, data, {
      new: true,
      runValidators: true,
      upsert: true, // Create if doesn't exist (useful for local projects being edited)
    });

    return NextResponse.json(project);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
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
    
    // Search by _id or slug id
    const query = isValidObjectId(id) ? { _id: id } : { id: id };
    const project = await Project.findOneAndDelete(query);
    
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
