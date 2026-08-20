"use client";

import Link from "next/link";
import Header from "@ph/components/Header";
import Footer from "@ph/components/Footer";
import QuoteBanner from "@ph/components/QuoteBanner";
import PhHero from "@ph/components/PhHero";
import ProgramPartners from "@ph/components/ProgramPartners";
import EcosystemPartners from "@ph/components/EcosystemPartners";
import GenAICoursesSection from "@ph/components/GenAICoursesSection";
import LeadershipSection from "@ph/components/LeadershipSection";
import CohortRegistrationSection from "@ph/components/CohortRegistrationSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      <Header />

      {/* ================= 1. HERO SECTION ================= */}
      <PhHero />

      {/* ================= 2. PROGRAM PARTNERS SECTION ================= */}
      <ProgramPartners />

      {/* ================= 3. ECOSYSTEM PARTNERS SECTION ================= */}
      <EcosystemPartners />

      {/* ================= 4. GENAI COURSES SECTION ================= */}
      <GenAICoursesSection />

      {/* ================= 5. REPLICATED QUOTE BANNER ================= */}
      <QuoteBanner />

      {/* ================= 6. LEADERSHIP & MENTORS SECTION ================= */}
      <LeadershipSection />

      {/* ================= 7. REGISTRATION / COHORT FORM SECTION ================= */}
      <CohortRegistrationSection />

      <Footer />
    </main>
  );
}
