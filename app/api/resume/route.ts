import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Resume } from "@/models/Resume";
import { auth } from "@/auth";

// GET - Fetch the single resume document
export async function GET() {
  try {
    await connectDB();
    // There should only be one resume document. We find it.
    const resume = await Resume.findOne();
    if (!resume) {
      // If no resume exists, create a default one to avoid errors on first load
      const defaultResume = await new Resume({
        name: "Your Name",
        title: "Your Title",
        contact: { email: "email@example.com", phone: "123456", location: "Your City" },
        summary: "A brief summary about you.",
        experience: [],
        projects: [],
        skills: [],
        education: [],
      }).save();
      return NextResponse.json(defaultResume);
    }
    return NextResponse.json(resume);
  } catch (error) {
    console.error("Failed to fetch resume data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load resume data." },
      { status: 500 }
    );
  }
}

// POST - Update the single resume document
export async function POST(request: Request) {
  const session = await auth();
  if ((session?.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const newData = await request.json();
    
    // Since there's only one resume, we find and update it.
    // The `upsert: true` option will create it if it doesn't exist.
    const updatedResume = await Resume.findOneAndUpdate({}, newData, {
      new: true,
      upsert: true, // Create a new document if one doesn't exist
      runValidators: true,
    });

    return NextResponse.json({
      success: true,
      message: "Resume updated successfully!",
      data: updatedResume,
    });
  } catch (error) {
    console.error("Failed to update resume data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update resume." },
      { status: 500 }
    );
  }
}
