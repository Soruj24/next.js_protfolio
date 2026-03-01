import { STYLES } from "./styles"

export default function SkillsGrid({
  categories,
}: {
  categories: Array<{ title: string; skills: { name: string }[] }>
}) {
  if (!categories || categories.length === 0) return null
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3 style={STYLES.SECTION.title}>TECHNICAL EXPERIENCE</h3>
      <div
        style={{
          padding: "0 5px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {categories.map((category, idx) => (
          <div key={`skill-cat-${idx}`} style={{ marginBottom: "0" }}>
            <h4
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#1e40af",
                margin: "0 0 6px 0",
                textTransform: "uppercase",
              }}
            >
              {category.title}
            </h4>
            <ul
              style={{
                fontSize: "11px",
                color: "#1e293b",
                fontWeight: 500,
                margin: "0",
                padding: "0",
                listStyle: "none",
              }}
            >
              {category.skills.map((skill, skillIdx) => (
                <li
                  key={`skill-${idx}-${skillIdx}`}
                  style={{ marginBottom: "2px", lineHeight: "1.4" }}
                >
                  • {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
