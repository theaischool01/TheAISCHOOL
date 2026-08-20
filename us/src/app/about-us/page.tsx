import React from "react";
import type { Metadata } from "next";
import Header from "@us/components/Header";
import Footer from "@us/components/Footer";

import USAboutHero from "@us/components/home/USAboutHero";
import USCoreMembersSection from "@us/components/home/USCoreMembersSection";
import USBenefitsPanel from "@us/components/home/USBenefitsPanel";
import USMissionCommitment from "@us/components/home/USMissionCommitment";
import USQuoteBanner from "@us/components/home/USQuoteBanner";
import USTeamCarousel from "@us/components/home/USTeamCarousel";
import USGrowthCTA from "@us/components/home/USGrowthCTA";
import USMentorsCarousel from "@us/components/home/USMentorsCarousel";

export const metadata: Metadata = {
  title: "About Us | The AI School US - Empowering AI Leaders",
  description:
    "Learn about The AI School USA. USA's premier academy where startup leaders and AI architects teach production-grade GenAI, LLM agent engineering, and prompt techniques.",
  openGraph: {
    title: "About Us | The AI School US",
    description:
      "Empowering youth, supporting tech startups, and fostering AI innovation across the USA.",
    url: "https://theaischool.co/us/about-us",
  },
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col selection:bg-red-500 selection:text-white">
      {/* Navigation Header */}
      <Header />

      {/* 1. Hero — "Who We Are" */}
      <USAboutHero />

      {/* 2. Meet our Core Members (5 cards) */}
      <USCoreMembersSection />

      {/* 3. Benefits Split Panel */}
      <USBenefitsPanel />

      {/* 4. Mission & Commitment */}
      <USMissionCommitment />

      {/* 5. Full-bleed Quote Banner */}
      <USQuoteBanner />

      {/* 6. Our Team (Carousel, 5 cards) */}
      <USTeamCarousel />

      {/* 7. Growth CTA Strip */}
      <USGrowthCTA />

      {/* 8. Our Mentors (Carousel, 10 cards) */}
      <USMentorsCarousel />

      {/* Footer */}
      <Footer />
    </main>
  );
}
