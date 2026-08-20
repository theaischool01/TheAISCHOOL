import React from "react";
import type { Metadata } from "next";
import CourseLandingPage from "@us/components/courses/CourseLandingPage";
import { getCourseDataBySlug } from "@us/config/coursesData";

export const metadata: Metadata = {
  title: "AIM-IT: AI & Machine Learning for Industry Transformation | The AI School US",
  description:
    "Learn. Build. Transform with Intelligence. Master Python, Agentic AI, ML/DL Optimization, and MLOps from active tech startup founders.",
  openGraph: {
    title: "AIM-IT: AI & ML for Industry Transformation | The AI School US",
    description: "Learn. Build. Transform with Intelligence.",
    url: "https://theaischool.co/us/aim-it",
  },
};

export default function AimItPage() {
  const course = getCourseDataBySlug("aim-it");
  return <CourseLandingPage course={course} />;
}
