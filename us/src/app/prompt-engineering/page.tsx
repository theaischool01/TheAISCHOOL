import React from "react";
import type { Metadata } from "next";
import CourseLandingPage from "@us/components/courses/CourseLandingPage";
import { getCourseDataBySlug } from "@us/config/coursesData";

export const metadata: Metadata = {
  title: "The Art & Science of Prompt Engineering | The AI School US",
  description:
    "Master the language that talks to machines. A 25-hour hands-on program teaching you to craft, optimize, and automate prompts.",
  openGraph: {
    title: "The Art & Science of Prompt Engineering | The AI School US",
    description: "Master the language that talks to machines.",
    url: "https://theaischool.co/us/prompt-engineering",
  },
};

export default function PromptEngineeringPage() {
  const course = getCourseDataBySlug("prompt-engineering");
  return <CourseLandingPage course={course} />;
}
