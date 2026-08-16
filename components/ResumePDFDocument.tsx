import { Document, Page, Text, View, Link as PdfLink, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: "40 45",
    fontSize: 9.5,
    fontFamily: "Helvetica",
    color: "#1a1a1a",
    lineHeight: 1.4,
  },

  /* Header */
  name: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 2,
    color: "#1a1a1a",
    letterSpacing: 0.5,
  },
  headline: {
    fontSize: 10,
    fontWeight: 500,
    color: "#333",
    marginBottom: 1,
  },
  subline: {
    fontSize: 9,
    color: "#666",
    marginBottom: 6,
    fontStyle: "italic",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
    fontSize: 8.5,
    color: "#444",
  },
  contactLink: {
    fontSize: 8.5,
    color: "#444",
    textDecoration: "underline",
  },

  /* Section */
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: "#1a1a1a",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginTop: 10,
    marginBottom: 4,
    borderBottom: "0.75pt solid #999",
    paddingBottom: 2,
  },
  paragraph: {
    marginBottom: 3,
    lineHeight: 1.35,
    fontSize: 9,
    color: "#222",
  },

  /* Skills */
  skillRow: {
    flexDirection: "row",
    marginBottom: 2,
    fontSize: 9,
  },
  skillLabel: {
    width: 70,
    fontWeight: 700,
    color: "#333",
  },
  skillItems: {
    flex: 1,
    color: "#222",
  },

  /* Projects */
  projectBlock: {
    marginBottom: 6,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 1,
  },
  projectTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: "#111",
  },
  projectLinks: {
    flexDirection: "row",
    gap: 8,
  },
  projectLink: {
    fontSize: 8,
    color: "#444",
    textDecoration: "underline",
  },
  projectDesc: {
    fontSize: 9,
    color: "#222",
    marginBottom: 2,
    lineHeight: 1.35,
  },
  projectTags: {
    fontSize: 8,
    color: "#555",
    marginBottom: 1,
  },
  projectStack: {
    fontSize: 8,
    color: "#666",
    fontFamily: "Courier",
  },

  /* Education */
  eduItem: {
    fontSize: 9,
    marginBottom: 2,
  },
  eduTitle: {
    fontWeight: 600,
    color: "#222",
  },
  eduInstitute: {
    color: "#555",
  },

  /* Competencies */
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  pill: {
    fontSize: 8,
    color: "#333",
    border: "0.5pt solid #bbb",
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
});

type ResumeData = {
  name: string;
  headline: string;
  subline: string;
  location?: string;
  email?: string;
  phone?: string;
  github?: string;
  portfolio?: string;
  linkedin?: string;
  summary: string[];
  skills: { label: string; items: string }[];
  projects: {
    title: string;
    desc: string;
    tags: string[];
    stack: string;
    githubUrl?: string;
    liveUrl?: string;
    documentationUrl?: string;
    caseStudyUrl?: string;
    demoVideoUrl?: string;
  }[];
  education: { title: string; institute: string }[];
  competencies: string[];
  languages: string[];
};

function ContactSeparator() {
  return <Text style={{ color: "#999" }}>|</Text>;
}

export default function ResumePDFDocument({ data }: { data: ResumeData }) {
  const contactItems: { label: string; href?: string }[] = [];

  if (data.location) contactItems.push({ label: data.location });
  if (data.email) contactItems.push({ label: data.email, href: `mailto:${data.email}` });
  if (data.phone) contactItems.push({
    label: data.phone,
    href: `tel:${data.phone.replace(/[\s\-()]/g, "")}`,
  });
  if (data.github) contactItems.push({ label: "GitHub", href: data.github });
  if (data.portfolio) contactItems.push({ label: "Portfolio", href: data.portfolio });
  if (data.linkedin) contactItems.push({ label: "LinkedIn", href: data.linkedin });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.headline}>{data.headline}</Text>
        {data.subline ? <Text style={styles.subline}>{data.subline}</Text> : null}

        <View style={styles.contactRow}>
          {contactItems.map((item, i) => (
            <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              {i > 0 && <ContactSeparator />}
              {item.href ? (
                <PdfLink src={item.href} style={styles.contactLink}>
                  {item.label}
                </PdfLink>
              ) : (
                <Text>{item.label}</Text>
              )}
            </View>
          ))}
        </View>

        {/* Professional Summary */}
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        {data.summary.map((p, i) => (
          <Text key={i} style={styles.paragraph}>{p}</Text>
        ))}

        {/* Technical Skills */}
        <Text style={styles.sectionTitle}>Technical Skills</Text>
        {data.skills.map((s, i) => (
          <View key={i} style={styles.skillRow}>
            <Text style={styles.skillLabel}>{s.label}</Text>
            <Text style={styles.skillItems}>{s.items}</Text>
          </View>
        ))}

        {/* Projects */}
        <Text style={styles.sectionTitle}>Projects</Text>
        {data.projects.map((p, i) => (
          <View key={i} style={styles.projectBlock}>
            <View style={styles.projectHeader}>
              <Text style={styles.projectTitle}>{p.title}</Text>
              <View style={styles.projectLinks}>
                {p.githubUrl ? (
                  <PdfLink src={p.githubUrl} style={styles.projectLink}>GitHub</PdfLink>
                ) : null}
                {p.liveUrl ? (
                  <PdfLink src={p.liveUrl} style={styles.projectLink}>Live Demo</PdfLink>
                ) : null}
                {p.documentationUrl ? (
                  <PdfLink src={p.documentationUrl} style={styles.projectLink}>Docs</PdfLink>
                ) : null}
                {p.caseStudyUrl ? (
                  <PdfLink src={p.caseStudyUrl} style={styles.projectLink}>Case Study</PdfLink>
                ) : null}
                {p.demoVideoUrl ? (
                  <PdfLink src={p.demoVideoUrl} style={styles.projectLink}>Video</PdfLink>
                ) : null}
              </View>
            </View>
            <Text style={styles.projectDesc}>{p.desc}</Text>
            <Text style={styles.projectTags}>{p.tags.join(" · ")}</Text>
            <Text style={styles.projectStack}>{p.stack}</Text>
          </View>
        ))}

        {/* Education */}
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map((e, i) => (
          <Text key={i} style={styles.eduItem}>
            <Text style={styles.eduTitle}>{e.title}</Text>
            <Text style={styles.eduInstitute}> — {e.institute}</Text>
          </Text>
        ))}

        {/* Core Competencies */}
        <Text style={styles.sectionTitle}>Core Competencies</Text>
        <View style={styles.pillRow}>
          {data.competencies.map((c, i) => (
            <Text key={i} style={styles.pill}>{c}</Text>
          ))}
        </View>

        {/* Languages */}
        <Text style={styles.sectionTitle}>Languages</Text>
        <View style={styles.pillRow}>
          {data.languages.map((l, i) => (
            <Text key={i} style={styles.pill}>{l}</Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}
