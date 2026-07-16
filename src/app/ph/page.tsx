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
    title: "The AI School Philippines - Master AI Engineering",
    description: "Philippines' first tech school for practical AI engineering, agent development, and prompt engineering.",
    alternates: {
      canonical: "https://theaischool.co/ph",
      languages,
    },
  };
}

export default function PHHome() {
  return <HomePage region="ph" />;
}
