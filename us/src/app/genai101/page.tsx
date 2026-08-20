import React from "react";
import type { Metadata } from "next";
import CourseLandingPage from "@us/components/courses/CourseLandingPage";
import { getCourseDataBySlug } from "@us/config/coursesData";

export const metadata: Metadata = {
  title: "Gen AI - 101: The Foundations of Generative AI | The AI School US",
  description:
    "The foundations of Generative AI. Explore text, image, and media generation through live online sessions with expert instructors.",
  openGraph: {
    title: "Gen AI - 101: The Foundations of Generative AI | The AI School US",
    description: "The foundations of Generative AI.",
    url: "https://theaischool.co/us/genai101",
  },
};

export default function GenAi101Page() {
  const course = getCourseDataBySlug("gen-ai-101");
  return <CourseLandingPage course={course} />;
}
