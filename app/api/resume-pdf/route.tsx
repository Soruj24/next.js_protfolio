import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";

import ResumePDFDocument from "@/components/ResumePDFDocument";
import { buildResumeData } from "@/lib/resume/resume-mapper";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await buildResumeData();

  const buffer = await renderToBuffer(
    <ResumePDFDocument data={data} />,
  );

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${data.name.replace(/\s+/g, "_")}_Resume.pdf"`,
    },
  });
}
