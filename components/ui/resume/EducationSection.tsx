import { STYLES } from "./styles"

export default function EducationSection({
  education,
  additional,
}: {
  education: string
  additional?: string
}) {
  if (!education) return null
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3 style={STYLES.SECTION.title}>EDUCATION</h3>
      <div style={{ padding: "0 5px" }}>
        <p
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "#0f172a",
            margin: "0 0 5px 0",
          }}
        >
          {education}
        </p>
        {additional && (
          <p
            style={{
              fontSize: "11px",
              color: "#475569",
              lineHeight: "1.5",
              margin: "0",
              textAlign: "justify",
            }}
          >
            {additional}
          </p>
        )}
      </div>
    </div>
  )
}
