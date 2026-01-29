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
  title: "Soruj Mahmud | Professional Frontend Developer & UI/UX Specialist",
  description:
    "Professional Frontend Developer specializing in React, Next.js, and immersive UI/UX experiences. Building high-performance, accessible web applications.",
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "UI/UX Specialist",
    "Web Development",
    "TypeScript",
    "Tailwind CSS",
    "GSAP",
    "Framer Motion",
    "Soruj Mahmud",
    "Portfolio",
  ],
  authors: [{ name: "Soruj Mahmud" }],
  creator: "Soruj Mahmud",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sorujmahmud.com",
    title: "Soruj Mahmud | Professional Frontend Developer & UI/UX Specialist",
    description:
      "Professional Frontend Developer specializing in React, Next.js, and immersive UI/UX experiences.",
    siteName: "Soruj Mahmud Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soruj Mahmud | Professional Frontend Developer & UI/UX Specialist",
    description:
      "Professional Frontend Developer specializing in React, Next.js, and immersive UI/UX experiences.",
    creator: "@sorujmahmud",
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
