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
    title: "The AI School USA - Learn AI Skills from Tech Leaders",
    description: "USA's premier destination to learn Artificial Intelligence, Agent architectures, and Prompt Engineering from tech startup founders.",
    alternates: {
      canonical: "https://theaischool.co/us",
      languages,
    },
  };
}

export default function USHome() {
  return <HomePage region="us" />;
}
