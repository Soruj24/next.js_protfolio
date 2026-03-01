import { STYLES } from "./styles"

export default function ProjectsGrid({
  projects,
}: {
  projects: Array<{ title: string; description: string; technologies: string[] }>
}) {
  if (!projects || projects.length === 0) return null
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3 style={STYLES.SECTION.title}>KEY PROJECTS & CONTRIBUTIONS</h3>
      <div style={{ padding: "0 5px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
          }}
        >
          {projects.map((project, idx) => (
            <div
              key={`project-${idx}`}
              style={{
                borderLeft: "2px solid #3b82f6",
                paddingLeft: "15px",
                paddingTop: "5px",
                paddingBottom: "5px",
              }}
            >
              <h4
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: "0 0 6px 0",
                  lineHeight: "1.3",
                }}
              >
                {project.title}
              </h4>
              <p
                style={{
                  fontSize: "10.5px",
                  color: "#475569",
                  lineHeight: "1.4",
                  margin: "0 0 8px 0",
                  textAlign: "justify",
                }}
              >
                {project.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {project.technologies.slice(0, 4).map((tech, tIdx) => (
                  <span
                    key={`project-tech-${idx}-${tIdx}`}
                    style={{
                      fontSize: "8.5px",
                      color: "#3b82f6",
                      fontWeight: 700,
                      backgroundColor: "#eff6ff",
                      padding: "1px 6px",
                      borderRadius: "3px",
                    }}
                  >
                    #{tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
