"use client";

import { MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Section Components
import HomeHero from "@/components/home/HomeHero";
import PartnersSectionIN from "@/components/home/PartnersSection";
import PartnersSectionUS from "@/components/us/PartnersSection";
import LearningJourney from "@/components/home/LearningJourney";
import FlagshipLearningFrameworks from "@/components/home/FlagshipLearningFrameworks";
import EcosystemOrbit from "@/components/home/EcosystemOrbit";
import AssessmentJourney from "@/components/home/AssessmentJourney";
import CourseSnapshotIN from "@/components/home/CourseSnapshot";
import CourseSnapshotUS from "@/components/us/CourseSnapshotUS";
import WorldsLargestAIHackathon from "@/components/home/WorldsLargestAIHackathon";
import TeamPreview from "@/components/home/TeamPreview";
import GoogleReviews from "@/components/home/GoogleReviews";
import RegistrationForm from "@/components/home/RegistrationForm";
import USCourses from "@/components/us/USCourses";
import USMission from "@/components/us/USMission";
import USStatement from "@/components/us/USStatement";

import { RegionProvider, useRegion } from "@/context/RegionContext";
import { HOME_LAYOUTS } from "@/config/homeLayouts";

function MainLayout() {
  const { currentRegion, layoutConfig, regionConfig } = useRegion();

  const renderSection = (section: string) => {
    switch (section) {
      case "hero":
        return <HomeHero key="hero" />;
      case "partners":
        return currentRegion === "in" ? (
          <PartnersSectionIN key="partners" />
        ) : (
          <PartnersSectionUS key="partners" />
        );
      case "learning-journey":
        return <LearningJourney key="learning-journey" />;
      case "frameworks":
        return <FlagshipLearningFrameworks key="frameworks" />;
      case "orbit":
        return <EcosystemOrbit key="orbit" />;
      case "assessment":
        return <AssessmentJourney key="assessment" />;
      case "snapshot":
        return currentRegion === "in" ? (
          <CourseSnapshotIN key="snapshot" />
        ) : (
          <CourseSnapshotUS key="snapshot" />
        );
      case "hackathon":
        return <WorldsLargestAIHackathon key="hackathon" />;
      case "team":
        return <TeamPreview key="team" />;
      case "reviews":
        return <GoogleReviews key="reviews" />;
      case "registration":
        return <RegistrationForm key="registration" />;
      case "courses":
        return <USCourses key="courses" />;
      case "mission":
        return <USMission key="mission" />;
      case "statement":
        return <USStatement key="statement" />;
      default:
        return null;
    }
  };

  return (
    <main className="relative min-h-screen bg-white">
      {/* Dynamic Header */}
      <Header />

      {/* Dynamic Sections */}
      {layoutConfig.map((section) => renderSection(section))}

      {/* Dynamic Footer */}
      <Footer />

      {/* Localized WhatsApp Floating CTA */}
      <a
        href={`https://wa.me/${regionConfig.whatsappNumber}`}
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

export default function HomePage({ region }: { region: string }) {
  return (
    <RegionProvider initialRegion={region}>
      <MainLayout />
    </RegionProvider>
  );
}
