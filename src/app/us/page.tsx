import { MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import USHero from "@/components/us/USHero";
import PartnersSection from "@/components/us/PartnersSection";
import CourseSnapshotUS from "@/components/us/CourseSnapshotUS";
import USCourses from "@/components/us/USCourses";
import USMission from "@/components/us/USMission";
import USStatement from "@/components/us/USStatement";
import USRegistration from "@/components/us/USRegistration";
import USFooter from "@/components/us/USFooter";

export default function USHome() {
  return (
    <main className="relative min-h-screen bg-white">
      {/* Header Navigation */}
      <Header />

      {/* 1. Hero with custom staircase isometric SVG */}
      <USHero />

      {/* 2. Ecosystem & Our Partners Bento-Grid */}
      <PartnersSection />

      {/* 3. Course Snapshot with bento stats & wrap checklist */}
      <CourseSnapshotUS />

      {/* 4. Courses Grid "Don't Just Use AI — Build With It" */}
      <USCourses />

      {/* 5. Mission / Commitment Cards */}
      <USMission />

      {/* 6. Bold Statement / Quote Section */}
      <USStatement />

      {/* 7. Registration Form & Orbit Graphic */}
      <USRegistration />

      {/* 8. US-specific Footer */}
      <USFooter />

      {/* WhatsApp Floating CTA */}
      <a
        href="https://wa.me/yournumber"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center text-3xl shadow-2xl hover:scale-110 active:scale-95 hover:rotate-[8deg] transition-all duration-200 z-[1000]"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white stroke-none" />
      </a>
    </main>
  );
}
