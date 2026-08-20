import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseLandingPage from "@us/components/courses/CourseLandingPage";
import { COURSES_DATA, getCourseDataBySlug } from "@us/config/coursesData";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return COURSES_DATA.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const course = getCourseDataBySlug(resolvedParams.slug);

  return {
    title: `${course.name} | The AI School US`,
    description: course.description,
    openGraph: {
      title: `${course.name} | The AI School US`,
      description: course.subheading,
      url: `https://theaischool.co/us/courses/${course.slug}`,
    },
  };
}

export default async function CoursePage({ params }: Props) {
  const resolvedParams = await params;
  const course = getCourseDataBySlug(resolvedParams.slug);

  if (!course) {
    notFound();
  }

  return <CourseLandingPage course={course} />;
}
