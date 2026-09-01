import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The AI School - Learn Production AI Skills",
  description: "Learn practical Generative AI, LLM Agents, Machine Learning, and Software Engineering from active tech startup founders.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
