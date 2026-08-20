import React from "react";
import Header from "@us/components/Header";
import Footer from "@us/components/Footer";
import { FullCourseData } from "@us/config/coursesData";

import CourseHeroSection from "./CourseHeroSection";
import CourseIntroStickySection from "./CourseIntroStickySection";
import CourseAudienceToolsSection from "./CourseAudienceToolsSection";
import CourseMentorsSection from "./CourseMentorsSection";
import CourseCertificateSection from "./CourseCertificateSection";
import CourseCtaBanner from "./CourseCtaBanner";
import CourseFaqSection from "./CourseFaqSection";

interface Props {
  course: FullCourseData;
}

export default function CourseLandingPage({ course }: Props) {
  return (
    <main className="min-h-screen bg-white flex flex-col selection:bg-red-500 selection:text-white font-sans">
      <Header />

      {/* Section 1: Hero */}
      <CourseHeroSection course={course} />

      {/* Section 2, 3, 4: Intro, Sticky Enrollment Sidebar, 6 Curriculum Modules, Key Outcomes */}
      <CourseIntroStickySection course={course} />

      {/* Section 5 & 6: Who Is This For & Tools You Master */}
      <CourseAudienceToolsSection course={course} />

      {/* Section 7: Meet Your Mentors */}
      <CourseMentorsSection />

      {/* Section 8: Certificate Showcase */}
      <CourseCertificateSection course={course} />

      {/* Section 9: Full-bleed Red CTA Banner */}
      <CourseCtaBanner course={course} />

      {/* Section 10: FAQs Accordion */}
      <CourseFaqSection course={course} />

      <Footer />
    </main>
  );
}
