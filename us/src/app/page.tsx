import Header from "@us/components/Header";
import Footer from "@us/components/Footer";

// Homepage Sections
import USHeroSection from "@us/components/home/USHeroSection";
import USEcosystemStrip from "@us/components/home/USEcosystemStrip";
import USPartnersGrid from "@us/components/home/USPartnersGrid";
import LeadershipSection from "@us/components/home/LeadershipSection";
import MentorsCarouselSection from "@us/components/home/MentorsCarouselSection";
import LearningJourney from "@us/components/home/LearningJourney";
import FlagshipLearningFrameworks from "@us/components/home/FlagshipLearningFrameworks";
import EcosystemOrbit from "@us/components/home/EcosystemOrbit";
import JourneyTimeline from "@us/components/home/JourneyTimeline";
import CourseSnapshotSection from "@us/components/home/CourseSnapshotSection";
import USRegistrationForm from "@us/components/home/USRegistrationForm";

export default function USHomePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col selection:bg-red-500 selection:text-white">
      {/* 1. Sticky Navigation Header */}
      <Header />

      {/* 2. Hero Element */}
      <USHeroSection />

      {/* 3. Program Partner Strip */}
      <USEcosystemStrip />

      {/* 4. Ecosystem Partner Vertical Wall */}
      <USPartnersGrid />

      {/* 5. Leadership Members */}
      <LeadershipSection />

      {/* 6. Mentors (Backed by Tech Founders & Learn Live with ML Architects) */}
      <MentorsCarouselSection />

      {/* 7. Journey Starts Here (Grey Cards -> Red Pop-Out on Hover) */}
      <LearningJourney />

      {/* 8. Flagship Courses Cards (AIM-IT 1st + US Courses, Flex Expand/Shrink Hover) */}
      <FlagshipLearningFrameworks />

      {/* 9. Orbit Animation Part (Clean Upright Nodes + US Infinity Logo) */}
      <EcosystemOrbit />

      {/* 10. 9-Step Stacking Card Journey Timeline (From Beginner to AI Engineer) */}
      <JourneyTimeline />

      {/* 11. Everything You Need To Become Industry Ready Stats Section */}
      <CourseSnapshotSection />

      {/* 12. Secure Your Learning Seat Registration Form */}
      <USRegistrationForm />

      {/* 13. Footer */}
      <Footer />
    </main>
  );
}
