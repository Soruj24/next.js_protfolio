import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Project } from "@/models/Project";
import { auth } from "@/auth";
import { projects as localProjects } from "@/data/projects";

export async function GET() {
  try {
    await connectDB();
    const dbProjects = await Project.find({}).sort({ createdAt: -1 });
    
    // Combine DB projects with local projects, removing duplicates by id
    const combinedProjects = [...dbProjects];
    
    localProjects.forEach(local => {
      if (!combinedProjects.some(db => db.id === local.id)) {
        combinedProjects.push(local);
      }
    });

    return NextResponse.json(combinedProjects);
  } catch (error: unknown) {
    // If DB fails, fallback to local projects
    console.error("Database connection failed, falling back to local projects:", error);
    return NextResponse.json(localProjects);
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
    const project = await Project.create(data);
    return NextResponse.json(project, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
