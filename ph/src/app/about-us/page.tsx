"use client";

import React from "react";
import Header from "@ph/components/Header";
import Footer from "@ph/components/Footer";
import QuoteBanner from "@ph/components/QuoteBanner";
import PhAboutHero from "@ph/components/PhAboutHero";
import PhWhoWeAreSection from "@ph/components/PhWhoWeAreSection";
import PhMissionCommitment from "@ph/components/PhMissionCommitment";
import PhLeadershipSection from "@ph/components/PhLeadershipSection";
import PhMentorsSection from "@ph/components/PhMentorsSection";
import PhAboutGrowthCTA from "@ph/components/PhAboutGrowthCTA";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#EE1C25] selection:text-white">
      {/* Navigation Header */}
      <Header />

      {/* 1. Hero Section */}
      <PhAboutHero />

      {/* 2. Who We Are Narrative & Ecosystem Highlights */}
      <PhWhoWeAreSection />

      {/* 3. Core Mission & Commitment Cards */}
      <PhMissionCommitment />

      {/* 4. Full-bleed Quote Banner */}
      <QuoteBanner />

      {/* 5. Leadership Team Showcase (4 members) */}
      <PhLeadershipSection />

      {/* 6. Technical Mentors Grid (10 experts) */}
      <PhMentorsSection />

      {/* 7. Closing Growth CTA Banner */}
      <PhAboutGrowthCTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
