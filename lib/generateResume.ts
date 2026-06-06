import jsPDF from "jspdf"
import resumeData from "@/data/Resume.json"

const COLORS = { primary: "#009dff", text: "#333333", secondary: "#6c757d" }

function renderHeader(doc: jsPDF, pageWidth: number) {
  doc.setFontSize(32)
  doc.setTextColor(COLORS.primary)
  doc.setFont("helvetica", "bold")
  doc.text(resumeData.name, pageWidth / 2, 60, { align: "center" })

  doc.setFontSize(14)
  doc.setTextColor(COLORS.text)
  doc.setFont("helvetica", "normal")
  doc.text(resumeData.title, pageWidth / 2, 90, { align: "center" })

  doc.setFontSize(10)
  doc.setTextColor(COLORS.secondary)
  const contact = `${resumeData.contact.email} | ${resumeData.contact.phone} | ${resumeData.contact.location}`
  doc.text(contact, pageWidth / 2, 108, { align: "center" })
}

function renderSection(
  doc: jsPDF,
  title: string,
  margin: number,
  x: number,
  pageWidth: number,
  content: () => number,
): number {
  const leftX = margin
  doc.setFontSize(14)
  doc.setTextColor(COLORS.primary)
  doc.setFont("helvetica", "bold")
  doc.text(title, leftX, x)

  const yEnd = content()

  let yPos = Math.max(x, yEnd) + 25
  if (yPos > doc.internal.pageSize.getHeight() - margin) {
    doc.addPage()
    yPos = margin
  }
  return yPos
}

function renderSummary(doc: jsPDF, rightX: number, rightWidth: number, y: number): number {
  doc.setFontSize(10)
  doc.setTextColor(COLORS.text)
  doc.setFont("helvetica", "normal")
  const lines = doc.splitTextToSize(resumeData.summary, rightWidth)
  doc.text(lines, rightX, y)
  return y + lines.length * 12
}

function renderExperience(doc: jsPDF, rightX: number, pageWidth: number, y: number): number {
  let currentY = y
  resumeData.experience.forEach((exp: any, index: number) => {
    if (index > 0) currentY += 20
    doc.setFontSize(12)
    doc.setTextColor(COLORS.text)
    doc.setFont("helvetica", "bold")
    doc.text(exp.role, rightX, currentY)
    doc.setFontSize(10)
    doc.setTextColor(COLORS.secondary)
    doc.setFont("helvetica", "normal")
    doc.text(exp.duration, pageWidth - 40, currentY, { align: "right" })
    currentY += 14
    doc.setFont("helvetica", "italic")
    doc.text(exp.company, rightX, currentY)
    currentY += 16
    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    exp.responsibilities.forEach((resp: string) => {
      const lines = doc.splitTextToSize(`• ${resp}`, (pageWidth - rightX - 40) - 10)
      doc.text(lines, rightX + 5, currentY)
      currentY += lines.length * 11 + 2
    })
  })
  return currentY
}

function renderProjects(doc: jsPDF, rightX: number, rightWidth: number, pageWidth: number, y: number): number {
  let currentY = y
  resumeData.projects.forEach((proj: any, index: number) => {
    if (index > 0) currentY += 20
    doc.setFontSize(12)
    doc.setTextColor(COLORS.text)
    doc.setFont("helvetica", "bold")
    doc.text(proj.title, rightX, currentY)
    currentY += 14
    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    const descLines = doc.splitTextToSize(proj.description, rightWidth)
    doc.text(descLines, rightX, currentY)
    currentY += descLines.length * 11 + 6
    doc.setFontSize(8)
    doc.setTextColor(COLORS.secondary)
    doc.setFont("helvetica", "italic")
    doc.text(`Technologies: ${proj.technologies.join(", ")}`, rightX, currentY)
    currentY += 12
    let linkX = rightX
    if (proj.live_link) {
      doc.setFontSize(9)
      doc.setTextColor(COLORS.primary)
      doc.textWithLink("Live Demo", linkX, currentY, { url: proj.live_link })
      linkX += doc.getTextWidth("Live Demo") + 20
    }
    if (proj.github_link) {
      doc.setFontSize(9)
      doc.setTextColor(COLORS.primary)
      doc.textWithLink("GitHub", linkX, currentY, { url: proj.github_link })
    }
    if (proj.live_link || proj.github_link) currentY += 11
  })
  return currentY
}

function renderSkills(doc: jsPDF, rightX: number, rightWidth: number, y: number): number {
  doc.setFontSize(10)
  doc.setTextColor(COLORS.text)
  doc.setFont("helvetica", "normal")
  const lines = doc.splitTextToSize(resumeData.skills.join(", "), rightWidth)
  doc.text(lines, rightX, y)
  return y + lines.length * 12
}

function renderEducation(doc: jsPDF, rightX: number, y: number): number {
  let currentY = y
  resumeData.education.forEach((edu: any, index: number) => {
    if (index > 0) currentY += 15
    doc.setFontSize(12)
    doc.setTextColor(COLORS.text)
    doc.setFont("helvetica", "bold")
    doc.text(edu.institution, rightX, currentY)
    currentY += 14
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(COLORS.secondary)
    doc.text(`${edu.degree} | ${edu.year}`, rightX, currentY)
    currentY += 11
  })
  return currentY
}

export const generatePDF = () => {
  const doc = new jsPDF("p", "pt", "a4")
  const margin = 40
  const pageWidth = doc.internal.pageSize.getWidth()
  const rightX = 180
  const rightWidth = pageWidth - rightX - margin

  renderHeader(doc, pageWidth)

  let y = 160
  y = renderSection(doc, "Summary", margin, y, pageWidth, () => renderSummary(doc, rightX, rightWidth, y))
  y = renderSection(doc, "Experience", margin, y, pageWidth, () => renderExperience(doc, rightX, pageWidth, y))
  y = renderSection(doc, "Projects", margin, y, pageWidth, () => renderProjects(doc, rightX, rightWidth, pageWidth, y))
  y = renderSection(doc, "Skills", margin, y, pageWidth, () => renderSkills(doc, rightX, rightWidth, y))
  y = renderSection(doc, "Education", margin, y, pageWidth, () => renderEducation(doc, rightX, y))

  doc.save(`${resumeData.name.replace(/\s+/g, "_")}_Resume.pdf`)
}
