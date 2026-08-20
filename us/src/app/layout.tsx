import type { Metadata } from "next";
import GeoInitializer from "@us/components/GeoInitializer";
import "./globals.css";

export const metadata: Metadata = {
  title: "The AI School US - Step into the Top 1% of the AI-Ready Workforce",
  description:
    "USA's premier academy for building production-grade AI agents, LLM architectures, and prompt engineering. Learn live from tech startup leaders.",
  keywords: [
    "AI School US",
    "Learn AI Agents",
    "Prompt Engineering Course USA",
    "AI Ready Developer",
    "Build AI Agent",
    "Gen AI 101",
    "Artificial Intelligence Training",
  ],
  authors: [{ name: "The AI School USA" }],
  icons: {
    icon: "/us/assets/logo.png",
    shortcut: "/us/assets/logo.png",
    apple: "/us/assets/logo.png",
  },
  openGraph: {
    title: "The AI School US - Step into the Top 1% of the AI-Ready Workforce",
    description:
      "Master production AI agents, prompt engineering, and LLM development with live startup founder mentorship.",
    url: "https://theaischool.co/us",
    siteName: "The AI School US",
    images: [
      {
        url: "/us/assets/logo.png",
        width: 800,
        height: 600,
        alt: "The AI School US",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      <body className="min-h-screen bg-white text-slate-900 font-sans selection:bg-red-500 selection:text-white">
        <GeoInitializer currentRegion="us" />
        {children}
      </body>
    </html>
  );
}
