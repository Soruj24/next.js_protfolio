import { STYLES } from "./styles"
import { Briefcase } from "./icons"

export default function ExperienceList({
  items,
}: {
  items: Array<{ role: string; company: string; year: string; description: string; technologies?: string[] }>
}) {
  if (!items || items.length === 0) return null
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3 style={STYLES.SECTION.title}>PROFESSIONAL EXPERIENCE</h3>
      <div style={{ padding: "0 5px" }}>
        {items.map((exp, idx) => (
          <div
            key={`exp-${idx}`}
            style={{
              marginBottom: "15px",
              paddingBottom: "15px",
              borderBottom: idx === items.length - 1 ? "none" : "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "5px",
              }}
            >
              <div>
                <h4
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#0f172a",
                    margin: "0 0 3px 0",
                  }}
                >
                  {exp.role}
                </h4>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#475569",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Briefcase />
                  {exp.company}
                </div>
              </div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#1e40af",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {exp.year}
              </span>
            </div>
            <p
              style={{
                fontSize: "11px",
                color: "#475569",
                lineHeight: "1.5",
                textAlign: "justify",
                margin: "8px 0 10px 0",
              }}
            >
              {exp.description}
            </p>
            {exp.technologies && exp.technologies.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {exp.technologies.map((tech, tIdx) => (
                  <span
                    key={`tech-${idx}-${tIdx}`}
                    style={{
                      fontSize: "9px",
                      backgroundColor: "#f8fafc",
                      color: "#475569",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      fontWeight: 600,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
