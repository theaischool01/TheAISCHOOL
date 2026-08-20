"use client";

import { MessageCircle } from "lucide-react";
import Header from "@in/components/Header";
import Footer from "@in/components/Footer";

// Section Components
import HomeHero from "@in/components/home/HomeHero";
import PartnersSectionIN from "@in/components/home/PartnersSection";
import LearningJourney from "@in/components/home/LearningJourney";
import FlagshipLearningFrameworks from "@in/components/home/FlagshipLearningFrameworks";
import EcosystemOrbit from "@in/components/home/EcosystemOrbit";
import AssessmentJourney from "@in/components/home/AssessmentJourney";
import CourseSnapshotIN from "@in/components/home/CourseSnapshot";
import WorldsLargestAIHackathon from "@in/components/home/WorldsLargestAIHackathon";
import TeamPreview from "@in/components/home/TeamPreview";
import GoogleReviews from "@in/components/home/GoogleReviews";
import RegistrationForm from "@in/components/home/RegistrationForm";

import { RegionProvider, useRegion } from "@in/context/RegionContext";
import { HOME_LAYOUTS } from "@in/config/homeLayouts";
import { SectionWrapper } from "@in/components/shared/SectionWrapper";

function MainLayout() {
  const { currentRegion, layoutConfig, regionConfig } = useRegion();

  const renderSection = (section: string) => {
    switch (section) {
      case "hero":
        return <HomeHero key="hero" />;
      case "partners":
        return <PartnersSectionIN key="partners" />;
      case "learning-journey":
        return <LearningJourney key="learning-journey" />;
      case "frameworks":
        return <FlagshipLearningFrameworks key="frameworks" />;
      case "orbit":
        return <EcosystemOrbit key="orbit" />;
      case "assessment":
        return <AssessmentJourney key="assessment" />;
      case "snapshot":
        return <CourseSnapshotIN key="snapshot" />;
      case "hackathon":
        return <WorldsLargestAIHackathon key="hackathon" />;
      case "team":
        return <TeamPreview key="team" />;
      case "reviews":
        return <GoogleReviews key="reviews" />;
      case "registration":
        return <RegistrationForm key="registration" />;
      default:
        return null;
    }
  };

  const distinctSections = ["hackathon", "registration", "statement", "mission"];
  let plainSectionIndex = 0;

  return (
    <main className="relative min-h-screen bg-white">
      {/* Dynamic Header */}
      <Header />

      {/* Dynamic Sections with alternating backgrounds */}
      {layoutConfig.map((section) => {
        const element = renderSection(section);
        if (!element) return null;

        const isDistinct = distinctSections.includes(section);
        if (isDistinct) {
          return element;
        }

        const tone = plainSectionIndex % 2 === 0 ? "white" : "tinted";
        plainSectionIndex++;

        return (
          <SectionWrapper key={section} tone={tone}>
            {element}
          </SectionWrapper>
        );
      })}

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
