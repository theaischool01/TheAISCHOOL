"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Check,
  ShieldCheck,
  Sparkles,
  Code,
  Target,
  Terminal,
  Layers,
  Users,
  Cpu,
  Award,
  Rocket,
} from "lucide-react";

interface StepData {
  stepNum: string;
  title: string;
  desc: string;
  cardTitle: string;
  bullets: string[];
  icon: React.ElementType;
  bgClass: string;
  borderClass: string;
}

const stepsData: StepData[] = [
  {
    stepNum: "01",
    title: "Program Enrollment",
    desc: "Admission confirmation, onboarding, LMS access and mentor allocation.",
    cardTitle: "ONBOARDING & SETUP",
    bullets: ["LMS platform activation", "Community Slack onboarding", "Mentor match alignment"],
    icon: Code,
    bgClass: "bg-white",
    borderClass: "border-neutral-200",
  },
  {
    stepNum: "02",
    title: "AI Readiness Assessment",
    desc: "Evaluate the learner's current skills, aptitude and career goals before beginning the program.",
    cardTitle: "SKILL PROFILING",
    bullets: ["Technical aptitude screening", "Career goal mapping", "Personalized learning roadmap"],
    icon: Target,
    bgClass: "bg-[#FFF8F8]",
    borderClass: "border-red-100",
  },
  {
    stepNum: "03",
    title: "Live Learning Experience",
    desc: "Attend live classes, access recordings, complete labs and follow the structured curriculum.",
    cardTitle: "CLASSROOM DELIVERABLES",
    bullets: ["Interactive live classes", "Hands-on virtual lab sessions", "On-demand class recordings"],
    icon: Terminal,
    bgClass: "bg-white",
    borderClass: "border-neutral-200",
  },
  {
    stepNum: "04",
    title: "Production Projects & Assessments",
    desc: "Complete weekly assignments, practical assessments and industry-level capstone projects.",
    cardTitle: "PROJECT MILESTONES",
    bullets: ["Weekly coding challenges", "Mid-term engineering review", "Scalable capstone deployment"],
    icon: Layers,
    bgClass: "bg-[#FFF8F8]",
    borderClass: "border-red-100",
  },
  {
    stepNum: "05",
    title: "Mentor & Teaching Support",
    desc: "Receive continuous support from mentors and teaching assistants throughout the learning journey.",
    cardTitle: "SUPPORT STRUCTURE",
    bullets: ["Daily doubt-clearing sessions", "Teaching assistant support", "Direct founder office hours"],
    icon: Users,
    bgClass: "bg-white",
    borderClass: "border-neutral-200",
  },
  {
    stepNum: "06",
    title: "Continuous Progress Tracking",
    desc: "Track performance, receive personalized feedback and continuously improve through mentor reviews.",
    cardTitle: "PERFORMANCE ANALYTICS",
    bullets: ["Sprint feedback reports", "Code quality assessments", "Milestone review calls"],
    icon: Cpu,
    bgClass: "bg-[#FFF8F8]",
    borderClass: "border-red-100",
  },
  {
    stepNum: "07",
    title: "Hackathons & Innovation Sprints",
    desc: "Participate in AI hackathons, product challenges and collaborative engineering events.",
    cardTitle: "INNOVATION DELIVERABLES",
    bullets: ["Team hackathon events", "AI prototyping challenges", "Live project pitches"],
    icon: Sparkles,
    bgClass: "bg-white",
    borderClass: "border-neutral-200",
  },
  {
    stepNum: "08",
    title: "Career Readiness Assessment",
    desc: "Complete final assessments, placement preparation, resume reviews and mock interviews.",
    cardTitle: "PLACEMENT READINESS",
    bullets: ["Technical mock interviews", "Resume & LinkedIn audits", "Profile showcase prep"],
    icon: Award,
    bgClass: "bg-[#FFF8F8]",
    borderClass: "border-red-100",
  },
  {
    stepNum: "09",
    title: "Launch Your AI Career",
    desc: "Graduate from The AI School with certification and become ready for internships and placement opportunities.",
    cardTitle: "START YOUR JOURNEY",
    bullets: [
      "Ecosystem Placement",
      "Direct placement referrals",
      "Ecosystem hiring pipelines",
      "Certified graduate credentials",
    ],
    icon: Rocket,
    bgClass: "bg-white",
    borderClass: "border-neutral-200",
  },
];

