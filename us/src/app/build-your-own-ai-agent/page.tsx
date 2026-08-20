import React from "react";
import type { Metadata } from "next";
import CourseLandingPage from "@us/components/courses/CourseLandingPage";
import { getCourseDataBySlug } from "@us/config/coursesData";

export const metadata: Metadata = {
  title: "Build Your Own AI Agent | The AI School US",
  description:
    "Where innovation meets automation. A 45-hour hands-on program teaching you to design, build, and deploy intelligent AI agents powered by large language models.",
  openGraph: {
    title: "Build Your Own AI Agent | The AI School US",
    description: "Where innovation meets automation.",
    url: "https://theaischool.co/us/build-your-own-ai-agent",
  },
};

export default function BuildYourOwnAiAgentPage() {
  const course = getCourseDataBySlug("build-your-own-agent");
  return <CourseLandingPage course={course} />;
}
