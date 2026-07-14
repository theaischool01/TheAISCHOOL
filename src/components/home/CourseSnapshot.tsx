"use client";

import React, { useEffect, useState, useRef } from "react";
import { Check, BookOpen, Layers, Cpu, Award, MessageCircle, Star, Trophy } from "lucide-react";

const checklistItems = [
  "Learn from Startup Founders",
  "Live Industry Projects",
  "Personal Mentorship",
  "AI School Alumni Network",
  "Internship Certificate",
  "Placement Support",
];

export default function CourseSnapshot() {
  const [visibleStats, setVisibleStats] = useState<number[]>([0, 0, 0]);
  const [isChecklistVisible, setIsChecklistVisible] = useState(false);
  const [progressWidth, setProgressWidth] = useState("0%");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate numbers
          const duration = 1500; // ms
          const steps = 30;
          const stepTime = duration / steps;
          let currentStep = 0;

          const targets = [100, 7, 10];
          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const nextStats = targets.map((target) =>
              Math.min(Math.round(target * progress), target)
            );
            setVisibleStats(nextStats);

            if (currentStep >= steps) {
              clearInterval(timer);
              setIsChecklistVisible(true);
              setProgressWidth("85%"); // Animate progress bar in mockup
            }
          }, stepTime);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-12 lg:py-0 lg:h-[calc(100vh-100px)] lg:max-h-[680px] lg:min-h-[580px] px-6 md:px-12 border-t border-gray-100 relative z-10 font-heading flex items-center select-none"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[300px] bg-red-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ================= LEFT COLUMN (55% ON DESKTOP) ================= */}
          <div className="lg:col-span-7 space-y-5 lg:space-y-6 order-2 lg:order-1">
            {/* Header Area */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-red-50 border border-red-100 rounded-full">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#EE1C25]">
                  Course Snapshot
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-950 tracking-tight leading-tight uppercase">
                Everything You Need To <br className="hidden sm:inline" />
                Become <span className="text-[#EE1C25]">Industry Ready</span>
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed max-w-xl">
                Master production-grade workflows through live network challenges, mentored co-creation loops, and professional certifications.
              </p>
            </div>

            {/* Asymmetrical Bento layout for Statistic Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Metric 1 */}
              <div className="group bg-gradient-to-br from-white to-slate-50 border border-gray-100 rounded-2xl p-4 shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-red-100 transition-all duration-300">
                <BookOpen className="w-4 h-4 text-[#EE1C25] mb-2" />
                <span className="block text-3xl font-black text-gray-950 tracking-tight">
                  {visibleStats[0]}+
                </span>
                <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-0.5">
                  Hours Learning
                </span>
              </div>

              {/* Metric 2 */}
              <div className="group bg-gradient-to-br from-white to-slate-50 border border-gray-100 rounded-2xl p-4 shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-red-100 transition-all duration-300">
                <Layers className="w-4 h-4 text-[#EE1C25] mb-2" />
                <span className="block text-3xl font-black text-gray-950 tracking-tight">
                  {visibleStats[1]}+
                </span>
                <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-0.5">
                  Industry Projects
                </span>
              </div>

              {/* Metric 3 */}
              <div className="group bg-gradient-to-br from-white to-slate-50 border border-gray-100 rounded-2xl p-4 shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-red-100 transition-all duration-300">
                <Cpu className="w-4 h-4 text-[#EE1C25] mb-2" />
                <span className="block text-3xl font-black text-gray-950 tracking-tight">
                  {visibleStats[2]}+
                </span>
                <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-0.5">
                  GenAI Tools
                </span>
              </div>

              {/* Career focused - Asymmetrical Bento Span Card */}
              <div className="group bg-gradient-to-br from-[#EE1C25] to-[#d61920] border border-red-500 rounded-2xl p-4 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-white">
                <Award className="w-4 h-4 text-white" />
                <div className="mt-2">
                  <span className="block text-xs font-black uppercase leading-none text-white/90">
                    Career
                  </span>
                  <span className="block text-[10px] font-bold uppercase tracking-wider mt-0.5 text-white/80">
                    Focused Curriculum
                  </span>
                </div>
              </div>
            </div>

            {/* Checklist Flowing Wrap Layout */}
            <div className="flex flex-wrap gap-2 pt-1">
              {checklistItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-50/70 border border-gray-100 rounded-full shadow-xs hover:border-red-200 transition-all duration-500 transform ${
                    isChecklistVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}
                  style={{
                    transitionDelay: isChecklistVisible ? `${idx * 75}ms` : "0ms",
                  }}
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-red-50 text-[#EE1C25] flex items-center justify-center shrink-0 border border-red-100">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="/learn"
                className="group inline-flex items-center gap-2 bg-[#EE1C25] hover:bg-[#d61920] text-white font-bold text-xs uppercase tracking-widest px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Explore Curriculum
                <span className="group-hover:translate-x-1 transition-transform inline-block">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (45% ON DESKTOP) ================= */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center w-full">
            {/* Visual Frame Wrapper with rounded border-box framing preventing boundary clipping */}
            <div className="relative w-full max-w-[340px] lg:max-w-[380px] aspect-square rounded-[32px] bg-gradient-to-br from-slate-50 to-white border border-gray-100 p-8 shadow-xl flex items-center justify-center overflow-visible">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(238,28,37,0.06)_0%,transparent_75%)] pointer-events-none rounded-[32px]" />
              
              {/* Floating accent particles */}
              <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-red-400/40 animate-pulse" />
              <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-red-300/30 animate-pulse delay-500" />

              {/* Coded Product Mockup Composition */}
              <div className="relative w-full h-full flex items-center justify-center select-none overflow-visible">
                
                {/* 1. Main Course Card Mockup */}
                <div className="absolute w-[82%] bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-2xl rotate-1 z-10">
                  {/* Browser-style top bar */}
                  <div className="bg-slate-50 border-b border-gray-100 px-3.5 py-1.5 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  </div>
                  
                  <div className="p-3.5 relative">
                    {/* Thumbnail Block */}
                    <div className="w-full h-20 bg-gradient-to-tr from-slate-100 to-slate-50 rounded-xl mb-2.5 relative overflow-hidden flex items-center justify-center border border-gray-50">
                      <div className="w-8.5 h-8.5 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                        <Cpu className="w-4 h-4 text-[#EE1C25]" />
                      </div>
                    </div>
                    {/* Rating badge sits as a small corner tag inside the main card */}
                    <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-xs border border-gray-150 rounded-full px-2 py-0.5 shadow-sm flex items-center gap-1 z-20">
                      <Star className="w-2.5 h-2.5 fill-[#FBBC05] stroke-none" />
                      <span className="text-[8px] font-black text-gray-950">4.9</span>
                    </div>

                    {/* Course Title Line */}
                    <h4 className="text-[10px] font-black text-gray-950 uppercase tracking-wide mb-2">
                      Advanced Generative AI
                    </h4>
                    {/* Progress Bar Container */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[8px] font-bold text-neutral-400 uppercase tracking-wider">
                        <span>Progress</span>
                        <span className="text-[#EE1C25]">85%</span>
                      </div>
                      <div className="w-full h-1 bg-neutral-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#EE1C25] rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: progressWidth }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Certificate / Badge Card (Overlapping bottom-left with safe margins) */}
                <div className="absolute -bottom-4 -left-5 w-[48%] bg-white border border-gray-150 rounded-xl p-2.5 shadow-lg -rotate-6 z-25 flex items-center gap-2 animate-float-slow">
                  <div className="p-1 bg-red-50 text-[#EE1C25] rounded-md border border-red-100">
                    <Trophy className="w-3.5 h-3.5" />
                  </div>
                  <div className="leading-tight">
                    <span className="block text-[8px] font-black text-gray-950 uppercase">Certified</span>
                    <span className="block text-[7px] font-bold text-neutral-400 uppercase tracking-wider">AI Engineer</span>
                  </div>
                </div>

                {/* 3. Mentor Chat Bubble (Overlapping top-right with live status indicator) */}
                <div className="absolute -top-6 -right-5 w-[52%] bg-white border border-gray-150 rounded-xl p-2.5 shadow-lg rotate-3 z-20 flex gap-2.5 items-start animate-float-slower">
                  <div className="p-1 bg-red-50 text-[#EE1C25] rounded-full border border-red-100 shrink-0 relative">
                    <MessageCircle className="w-3 h-3" />
                    {/* Green Live Online Status Indicator */}
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#25D366] rounded-full border border-white" />
                  </div>
                  <div className="space-y-0.5 leading-none">
                    <span className="block text-[8px] font-black text-gray-950">Mentor Feedback</span>
                    <span className="block text-[7px] font-bold text-slate-500">Code review complete</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50% { transform: translateY(-4px) rotate(-4deg); }
        }
        @keyframes floatSlower {
          0%, 100% { transform: translateY(0) rotate(3deg); }
          50% { transform: translateY(-3px) rotate(4deg); }
        }
        .animate-float-slow {
          animation: floatSlow 6s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: floatSlower 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
