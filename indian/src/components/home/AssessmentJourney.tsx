"use client";

import React from "react";
import {
  BookOpen,
  GitBranch,
  Users,
  Code,
  Award,
  Sparkles,
  ArrowRight,
  MessageSquareCode,
  Laptop,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Program Enrollment",
    desc: "Admission confirmation, onboarding, LMS access and mentor allocation.",
    icon: Sparkles,
    detailTitle: "Onboarding & Setup",
    bullets: ["LMS platform activation", "Community Slack onboarding", "Mentor match alignment"],
  },
  {
    number: "02",
    title: "AI Readiness Assessment",
    desc: "Evaluate the learner's current skills, aptitude and career goals before beginning the program.",
    icon: Users,
    detailTitle: "Skill Profiling",
    bullets: ["Technical aptitude screening", "Career goal mapping", "Personalized learning roadmap"],
  },
  {
    number: "03",
    title: "Live Learning Experience",
    desc: "Attend live classes, access recordings, complete labs and follow the structured curriculum.",
    icon: BookOpen,
    detailTitle: "Classroom Deliverables",
    bullets: ["Interactive live classes", "Hands-on virtual lab sessions", "On-demand class recordings"],
  },
  {
    number: "04",
    title: "Production Projects & Assessments",
    desc: "Complete weekly assignments, practical assessments and industry-level capstone projects.",
    icon: Code,
    detailTitle: "Project Milestones",
    bullets: ["Weekly coding challenges", "Mid-term engineering review", "Scalable capstone deployment"],
  },
  {
    number: "05",
    title: "Mentor & Teaching Support",
    desc: "Receive continuous support from mentors and teaching assistants throughout the learning journey.",
    icon: MessageSquareCode,
    detailTitle: "Support Structure",
    bullets: ["Daily doubt-clearing sessions", "Teaching assistant support", "Direct founder office hours"],
  },
  {
    number: "06",
    title: "Continuous Progress Tracking",
    desc: "Track performance, receive personalized feedback and continuously improve through mentor reviews.",
    icon: CheckCircle2,
    detailTitle: "Performance Analytics",
    bullets: ["Sprint feedback reports", "Code quality assessments", "Milestone review calls"],
  },
  {
    number: "07",
    title: "Hackathons & Innovation Sprints",
    desc: "Participate in AI hackathons, product challenges and collaborative engineering events.",
    icon: Laptop,
    detailTitle: "Innovation Deliverables",
    bullets: ["Team hackathon events", "AI prototyping challenges", "Live project pitches"],
  },
  {
    number: "08",
    title: "Career Readiness Assessment",
    desc: "Complete final assessments, placement preparation, resume reviews and mock interviews.",
    icon: GitBranch,
    detailTitle: "Placement Readiness",
    bullets: ["Technical mock interviews", "Resume & LinkedIn audits", "Profile showcase prep"],
  },
  {
    number: "09",
    title: "Launch Your AI Career",
    desc: "Graduate from The AI School with certification and become ready for internships and placement opportunities.",
    icon: Award,
    detailTitle: "Ecosystem Placement",
    bullets: ["Direct placement referrals", "Ecosystem hiring pipelines", "Certified graduate credentials"],
  },
];

export default function AssessmentJourney() {
  return (
    <section className="w-full bg-transparent py-16 lg:py-20 px-6 md:px-12 relative z-10 font-heading">
      <div className="max-w-6xl mx-auto">

        {/* ================= TRANSFORMATION PROCESS (STICKY STACK SCROLL) ================= */}
        <div className="space-y-12 pt-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-black tracking-tight font-heading leading-[1.1] uppercase">
              <span className="text-gray-950 block">YOUR AI JOURNEY</span>
              <span className="text-[#EE1C25] block text-2xl md:text-4xl mt-2">FROM BEGINNER TO AI ENGINEER</span>
            </h3>
            <p className="text-sm font-semibold text-neutral-500 max-w-lg mx-auto">
              A structured learning journey designed by startup founders and engineering leaders.
            </p>
          </div>

          {/* Stacking Cards Container */}
          <div className="relative space-y-16 max-w-5xl mx-auto">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const bgClass = idx % 2 === 0 ? "bg-white" : "bg-[#FFF5F5]";
              const isFinalStep = idx === steps.length - 1;

              return (
                <div
                  key={step.number}
                  className={`sticky top-24 min-h-[460px] md:min-h-[480px] w-full ${bgClass} border border-neutral-200/80 rounded-[2.5rem] p-8 md:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 overflow-hidden`}
                  style={{ zIndex: (idx + 1) * 10 }}
                >
                  {/* Left Column: Text Content */}
                  <div className="lg:w-1/2 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-red-50 text-[#EE1C25] border border-red-100 rounded-xl">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black tracking-widest text-[#EE1C25] uppercase">
                          Step {step.number}
                        </span>
                      </div>
                      <span className="text-7xl font-black text-[#EE1C25]/10 font-sans leading-none select-none">
                        {step.number}
                      </span>
                    </div>

                    <h4 className="text-2xl md:text-3xl font-black text-gray-950 tracking-tight leading-tight font-heading">
                      {step.title}
                    </h4>

                    <p className="text-neutral-500 text-sm font-semibold leading-relaxed">
                      {step.desc}
                    </p>

                    {/* Only show CTA on the final step */}
                    {isFinalStep && (
                      <div className="flex flex-wrap gap-2.5 pt-2">
                        <a
                          href="/learn"
                          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#EE1C25] hover:text-[#d61920] transition-colors"
                        >
                          Start Your Journey
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Visual Mockup Panel */}
                  <div className="lg:w-1/2 w-full bg-[#111111] border border-neutral-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:bg-black">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 border-b border-neutral-800 pb-3">
                        <MessageSquareCode className="w-4 h-4 text-[#EE1C25]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-200">
                          {step.detailTitle}
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {step.bullets.map((bullet) => (
                          <div key={bullet} className="flex items-center space-x-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#EE1C25] shrink-0" />
                            <span className="text-xs font-bold text-neutral-100 leading-tight">
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-neutral-800/80 flex items-center justify-between text-[9px] font-black text-neutral-500 uppercase tracking-widest">
                      <span>Live Production Env</span>
                      <span>Verified System</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
