import jsPDF from "jspdf";
import resumeData from "@/data/Resume.json";

export const generateResumePDF = () => {
  const doc = new jsPDF("p", "pt", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  const leftColumnX = margin;
  const rightColumnX = 180;
  const rightColumnWidth = pageWidth - rightColumnX - margin;
  let yPos = 0;

  // Colors & Fonts
  const primaryColor = "#009dff";
  const textColor = "#333333";
  const secondaryTextColor = "#6c757d";
  doc.setFont("helvetica");

  // --- Header ---
  yPos += 60;
  doc.setFontSize(32);
  doc.setTextColor(primaryColor);
  doc.setFont("helvetica", "bold");
  doc.text(resumeData.name, pageWidth / 2, yPos, { align: "center" });
  yPos += 30;

  doc.setFontSize(14);
  doc.setTextColor(textColor);
  doc.setFont("helvetica", "normal");
  doc.text(resumeData.title, pageWidth / 2, yPos, { align: "center" });
  yPos += 18;

  doc.setFontSize(10);
  doc.setTextColor(secondaryTextColor);
  const contactInfo = `${resumeData.contact.email} | ${resumeData.contact.phone} | ${resumeData.contact.location}`;
  doc.text(contactInfo, pageWidth / 2, yPos, { align: "center" });
  yPos += 50;

  // --- Helper function for sections ---
  const renderSection = (title: string, content: () => void, startY?: number) => {
    const initialY = startY || yPos;
    doc.setFontSize(14);
    doc.setTextColor(primaryColor);
    doc.setFont("helvetica", "bold");
    doc.text(title, leftColumnX, initialY);

    content();
    
    yPos = Math.max(yPos, initialY) + 25; // Add space after the section

    if (yPos > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        yPos = margin;
    }
  };

  // --- Summary Section ---
  let summaryY = yPos;
  renderSection("Summary", () => {
    doc.setFontSize(10);
    doc.setTextColor(textColor);
    doc.setFont("helvetica", "normal");
    const summaryLines = doc.splitTextToSize(resumeData.summary, rightColumnWidth);
    doc.text(summaryLines, rightColumnX, summaryY);
    yPos = summaryY + summaryLines.length * 12;
  }, summaryY);

  // --- Experience Section ---
  let experienceY = yPos;
  renderSection("Experience", () => {
    let currentY = experienceY;
    resumeData.experience.forEach((exp: any, index: number) => {
      if (index > 0) currentY += 20;
      doc.setFontSize(12);
      doc.setTextColor(textColor);
      doc.setFont("helvetica", "bold");
      doc.text(exp.role, rightColumnX, currentY);
      
      doc.setFontSize(10);
      doc.setTextColor(secondaryTextColor);
      doc.setFont("helvetica", "normal");
      doc.text(exp.duration, pageWidth - margin, currentY, { align: "right" });
      currentY += 14;

      doc.setFont("helvetica", "italic");
      doc.text(exp.company, rightColumnX, currentY);
      currentY += 16;

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      exp.responsibilities.forEach((resp: string) => {
        const respLines = doc.splitTextToSize(`• ${resp}`, rightColumnWidth - 10);
        doc.text(respLines, rightColumnX + 5, currentY);
        currentY += respLines.length * 11 + 2;
      });
    });
    yPos = currentY;
  }, experienceY);

  // --- Projects Section ---
  let projectsY = yPos;
  renderSection("Projects", () => {
    let currentY = projectsY;
    resumeData.projects.forEach((proj: any, index: number) => {
      if (index > 0) currentY += 20;
      doc.setFontSize(12);
      doc.setTextColor(textColor);
      doc.setFont("helvetica", "bold");
      doc.text(proj.title, rightColumnX, currentY);
      currentY += 14;

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      const descLines = doc.splitTextToSize(proj.description, rightColumnWidth);
      doc.text(descLines, rightColumnX, currentY);
      currentY += descLines.length * 11 + 6;

      doc.setFontSize(8);
      doc.setTextColor(secondaryTextColor);
      doc.setFont("helvetica", "italic");
      doc.text(`Technologies: ${proj.technologies.join(", ")}`, rightColumnX, currentY);
      currentY += 11;
    });
    yPos = currentY;
  }, projectsY);

  // --- Skills Section ---
  let skillsY = yPos;
  renderSection("Skills", () => {
    doc.setFontSize(10);
    doc.setTextColor(textColor);
    doc.setFont("helvetica", "normal");
    const skillsText = resumeData.skills.join(", ");
    const skillLines = doc.splitTextToSize(skillsText, rightColumnWidth);
    doc.text(skillLines, rightColumnX, skillsY);
    yPos = skillsY + skillLines.length * 12;
  }, skillsY);

  // --- Education Section ---
  let educationY = yPos;
  renderSection("Education", () => {
    let currentY = educationY;
    resumeData.education.forEach((edu: any, index: number) => {
      if (index > 0) currentY += 15;
      doc.setFontSize(12);
      doc.setTextColor(textColor);
      doc.setFont("helvetica", "bold");
      doc.text(edu.institution, rightColumnX, currentY);
      currentY += 14;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(secondaryTextColor);
      doc.text(`${edu.degree} | ${edu.year}`, rightColumnX, currentY);
      currentY += 11;
    });
    yPos = currentY;
  }, educationY);

  // --- Save the PDF ---
  doc.save(`${resumeData.name.replace(/\s+/g, "_")}_Resume.pdf`);
};
