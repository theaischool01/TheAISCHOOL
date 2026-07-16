import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "The AI School Philippines - Master AI Engineering",
  description: "Philippines' first tech school for practical AI engineering, agent development, and prompt engineering.",
  alternates: {
    canonical: "https://theaischool.co/ph",
    languages: {
      "en-IN": "https://theaischool.co",
      "en-US": "https://theaischool.co/us",
      "en-PH": "https://theaischool.co/ph",
      "x-default": "https://theaischool.co",
    },
  },
};

export default function PHHome() {
  return <HomePage region="ph" />;
}
