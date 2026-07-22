import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

 
const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10.5, fontFamily: "Helvetica", color: "#222" },
  name: { fontSize: 22, fontWeight: 700, marginBottom: 2, color: "#0f5c56" },
  role: { fontSize: 11, color: "#444", marginBottom: 8 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 14, fontSize: 9, color: "#555" },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: "#0f5c56",
    textTransform: "uppercase",
    marginTop: 14,
    marginBottom: 6,
    borderBottom: "1pt solid #ddd",
    paddingBottom: 3,
  },
  paragraph: { marginBottom: 5, lineHeight: 1.4 },
  skillRow: { flexDirection: "row", marginBottom: 3 },
  skillLabel: { width: 80, fontWeight: 700, color: "#b8862e" },
  skillItems: { flex: 1, color: "#333" },
  projectTitle: { fontSize: 11, fontWeight: 700, marginTop: 8, marginBottom: 2 },
  projectDesc: { marginBottom: 2, color: "#333", lineHeight: 1.4 },
  projectMeta: { fontSize: 9, color: "#777" },
  pillRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 4 },
});

// Match this to the shape returned by GET /api/resume
type ResumeData = {
  name: string;
  role: string;
  location?: string;
  email?: string;
  phone?: string;
  github?: string;
  portfolio?: string;
  linkedin?: string;
  summary: string[];
  skills: { label: string; items: string }[];
  projects: { title: string; desc: string; tags: string[]; stack: string }[];
  education: { title: string; institute: string }[];
  competencies: string[];
  softSkills: string[];
  languages: string[];
};

export default function ResumePDFDocument({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.role}>{data.role}</Text>

        <View style={styles.contactRow}>
          {data.location ? <Text>{data.location}</Text> : null}
          {data.email ? <Text>{data.email}</Text> : null}
          {data.phone ? <Text>{data.phone}</Text> : null}
          {data.github ? <Text>{data.github}</Text> : null}
          {data.portfolio ? <Text>{data.portfolio}</Text> : null}
          {data.linkedin ? <Text>{data.linkedin}</Text> : null}
        </View>

        <Text style={styles.sectionTitle}>Summary</Text>
        {data.summary.map((p, i) => (
          <Text key={i} style={styles.paragraph}>{p}</Text>
        ))}

        <Text style={styles.sectionTitle}>Technical Skills</Text>
        {data.skills.map((s, i) => (
          <View key={i} style={styles.skillRow}>
            <Text style={styles.skillLabel}>{s.label}</Text>
            <Text style={styles.skillItems}>{s.items}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Projects</Text>
        {data.projects.map((p, i) => (
          <View key={i}>
            <Text style={styles.projectTitle}>{p.title}</Text>
            <Text style={styles.projectDesc}>{p.desc}</Text>
            <Text style={styles.projectMeta}>{p.tags.join(" · ")}</Text>
            <Text style={styles.projectMeta}>{p.stack}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map((e, i) => (
          <Text key={i} style={styles.paragraph}>{e.title} — {e.institute}</Text>
        ))}

        <Text style={styles.sectionTitle}>Competencies &amp; Languages</Text>
        <Text style={styles.paragraph}>{data.competencies.join(" · ")}</Text>
        <Text style={styles.paragraph}>{data.softSkills.join(" · ")}</Text>
        <Text style={styles.paragraph}>{data.languages.join(" · ")}</Text>
      </Page>
    </Document>
  );
}