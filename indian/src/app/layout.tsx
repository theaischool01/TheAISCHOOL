import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RegionProvider } from "@in/context/RegionContext";
import GeoInitializer from "@in/components/GeoInitializer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The AI School India - Learn AI Skills from Startup Leaders",
  description:
    "India's premier school where startup founders and tech leaders teach practical AI engineering, agent development, and prompt engineering directly.",
  keywords: [
    "The AI School India",
    "AI Training India",
    "Learn AI Agents",
    "Prompt Engineering Course India",
    "AI Ready Developer",
    "Build AI Agent",
    "Gen AI 101",
    "Hyderabad AI Training",
  ],
  authors: [{ name: "The AI School India" }],
  metadataBase: new URL("https://theaischool.co"),
  alternates: {
    canonical: "https://theaischool.co/in",
    languages: {
      "en-IN": "https://theaischool.co/in",
      "en-US": "https://theaischool.co/us",
      "en-PH": "https://theaischool.co/ph",
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "The AI School India - Learn AI Skills from Startup Leaders",
    description:
      "India's premier destination to learn Artificial Intelligence, Agent architectures, and Prompt Engineering from tech startup founders.",
    url: "https://theaischool.co/in",
    siteName: "The AI School India",
    locale: "en_IN",
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
      <body className="font-sans min-h-full bg-white text-[#171717]">
        <RegionProvider initialRegion={process.env.NEXT_PUBLIC_DEFAULT_REGION || "in"}>
          <GeoInitializer currentRegion="in" />
          {children}
        </RegionProvider>
      </body>
    </html>
  );
}
