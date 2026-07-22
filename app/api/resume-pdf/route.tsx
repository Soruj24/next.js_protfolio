import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { connectDB } from "@/config/db";
import Resume from "@/models/Resume";
import ResumePDFDocument from "@/components/ResumePDFDocument";

/**
 * GET /api/resume-pdf
 *
 * Point your "Download Resume" button straight at this URL:
 *   <a href="/api/resume-pdf" download="Soruj_Mahmud_Resume.pdf">Download Resume</a>
 *
 * Every time someone clicks it, this route:
 * 1. Reads whatever is currently saved in MongoDB (i.e. whatever your
 *    admin panel last saved)
 * 2. Renders a fresh PDF from that data
 * 3. Streams it back as a file download
 *
 * So there is no "regenerate/re-upload" step — admin panel save = PDF updated.
 */
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

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Soruj_Mahmud_Resume.pdf"',
    },
  });
}
