import { STYLES } from "./styles"
import { Email, Phone, Location, GitHub } from "./icons"

export default function ResumeHeader({
  fullName,
  title,
  email,
  phone,
  location,
  github,
}: {
  fullName: string
  title: string
  email: string
  phone: string
  location: string
  github: string
}) {
  return (
    <div
      style={{
        textAlign: "center",
        marginBottom: "25px",
        borderBottom: "2px solid #0f172a",
        paddingBottom: "20px",
      }}
    >
      <h1 style={STYLES.HEADER.title}>{fullName}</h1>
      <p style={STYLES.HEADER.subtitle}>{title}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          color: "#475569",
          fontSize: "11px",
          fontWeight: 500,
          marginTop: "5px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Email />
          <span>{email}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Phone />
          <span>{phone}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Location />
          <span>{location}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <GitHub />
          <span>github.com/{github}</span>
        </div>
      </div>
    </div>
  )
}
