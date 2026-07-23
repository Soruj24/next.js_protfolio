import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";

import ResumePDFDocument from "@/components/ResumePDFDocument";
import { connectDB } from "@/config/db";
import Resume from "@/models/Resume";

 
export async function GET() {
  await connectDB();
  const resume = await Resume.findOne({});

  if (!resume) {
    return NextResponse.json(
      { error: "No resume data found" },
      { status: 404 },
    );
  }

  const buffer = await renderToBuffer(
    <ResumePDFDocument data={resume.toObject()} />,
  );

  // Buffer isn't directly assignable to BodyInit under strict TS/DOM lib
  // typing — Uint8Array is, and a Buffer already *is* a Uint8Array at
  // runtime, so this is a type-level fix only, no behavior change.
  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Soruj_Mahmud_Resume.pdf"',
    },
  });
}
