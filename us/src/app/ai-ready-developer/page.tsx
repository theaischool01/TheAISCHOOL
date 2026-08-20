import React from "react";
import type { Metadata } from "next";
import CourseLandingPage from "@us/components/courses/CourseLandingPage";
import { getCourseDataBySlug } from "@us/config/coursesData";

export const metadata: Metadata = {
  title: "AI Ready Developer | The AI School US",
  description:
    "From code to cloud with intelligent AI systems. A 20-hour immersive learning journey combining hands-on coding, AI model integration, and cloud deployment.",
  openGraph: {
    title: "AI Ready Developer | The AI School US",
    description: "From code to cloud with intelligent AI systems.",
    url: "https://theaischool.co/us/ai-ready-developer",
  },
};

export default function AiReadyDeveloperPage() {
  const course = getCourseDataBySlug("ai-ready-developer");
  return <CourseLandingPage course={course} />;
}
