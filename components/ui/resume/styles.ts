export const STYLES = {
  RESUME: {
    width: "850px",
    backgroundColor: "#ffffff",
    padding: "40px 50px",
    color: "#1e293b",
    fontFamily: '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    lineHeight: 1.4,
    display: "block" as const,
  },
  HEADER: {
    title: {
      fontSize: "48px",
      fontWeight: 800,
      color: "#0f172a",
      margin: "0 0 5px 0",
      letterSpacing: "-0.03em",
      textTransform: "uppercase" as const,
      lineHeight: 1,
    },
    subtitle: {
      fontSize: "20px",
      fontWeight: 600,
      color: "#1e40af",
      margin: "0 0 5px 0",
      letterSpacing: "0.05em",
      textTransform: "uppercase" as const,
    },
    contact: {
      fontSize: "11px",
      color: "#475569",
      fontWeight: 500,
    },
  },
  SECTION: {
    title: {
      fontSize: "14px",
      fontWeight: 800,
      color: "#ffffff",
      backgroundColor: "#0f172a",
      padding: "5px 15px",
      textTransform: "uppercase" as const,
      marginBottom: "15px",
      letterSpacing: "0.1em",
    },
  },
} as const