export default function JourneyTimeline() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const [scrambledBullets, setScrambledBullets] = useState<string[]>([]);

  // Task 1: IntersectionObserver to track which left-column step is currently active
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setShouldReduceMotion(true);
    }

    const nodes = stepRefs.current.filter(Boolean);
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-step-index"));
            if (!isNaN(idx)) {
              setActiveIndex(idx);
            }
          }
        });
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: 0.1 }
    );

    nodes.forEach((node) => observer.observe(node as Element));
    return () => observer.disconnect();
  }, []);

  // Task 2: Scroll progress calculation for vertical rail fill line
  useEffect(() => {
    if (typeof window === "undefined" || shouldReduceMotion) return;

    let animationFrameId: number;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = Math.max(0, Math.min(totalScrollable, -rect.top + windowHeight / 3));
      const progress = currentScroll / totalScrollable;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  // Task 4: Terminal Character Scramble / Decode Effect when active step changes
  useEffect(() => {
    const targetBullets = stepsData[activeIndex]?.bullets || [];
    if (shouldReduceMotion) {
      setScrambledBullets(targetBullets);
      return;
    }

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*";
    let frame = 0;
    const maxFrames = 12;

    const interval = setInterval(() => {
      frame++;
      if (frame >= maxFrames) {
        setScrambledBullets(targetBullets);
        clearInterval(interval);
      } else {
        const scrambled = targetBullets.map((b) =>
          b
            .split("")
            .map((char) => (char === " " ? " " : chars[Math.floor(Math.random() * chars.length)]))
            .join("")
        );
        setScrambledBullets(scrambled);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [activeIndex, shouldReduceMotion]);

  const activeStep = stepsData[activeIndex] || stepsData[0];
  const ActiveIcon = activeStep.icon;

  return (
    <section ref={sectionRef} className="relative w-full bg-white font-heading select-none py-16 lg:py-24">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto px-6 md:px-12 mb-16">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.1] uppercase text-slate-950">
          YOUR AI JOURNEY <br />
          <span className="text-[#EE1C25]">FROM BEGINNER TO AI ENGINEER</span>
        </h2>
        <p className="text-sm font-semibold text-slate-600">
          A structured learning journey designed by startup founders and engineering leaders.
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative items-start">
          {/* Left Column: Scrolling Steps & Vertical Progress Rail (Task 2 & 3) */}
          <div className="lg:col-span-7 relative pl-8 md:pl-10 space-y-24 py-6">
            {/* Task 2: Thin Vertical Rail Line with Animated Fill Bar */}
            <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-slate-200 rounded-full pointer-events-none">
              <div
                className="w-full bg-[#EE1C25] transition-all duration-150 ease-out rounded-full shadow-[0_0_8px_rgba(238,28,37,0.5)]"
                style={{ height: `${scrollProgress * 100}%` }}
              />
            </div>

            {stepsData.map((step, idx) => {
              const isActive = activeIndex === idx;
              const StepIcon = step.icon;
              return (
                <div
                  key={idx}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  data-step-index={idx}
                  className={`relative min-h-[50vh] lg:min-h-[60vh] flex flex-col justify-center transition-all duration-500 ease-out ${
                    isActive || shouldReduceMotion ? "opacity-100 scale-100" : "opacity-40 scale-[0.98]"
                  }`}
                >
                  {/* Task 2: Rail Marker Dot */}
                  <div
                    className={`absolute -left-[calc(2rem-3px)] md:-left-[calc(2.5rem-3px)] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "bg-[#EE1C25] border-white shadow-[0_0_12px_rgba(238,28,37,0.8)] scale-125 z-10"
                        : "bg-slate-300 border-white scale-100 z-0"
                    }`}
                  />

                  {/* Task 3: Step Badge, Title & Desc */}
                  <div className="space-y-4 relative">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider transition-colors duration-300 ${
                        isActive
                          ? "bg-red-50 text-[#EE1C25] border border-red-200 shadow-sm"
                          : "bg-slate-100 text-slate-500 border border-slate-200"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>STEP {step.stepNum}</span>
                    </span>

                    <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                      {step.title}
                    </h3>

                    <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl">
                      {step.desc}
                    </p>

                    {/* Task 3: Ghost Number Background */}
                    <span
                      className={`absolute -right-2 -bottom-10 text-[120px] font-black text-black select-none pointer-events-none font-sans transition-opacity duration-300 ${
                        isActive ? "opacity-[0.06]" : "opacity-[0.02]"
                      }`}
                    >
                      {step.stepNum}
                    </span>

                    {/* Task 1 Mobile Fallback (<1024px): Non-sticky Terminal Card */}
                    <div className="lg:hidden mt-6 bg-[#0B0F19] text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
                      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                        <StepIcon className="w-4 h-4 text-[#EE1C25]" />
                        <span className="text-xs font-black uppercase tracking-widest text-white">
                          {step.cardTitle}
                        </span>
                      </div>

                      <ul className="space-y-2.5">
                        {step.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-200">
                            <div className="w-4 h-4 rounded-full bg-red-950 border border-red-800/80 flex items-center justify-center text-[#EE1C25] shrink-0">
                              <Check className="w-2.5 h-2.5" strokeWidth={3} />
                            </div>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[9px] font-bold text-slate-500 tracking-wider uppercase">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                          <span>LIVE PRODUCTION ENV</span>
                        </span>
                        <span>VERIFIED SYSTEM</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Task 1 Pinned Morphing Terminal (Desktop Sticky >=1024px) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28 h-fit pt-6">
            <div className="bg-[#0B0F19] text-white rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden transition-all duration-300">
              {/* Morph Header */}
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
                <ActiveIcon className="w-5 h-5 text-[#EE1C25] transition-transform duration-300" />
                <span className="text-xs font-black uppercase tracking-widest text-white transition-opacity duration-300">
                  {activeStep.cardTitle}
                </span>
              </div>

              {/* Task 4: Scrambled Checklist Bullets */}
              <ul className="space-y-3.5 min-h-[140px]">
                {(scrambledBullets.length ? scrambledBullets : activeStep.bullets).map((bulletText, bIdx) => (
                  <li key={bIdx} className="flex items-center gap-3 text-xs font-mono font-semibold text-slate-200">
                    <div className="w-4 h-4 rounded-full bg-red-950 border border-red-800/80 flex items-center justify-center text-[#EE1C25] shrink-0">
                      <Check className="w-2.5 h-2.5" strokeWidth={3} />
                    </div>
                    <span>{bulletText}</span>
                  </li>
                ))}
              </ul>

              {/* Constant Footer Chrome */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                  <span>LIVE PRODUCTION ENV</span>
                </span>
                <span>VERIFIED SYSTEM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
