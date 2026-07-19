import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/shared/CustomCursor";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { Toaster } from "sonner";
import ConditionalChatBot from "@/features/chat/components/ConditionalChatBot";
import { RecentlyViewedProvider } from "@/components/providers/RecentlyViewedContext";
import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";

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
    "Professional Frontend Developer specializing in React, Next.js, and immersive UI/UX experiences. Building high-performance, accessible web applications with clean code and modern architecture.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "UI/UX Specialist",
    "Web Development",
    "Tailwind CSS",
    "Framer Motion",
    "GSAP",
    "Soruj Mahmud",
    "Portfolio",
    "Frontend Architecture",
    "Performance Optimization",
  ],
  authors: [{ name: "Soruj Mahmud" }],
  creator: "Soruj Mahmud",
  metadataBase: new URL("https://sorujmahmud.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sorujmahmud.com",
    title: "Soruj Mahmud | Professional Frontend Developer & UI/UX Specialist",
    description:
      "Professional Frontend Developer specializing in React, Next.js, and immersive UI/UX experiences. Building high-performance, accessible web applications.",
    siteName: "Soruj Mahmud Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Soruj Mahmud - Frontend Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soruj Mahmud | Professional Frontend Developer & UI/UX Specialist",
    description:
      "Professional Frontend Developer specializing in React, Next.js, and immersive UI/UX experiences.",
    creator: "@sorujmahmud",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://sorujmahmud.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <NextAuthProvider>
            <RecentlyViewedProvider>
              <Link
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-cyan-500 focus:text-white focus:outline-none"
              >
                Skip to content
              </Link>
              <CustomCursor />
              <ConditionalChatBot />
              <div className="relative z-10 content-wrapper" id="main-content">
                {children}
              </div>
              <Toaster position="top-right" />
            </RecentlyViewedProvider>
          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
