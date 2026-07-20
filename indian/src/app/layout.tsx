import type { Metadata } from "next";
import { RegionProvider } from "@/context/RegionContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "The AI School - Learn AI Skills from Startup Leaders",
  description: "India's only school where startup leaders teach AI skills directly. Get hands-on internships, prompt engineering, and agent building courses.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="font-sans min-h-full bg-white text-[#171717]">
        <RegionProvider initialRegion={process.env.NEXT_PUBLIC_DEFAULT_REGION || "in"}>
          {children}
        </RegionProvider>
      </body>
    </html>
  );
}

