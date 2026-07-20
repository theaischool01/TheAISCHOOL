import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import { getSupportedRegions } from "@/lib/region";

export async function generateMetadata(): Promise<Metadata> {
  const supported = getSupportedRegions();
  const languages: Record<string, string> = {
    "x-default": "https://theaischool.co",
  };

  if (supported.includes("in")) {
    languages["en-IN"] = "https://theaischool.co";
  }
  if (supported.includes("us")) {
    languages["en-US"] = "https://theaischool.co/us";
  }
  if (supported.includes("ph")) {
    languages["en-PH"] = "https://theaischool.co/ph";
  }

  return {
    title: "The AI School - Learn AI Skills from Startup Leaders",
    description: "India's only school where startup leaders teach AI skills directly. Get hands-on internships, prompt engineering, and agent building courses.",
    alternates: {
      canonical: "https://theaischool.co",
      languages,
    },
  };
}

export default function Home() {
  return <HomePage region="in" />;
}
