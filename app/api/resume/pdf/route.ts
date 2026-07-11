import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";

function getChromePath(): string | undefined {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;

  const paths = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    ...(process.env.LOCALAPPDATA
      ? [`${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`]
      : []),
  ];

  return paths.find((p) => {
    try {
      const fs = require("fs");
      return fs.existsSync(p);
    } catch {
      return false;
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const chromePath = getChromePath();
    if (!chromePath) {
      return NextResponse.json(
        { error: "Chrome not found. Install Chrome or set CHROME_PATH env." },
        { status: 500 },
      );
    }

    const browser = await puppeteer.launch({
      executablePath: chromePath,
      args: ["--no-sandbox", "--headless=new"],
    });

    try {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
      await page.emulateMediaType("print");

      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "18mm", bottom: "18mm", left: "16mm", right: "16mm" },
      });

      return new NextResponse(Buffer.from(pdf), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition":
            'attachment; filename="soruj-mahmud-resume.pdf"',
        },
      });
    } finally {
      await browser.close();
    }
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 },
    );
  }
}
