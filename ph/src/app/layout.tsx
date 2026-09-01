import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The AI School Philippines - Master AI Engineering & Agent Building",
  description:
    "Philippines' premier school where startup founders and tech leaders teach practical AI engineering, agent development, and prompt engineering directly.",
  keywords: [
    "The AI School Philippines",
    "AI Training Philippines",
    "Learn AI Manila",
    "Prompt Engineering Course Philippines",
    "AI Ready Developer",
    "Build AI Agent",
    "Gen AI 101",
  ],
  authors: [{ name: "The AI School Philippines" }],
  metadataBase: new URL("https://theaischool.co"),
  alternates: {
    canonical: "https://theaischool.co/ph",
    languages: {
      "en-PH": "https://theaischool.co/ph",
      "en-US": "https://theaischool.co/us",
      "en-IN": "https://theaischool.co/in",
    },
  },
  icons: {
    icon: "/ph/favicon.ico",
    shortcut: "/ph/favicon.ico",
    apple: "/ph/icon.png",
  },
  openGraph: {
    title: "The AI School Philippines - Master AI Engineering & Agent Building",
    description:
      "Philippines' premier destination to learn Artificial Intelligence, Agent architectures, and Prompt Engineering from tech startup founders.",
    url: "https://theaischool.co/ph",
    siteName: "The AI School Philippines",
    locale: "en_PH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full scroll-smooth antialiased ${inter.variable}`}>
      <body className="font-sans min-h-full bg-white text-[#0F172A]">
        {children}
      </body>
    </html>
  );
}
