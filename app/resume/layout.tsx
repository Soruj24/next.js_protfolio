import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soruj Mahmud — Resume",
  description: "Professional resume of Soruj Mahmud, Frontend Developer.",
  robots: { index: false, follow: false },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
