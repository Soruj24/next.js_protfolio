import jsPDF from "jspdf";

// This function now fetches the data from the API endpoint
export const generateResumePDF = async () => {
  let resumeData;
  try {
    const res = await fetch("/api/resume");
    if (!res.ok) {
      throw new Error(`Failed to fetch resume data: ${res.statusText}`);
    }
    resumeData = await res.json();
  } catch (error) {
    console.error(error);
    // Inform the user that the download failed
    alert("Failed to download resume data. Please try again later.");
    return; // Stop execution if data fetching fails
  }
  const doc = new jsPDF("p", "pt", "a4");
  const margin = 40;
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 60;

  // Colors
  const primaryColor = "#009dff";
  const textColor = "#212529";
  const secondaryTextColor = "#6c757d";

  // --- Header ---
  doc.setFontSize(26);
  doc.setTextColor(primaryColor);
  doc.setFont("helvetica", "bold");
  doc.text(resumeData.name, pageWidth / 2, yPos, { align: "center" });
  yPos += 22;

  doc.setFontSize(12);
  doc.setTextColor(secondaryTextColor);
  doc.setFont("helvetica", "normal");
  doc.text(resumeData.title, pageWidth / 2, yPos, { align: "center" });
  yPos += 16;

  doc.setFontSize(9);
  doc.text(
    `${resumeData.contact.email} | ${resumeData.contact.phone} | ${resumeData.contact.location}`,
    pageWidth / 2,
    yPos,
    { align: "center" }
  );
  yPos += 30;

  // --- Summary ---
  doc.setFontSize(14);
  doc.setTextColor(primaryColor);
  doc.setFont("helvetica", "bold");
  doc.text("Summary", margin, yPos);
  yPos += 18;

  doc.setFontSize(9);
  doc.setTextColor(textColor);
  doc.setFont("helvetica", "normal");
  const summaryLines = doc.splitTextToSize(resumeData.summary, pageWidth - margin * 2);
  doc.text(summaryLines, margin, yPos);
  yPos += summaryLines.length * 10 + 15;

  // --- Experience ---
  doc.setFontSize(14);
  doc.setTextColor(primaryColor);
  doc.setFont("helvetica", "bold");
  doc.text("Experience", margin, yPos);
  yPos += 18;

  resumeData.experience.forEach((exp: any) => {
    doc.setFontSize(11);
    doc.setTextColor(textColor);
    doc.setFont("helvetica", "bold");
    doc.text(`${exp.role} at ${exp.company}`, margin, yPos);

    doc.setFontSize(10);
    doc.setTextColor(secondaryTextColor);
    doc.setFont("helvetica", "normal");
    doc.text(exp.duration, pageWidth - margin, yPos, { align: "right" });
    yPos += 14;

    doc.setFontSize(9);
    exp.responsibilities.forEach((resp: any) => {
      doc.text(`• ${resp}`, margin + 10, yPos);
      yPos += 12;
    });
    yPos += 8;
  });

  // --- Projects ---
  doc.setFontSize(14);
  doc.setTextColor(primaryColor);
  doc.setFont("helvetica", "bold");
  doc.text("Projects", margin, yPos);
  yPos += 18;

  resumeData.projects.forEach((proj:any) => {
    doc.setFontSize(11);
    doc.setTextColor(textColor);
    doc.setFont("helvetica", "bold");
    doc.text(proj.title, margin, yPos);
    yPos += 14;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const descLines = doc.splitTextToSize(proj.description, pageWidth - margin * 2);
    doc.text(descLines, margin, yPos);
    yPos += descLines.length * 10 + 4;

    doc.setFontSize(8);
    doc.setTextColor(secondaryTextColor);
    doc.text(`Technologies: ${proj.technologies.join(", ")}`, margin, yPos);
    yPos += 20;
  });

  // --- Skills ---
  doc.setFontSize(14);
  doc.setTextColor(primaryColor);
  doc.setFont("helvetica", "bold");
  doc.text("Skills", margin, yPos);
  yPos += 18;

  doc.setFontSize(9);
  doc.setTextColor(primaryColor);
  const skillsText = resumeData.skills.join("  •  ");
  doc.text(skillsText, margin, yPos);
  yPos += 25;

  // --- Education ---
  doc.setFontSize(14);
  doc.setTextColor(primaryColor);
  doc.setFont("helvetica", "bold");
  doc.text("Education", margin, yPos);
  yPos += 18;

  resumeData.education.forEach((edu:any) => {
    doc.setFontSize(10);
    doc.setTextColor(textColor);
    doc.setFont("helvetica", "normal");
    doc.text(`${edu.degree} - ${edu.institution}`, margin, yPos);

    doc.setFontSize(10);
    doc.setTextColor(secondaryTextColor);
    doc.text(`Year: ${edu.year}`, pageWidth - margin, yPos, { align: "right" });
    yPos += 15;
  });

  // Save the PDF
  doc.save(`${resumeData.name.replace(/\s+/g, "_")}_Resume.pdf`);
};
