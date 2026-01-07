import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { Contact, contactFormSchema } from "@/models/Contact";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate data
    const validation = contactFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, errors: validation.error.format() },
        { status: 400 }
      );
    }

    await connectDB();

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
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
