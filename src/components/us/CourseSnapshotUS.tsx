"use client";

import React, { useEffect, useState, useRef } from "react";
import { Check, BookOpen, Layers, Cpu, Award } from "lucide-react";

const checklistItems = [
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

export default function CourseSnapshotUS() {
  const [visibleStats, setVisibleStats] = useState<number[]>([0, 0, 0]);
  const [isChecklistVisible, setIsChecklistVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1500;
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
      className="w-full bg-transparent py-16 px-6 md:px-12 border-t border-gray-100 relative z-10 font-heading"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (Content & Stats) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-100 rounded-full">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#EE1C25]">
                  Course Snapshot
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-950 tracking-tight uppercase">
                Everything You Need To <br />
                Become <span className="text-[#EE1C25]">Industry Ready</span>
              </h2>
              <p className="text-neutral-500 text-sm font-semibold leading-relaxed">
                Empowering learners in the US with hands-on labs, custom AI workflows, and Direct Mentorship.
              </p>
            </div>

            {/* Bento Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-white to-slate-50 border border-gray-100 rounded-2xl p-6 hover:-translate-y-1 hover:border-red-100 transition-all duration-300">
                <BookOpen className="w-5 h-5 text-[#EE1C25] mb-2" />
                <span className="block text-4xl font-black text-gray-950 tracking-tight">
                  {visibleStats[0]}s
                </span>
                <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-1">
                  Hours of learning
                </span>
              </div>

              <div className="bg-gradient-to-br from-white to-slate-50 border border-gray-100 rounded-2xl p-6 hover:-translate-y-1 hover:border-red-100 transition-all duration-300">
                <Layers className="w-5 h-5 text-[#EE1C25] mb-2" />
                <span className="block text-4xl font-black text-gray-950 tracking-tight">
                  {visibleStats[1]}+
                </span>
                <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-1">
                  Industry Projects
                </span>
              </div>

              <div className="bg-gradient-to-br from-white to-slate-50 border border-gray-100 rounded-2xl p-6 hover:-translate-y-1 hover:border-red-100 transition-all duration-300">
                <Cpu className="w-5 h-5 text-[#EE1C25] mb-2" />
                <span className="block text-4xl font-black text-gray-950 tracking-tight">
                  {visibleStats[2]}+
                </span>
                <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-1">
                  GenAI Tools
                </span>
              </div>

              <div className="bg-gradient-to-br from-[#EE1C25] to-[#d61920] border border-red-500 rounded-2xl p-6 text-white flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
                <Award className="w-5 h-5 text-white mb-2" />
                <div>
                  <span className="block text-xs font-black uppercase text-white/90">
                    Career
                  </span>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-white/80 mt-1">
                    Focused Curriculum
                  </span>
                </div>
              </div>
            </div>

            {/* Pill/Chip Checklist (Wrap Layout) */}
            <div className="flex flex-wrap gap-2 pt-2">
              {checklistItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`inline-flex items-center gap-2 px-4 py-2 bg-neutral-50/80 border border-neutral-100 rounded-full shadow-xs hover:border-red-200 transition-all duration-500 transform ${
                    isChecklistVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}
                  style={{
                    transitionDelay: isChecklistVisible ? `${idx * 50}ms` : "0ms",
                  }}
                >
                  <div className="w-4 h-4 rounded-full bg-red-100 text-[#EE1C25] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Visual) */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative w-full max-w-[360px] aspect-square rounded-[32px] bg-gradient-to-br from-slate-50 to-white border border-gray-100 p-8 shadow-xl flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(238,28,37,0.06)_0%,transparent_75%)] pointer-events-none rounded-[32px]" />
              
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Simplified Matching staircase visual to fit inside this frame */}
                <circle cx="200" cy="200" r="160" fill="none" stroke="#EE1C25" strokeOpacity="0.1" strokeDasharray="1 5"/>
                
                {/* Mini Isometric Box Staircase */}
                <polygon points="80,310 110,325 80,340 50,325" fill="#fff" stroke="#00000014"/>
                <polygon points="50,325 80,340 80,365 50,350" fill="#f1f1f1" stroke="#00000014"/>
                <polygon points="80,340 110,325 110,350 80,365" fill="#dcdcdc" stroke="#00000014"/>

                <polygon points="150,280 180,295 150,311 120,295" fill="#f2f2f2" stroke="#00000018"/>
                <polygon points="120,295 150,311 150,365 120,349" fill="#c9c9c9" stroke="#00000018"/>
                <polygon points="150,311 180,295 180,349 150,365" fill="#a8a8a8" stroke="#00000018"/>

                <polygon points="220,240 250,255 220,271 190,255" fill="#4a4a4a" stroke="#00000030"/>
                <polygon points="190,255 220,271 220,365 190,349" fill="#2b2b2b" stroke="#00000030"/>
                <polygon points="220,271 250,255 250,349 220,365" fill="#171717" stroke="#00000030"/>

                <polygon points="290,190 320,205 290,221 260,205" fill="#ff6b64" stroke="#00000020"/>
                <polygon points="260,205 290,221 290,365 260,349" fill="#EE1C25" stroke="#00000020"/>
                <polygon points="290,221 320,205 320,349 290,365" fill="#b8141a" stroke="#00000020"/>

                <line x1="305" y1="205" x2="305" y2="120" stroke="#171717" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M305,120 L305,145 L350,135 Z" fill="#EE1C25"/>
                <circle cx="305" cy="205" r="4" fill="#fff" stroke="#EE1C25" strokeWidth="1.5"/>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
