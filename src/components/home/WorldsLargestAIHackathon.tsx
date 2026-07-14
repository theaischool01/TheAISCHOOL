"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Trophy, 
  Users, 
  ChevronRight,
  Clock,
  Laptop,
  GraduationCap
} from "lucide-react";

// Consolidated Bento Statistic Cards
// Option A: Clean, unified single-row card sizing scaling to equal dimensions
const bentoStats = [
  {
    value: "3500+",
    label: "Teams Registered",
    desc: "National participation from leading universities and developer collectives.",
    icon: Users,
    sizeClass: "bg-gradient-to-br from-[#EE1C25] to-[#d61920] text-white border-red-500 shadow-lg"
  },
  {
    value: "30+ Hrs",
    label: "Co-creation Sprint",
    desc: "Non-stop brainstorm and code sprint to build working prototypes.",
    icon: Clock,
    sizeClass: ""
  },
  {
    value: "113",
    label: "Active Participants",
    desc: "Vetted builders coding live.",
    icon: GraduationCap,
    sizeClass: ""
  },
  {
    value: "19",
    label: "Finalists Shortlisted",
    desc: "Pitched to the Grand Jury panel.",
    icon: Trophy,
    sizeClass: ""
  },
  {
    value: "₹4.5L",
    label: "Cash Prize Pool",
    desc: "Distributed across winners, runners-up, and innovative prototypes.",
    icon: Trophy,
    sizeClass: "sm:col-span-2 md:col-span-1"
  },
  {
    value: "33+",
    label: "Colleges Represented",
    desc: "Pan-India institutional representation.",
    icon: Laptop,
    sizeClass: ""
  }
];

// Curated 4 Images for a Tight Bento Gallery Grid
const galleryImages = [
  {
    src: "/images/hackathon_group1.jpg",
    alt: "5G & 6G Hackathon Participants Group Photo",
    className: "md:col-span-2 md:row-span-2"
  },
  {
    src: "/images/hackathon_stage1.jpg",
    alt: "Hackathon Stage Winners & VIP Ceremony",
    className: "md:col-span-2 md:row-span-1"
  },
  {
    src: "/images/hackathon_working1.png",
    alt: "Participants building AI prototypes",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    src: "/images/hackathon_pitch1.png",
    alt: "AI project pitch to judges panel",
    className: "md:col-span-1 md:row-span-1"
  }
];

export default function WorldsLargestAIHackathon() {
  const [visibleStats, setVisibleStats] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimatedStats, setHasAnimatedStats] = useState(false);

  useEffect(() => {
    const currentRef = statsSectionRef.current;
    const numericTargets = [3500, 30, 113, 19, 4.5, 33];
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedStats) {
          setHasAnimatedStats(true);
          const duration = 1500; // ms
          const steps = 30;
          const stepTime = duration / steps;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const newStats = numericTargets.map((target) => {
              if (target % 1 !== 0) {
                return parseFloat((target * progress).toFixed(1));
              }
              return Math.min(Math.round(target * progress), target);
            });
            setVisibleStats(newStats);

            if (currentStep >= steps) {
              clearInterval(timer);
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
  }, [hasAnimatedStats]);

  return (
    <section className="w-full bg-white py-20 px-6 md:px-12 border-t border-gray-100 relative z-10 font-heading overflow-hidden select-none">
      {/* Light Radial Background Mesh Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(circle,rgba(238,28,37,0.02)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* ================= SECTION 1: ONE CONSOLIDATED HERO ================= */}
        <div className="text-center space-y-5 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-50 border border-red-100 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#EE1C25] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#EE1C25]">
              National Hackathon Platform
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight leading-tight uppercase">
            World&#39;s Largest <span className="text-[#EE1C25]">AI Hackathon</span>
          </h2>

          <p className="text-xs sm:text-sm font-semibold text-slate-600 max-w-xl mx-auto leading-relaxed">
            India&#39;s premier AI innovation platform connecting students, developers, and industry leaders through live networks and collaborative engineering.
          </p>
        </div>

        {/* ================= SECTION 2: CONSOLIDATED SINGLE-ROW STATS GRID ================= */}
        <div 
          ref={statsSectionRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {bentoStats.map((stat, idx) => {
            const Icon = stat.icon;
            const isHero = stat.sizeClass.includes("bg-[#EE1C25]");
            return (
              <div 
                key={idx}
                className={`group border rounded-3xl p-5 transition-all duration-300 flex flex-col justify-between min-h-[160px] ${
                  isHero 
                    ? stat.sizeClass 
                    : "bg-gradient-to-br from-white to-slate-50 border-gray-100 hover:shadow-lg hover:-translate-y-1 hover:border-red-100 " + stat.sizeClass
                }`}
              >
                <div className="space-y-3">
                  <div className={`p-2.5 rounded-xl w-fit ${
                    isHero ? "bg-white/10 text-white" : "bg-red-50 text-[#EE1C25] border border-red-100"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className={`block text-[9px] font-bold uppercase tracking-wider ${
                      isHero ? "text-white/70" : "text-neutral-400"
                    }`}>
                      {stat.label}
                    </span>
                    <p className={`text-[10px] font-semibold mt-1 leading-tight ${
                      isHero ? "text-white/80" : "text-neutral-500"
                    }`}>
                      {stat.desc}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-black tracking-tight leading-none">
                    {idx === 0 ? `${visibleStats[0]}+` : 
                     idx === 1 ? `${visibleStats[1]}+ Hrs` : 
                     idx === 2 ? `${visibleStats[2]}` : 
                     idx === 3 ? `${visibleStats[3]}` : 
                     idx === 4 ? `₹${visibleStats[4]}L` : 
                     `${visibleStats[5]}+`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= SECTION 3: TIGHT GALLERY GRID ================= */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#EE1C25]">
              Innovation in Action
            </span>
            <h3 className="text-2xl font-black text-gray-950 uppercase tracking-tight">
              Hackathon Gallery
            </h3>
          </div>

          <div className="relative group/gallery max-w-5xl mx-auto">
            <Link href="/hackathon#gallery">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[160px] cursor-pointer">
                {galleryImages.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`relative overflow-hidden rounded-2xl border border-gray-150 group shadow-xs ${img.className}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
              {/* Premium Hover Blur Card Overlay */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 rounded-2xl z-20 pointer-events-none">
                <div className="bg-white border border-gray-200 px-6 py-3 rounded-full shadow-lg text-xs font-black text-gray-950 uppercase tracking-widest flex items-center gap-2 transform translate-y-3 group-hover/gallery:translate-y-0 transition-transform duration-300">
                  View Full Gallery <ChevronRight className="w-4 h-4 text-[#EE1C25]" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* ================= SECTION 4: ONE CLEAR CTA ================= */}
        <div className="text-center pt-4 flex flex-col items-center gap-3">
          <Link
            href="/hackathon"
            className="group inline-flex items-center justify-center gap-3 bg-[#EE1C25] hover:bg-[#d61920] text-white font-bold text-xs uppercase tracking-widest px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Explore Full Hackathon Experience
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-50 border border-gray-100 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">
              Next Track Launching Soon
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
