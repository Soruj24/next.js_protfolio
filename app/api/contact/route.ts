import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Contact } from "@/models/Contact";
import { contactFormSchema } from "@/lib/schemas/contact";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const userRole = (session?.user as { role?: string })?.role;
    if (!session || (userRole !== "admin" && userRole !== "editor")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body" },
        { status: 400 },
      );
    }

    // Validate data
    const validation = contactFormSchema.safeParse(body);
    if (!validation.success) {
      const errorMessages = validation.error.issues
        .map((err: { message: string }) => err.message)
        .join(", ");
      return NextResponse.json(
        {
          success: false,
          message: errorMessages,
          errors: validation.error.format(),
        },
        { status: 400 },
      );
    }

    try {
      await connectDB();
    } catch (dbError: unknown) {
      const message = dbError instanceof Error ? dbError.message : "Database connection failed";
      console.error("Database connection error in Contact API:", dbError);
      return NextResponse.json(
        { success: false, message: `Database connection failed: ${message}` },
        { status: 500 },
      );
    }

    try {
      const contact = await Contact.create({
        ...validation.data,
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
      });

      return NextResponse.json({
        success: true,
        message: "Message sent successfully!",
        id: contact._id,
      });
    } catch (saveError: unknown) {
      const message = saveError instanceof Error ? saveError.message : "Failed to save message";
      console.error("Data save error in Contact API:", saveError);
      return NextResponse.json(
        { success: false, message: `Failed to save message: ${message}` },
        { status: 500 },
      );
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    const stack = error instanceof Error ? error.stack : undefined;
    console.error("Contact API error details:", {
      message,
      stack,
      error
    });
    return NextResponse.json(
      { 
        success: false, 
        message: message || "Internal server error",
        stack: process.env.NODE_ENV === "development" ? stack : undefined
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    const userRole = (session?.user as { role?: string })?.role;
    if (!session || (userRole !== "admin" && userRole !== "editor")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await connectDB();
    await Contact.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
