import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "The AI School USA - Learn AI Skills from Tech Leaders",
  description: "USA's premier destination to learn Artificial Intelligence, Agent architectures, and Prompt Engineering from tech startup founders.",
  alternates: {
    canonical: "https://theaischool.co/us",
    languages: {
      "en-IN": "https://theaischool.co",
      "en-US": "https://theaischool.co/us",
      "en-PH": "https://theaischool.co/ph",
      "x-default": "https://theaischool.co",
    },
  },
};

export default function USHome() {
  return <HomePage region="us" />;
}
