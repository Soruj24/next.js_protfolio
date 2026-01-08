import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import PageTransition from "@/components/ui/PageTransition";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Soruj Mahmud | AI Software Architect & LangChain Specialist",
  description:
    "AI Software Architect specializing in LangChain, MCP Servers, and Autonomous Agentic Workflows. Building the future of intelligent systems.",
  keywords: [
    "AI",
    "LangChain",
    "MCP Server",
    "Autonomous Agents",
    "Software Architect",
    "Soruj Mahmud",
    "Portfolio",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Soruj Mahmud" }],
  creator: "Soruj Mahmud",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sorujmahmud.com", // You should update this with your actual domain
    title: "Soruj Mahmud | AI Software Architect & LangChain Specialist",
    description:
      "AI Software Architect specializing in LangChain, MCP Servers, and Autonomous Agentic Workflows.",
    siteName: "Soruj Mahmud Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soruj Mahmud | AI Software Architect & LangChain Specialist",
    description:
      "AI Software Architect specializing in LangChain, MCP Servers, and Autonomous Agentic Workflows.",
    creator: "@sorujmahmud", // Update with your actual twitter handle
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mesh-gradient noise-bg min-h-screen`}
      >
        <NextAuthProvider>
          <CustomCursor />
          <PageTransition />
          <div className="relative z-10 content-wrapper">{children}</div>
          <Toaster position="top-right" />
        </NextAuthProvider>
      </body>
    </html>
  );
}
