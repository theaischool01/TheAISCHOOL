import { MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import HomeHero from "@/components/home/HomeHero";
import PartnersSection from "@/components/home/PartnersSection";
import LearningJourney from "@/components/home/LearningJourney";
import FlagshipLearningFrameworks from "@/components/home/FlagshipLearningFrameworks";
import EcosystemOrbit from "@/components/home/EcosystemOrbit";
import CareerJourneyCarousel from "@/components/home/CareerJourneyCarousel";
import GoogleReviews from "@/components/home/GoogleReviews";
import AssessmentJourney from "@/components/home/AssessmentJourney";
import WorldsLargestAIHackathon from "@/components/home/WorldsLargestAIHackathon";
import PlacementJourney from "@/components/home/PlacementJourney";
import RegistrationForm from "@/components/home/RegistrationForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      {/* Header Navigation */}
      <Header />

      {/* 1. Hero */}
      <HomeHero />

      {/* 2. Program Partners & Ecosystem Partners */}
      <PartnersSection />

      {/* 3. Learning Journey (Student AI Path) */}
      <LearningJourney />

      {/* 4. Flagship Learning Frameworks */}
      <FlagshipLearningFrameworks />

      {/* 5. Explore • Learn • Transform Orbit */}
      <EcosystemOrbit />

      {/* 6. Career Journey Carousel (Infinite Timelines) */}
      <CareerJourneyCarousel />

      {/* 7. Google Reviews (Verified Live Student Ticker) */}
      <GoogleReviews />

      {/* 8. AI Readiness Assessment Journey */}
      <AssessmentJourney />

      {/* 9. World's Largest AI Hackathon (Placeholder) */}
      <WorldsLargestAIHackathon />

      {/* 10. Placement Journey */}
      <PlacementJourney />

      {/* 11. Registration Form */}
      <RegistrationForm />

      {/* Footer */}
      <Footer />

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
