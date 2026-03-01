import { STYLES } from "./styles"

export default function ResumeSummary({ text }: { text: string }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3 style={STYLES.SECTION.title}>PROFESSIONAL SUMMARY</h3>
      <p
        style={{
          fontSize: "12px",
          color: "#334155",
          lineHeight: "1.5",
          textAlign: "left",
          margin: "0",
          padding: "0 5px",
        }}
      >
        {text}
      </p>
    </div>
  )
}
