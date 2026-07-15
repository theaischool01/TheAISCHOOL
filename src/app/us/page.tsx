import { MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import HomeHero from "@/components/home/HomeHero";
import PartnersSection from "@/components/home/PartnersSection";
import LearningJourney from "@/components/home/LearningJourney";
import FlagshipLearningFrameworks from "@/components/home/FlagshipLearningFrameworks";
import EcosystemOrbit from "@/components/home/EcosystemOrbit";
import GoogleReviews from "@/components/home/GoogleReviews";
import AssessmentJourney from "@/components/home/AssessmentJourney";
import CourseSnapshot from "@/components/home/CourseSnapshot";
import WorldsLargestAIHackathon from "@/components/home/WorldsLargestAIHackathon";
import TeamPreview from "@/components/home/TeamPreview";
import RegistrationForm from "@/components/home/RegistrationForm";
import Footer from "@/components/Footer";

export default function USHome() {
  const usStats = [
    { value: 100, label: "Hours of learning", icon: "BookOpen" },
    { value: 7, label: "Industry Projects", icon: "Layers" },
    { value: 10, label: "GenAI Tools", icon: "Cpu" },
  ];

  const usChecklist = [
    "Mentors are Tech Startup Founders / Leaders",
    "Improve your Personal Productivity by 40%",
    "Stay ahead from your peers with real projects",
    "Mock Interview by Industry Experts",
    "Discuss your ideas with Innovators and get validated",
    "1:1 Mentors with Founders",
    "Participate in Hackathons to showcase your true potential",
    "80% Practical sessions",
    "Industry ready certification"
  ];

  const usCourses = [
    { label: "AIM-IT", href: "/courses/aim-it" },
    { label: "AI Ready Developer", href: "/courses/ai-ready-developer" },
    { label: "The Art & Science of Prompt Engineering", href: "/courses/prompt-engineering-101" },
    { label: "Build Your Own AI Agent", href: "/courses/building-your-ai-agent-for-coders" },
    { label: "Gen AI-101", href: "/courses/gen-ai-101" }
  ];

  const usHeadline = (
    <>
      Step into the Top 1% of the <br className="hidden sm:inline" />
      <span className="text-[#EE1C25]">AI-Ready Workforce.</span>
    </>
  );

  return (
    <main className="relative min-h-screen bg-white">
      {/* Header Navigation */}
      <Header />

      {/* 1. Hero */}
      <HomeHero 
        badgeText="USA's only school where startup Leaders teach AI skills."
        headline={usHeadline}
        exploreCtaText="Explore Programs"
        assessmentCtaText="Take Assessment"
      />

      {/* 2. Program Partners & Ecosystem Partners */}
      <PartnersSection 
        programSectionTitle="Ecosystem Partners"
        programSectionDesc="Strategic organizations supporting innovation, research, and AI education initiatives."
        ecosystemTitle="Our Partners"
      />

      {/* 3. Learning Journey (Student AI Path) */}
      <LearningJourney />

      {/* 4. Flagship Learning Frameworks */}
      <FlagshipLearningFrameworks />

      {/* 5. Explore • Learn • Transform Orbit */}
      <EcosystemOrbit />

      {/* 6. AI Readiness Assessment Journey */}
      <AssessmentJourney />

      {/* 7. Course Snapshot */}
      <CourseSnapshot 
        stats={usStats}
        checklist={usChecklist}
      />

      {/* 8. World's Largest AI Hackathon (Placeholder) */}
      <WorldsLargestAIHackathon />

      {/* 9. Team Teaser Section */}
      <TeamPreview />

      {/* 10. Trusted by Thousands of Learners (Google Reviews Carousel) */}
      <GoogleReviews />

      {/* 11. Registration Form */}
      <RegistrationForm />

      {/* Footer */}
      <Footer 
        taglineText="USA's only school where startup Leaders teach AI skills."
        courses={usCourses}
        contactEmail="usa@theaischool.co"
        contactPhone="+91 90309 06584"
        contactAddress="T-hub 2.0, Knowledge City, Hyderabad, Telangana, 500081"
      />

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
