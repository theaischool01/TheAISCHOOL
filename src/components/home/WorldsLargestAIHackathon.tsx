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

// Consolidated Bento Statistic Cards with Premium Color Themes
const bentoStats = [
  {
    label: "Teams Registered",
    desc: "National participation from leading universities.",
    icon: Users,
    theme: {
      bg: "from-red-500/[0.03] to-red-600/[0.01]",
      border: "border-red-100 group-hover:border-red-300",
      iconBg: "bg-red-50 text-[#EE1C25]",
      glow: "group-hover:shadow-[0_20px_40px_-15px_rgba(238,28,37,0.15)]",
      suffix: "+"
    }
  },
  {
    label: "Co-creation Sprint",
    desc: "Non-stop brainstorm and code sprint to build working prototypes.",
    icon: Clock,
    theme: {
      bg: "from-orange-500/[0.03] to-orange-600/[0.01]",
      border: "border-orange-100 group-hover:border-orange-300",
      iconBg: "bg-orange-50 text-orange-500",
      glow: "group-hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.15)]",
      suffix: "+ Hrs"
    }
  },
  {
    label: "Active Participants",
    desc: "Vetted builders coding live.",
    icon: Users,
    theme: {
      bg: "from-blue-500/[0.03] to-blue-600/[0.01]",
      border: "border-blue-100 group-hover:border-blue-300",
      iconBg: "bg-blue-50 text-blue-500",
      glow: "group-hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)]",
      suffix: ""
    }
  },
  {
    label: "Finalists Shortlisted",
    desc: "Pitched to the Grand Jury panel.",
    icon: Trophy,
    theme: {
      bg: "from-purple-500/[0.03] to-purple-600/[0.01]",
      border: "border-purple-100 group-hover:border-purple-300",
      iconBg: "bg-purple-50 text-purple-500",
      glow: "group-hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.15)]",
      suffix: ""
    }
  },
  {
    label: "Cash Prize Pool",
    desc: "Distributed across winners and innovative prototypes.",
    icon: Trophy,
    theme: {
      bg: "from-yellow-500/[0.03] to-yellow-600/[0.01]",
      border: "border-yellow-100 group-hover:border-yellow-300",
      iconBg: "bg-yellow-50 text-yellow-600",
      glow: "group-hover:shadow-[0_20px_40px_-15px_rgba(234,179,8,0.15)]",
      prefix: "₹",
      suffix: "L"
    }
  },
  {
    label: "Colleges Represented",
    desc: "Pan-India institutional representation.",
    icon: Laptop,
    theme: {
      bg: "from-emerald-500/[0.03] to-emerald-600/[0.01]",
      border: "border-emerald-100 group-hover:border-emerald-300",
      iconBg: "bg-emerald-50 text-emerald-500",
      glow: "group-hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)]",
      suffix: "+"
    }
  }
];

// Curated 8 Images for a Seamless Premium Gallery Grid (2 Large, 4 Medium, 2 Small)
const galleryImages = [
  {
    src: "/images/hackathon_group1.jpg",
    alt: "5G & 6G Hackathon Participants Group Photo",
    className: "md:col-span-2 md:row-span-2",
    objectPosition: "object-center"
  },
  {
    src: "/images/hackathon_stage1.jpg",
    alt: "Hackathon Stage Winners & VIP Ceremony",
    className: "md:col-span-2 md:row-span-1",
    objectPosition: "object-center"
  },
  {
    src: "/images/hackathon_working1.png",
    alt: "Participants building AI prototypes",
    className: "md:col-span-1 md:row-span-1",
    objectPosition: "object-center"
  },
  {
    src: "/images/hackathon_pitch1.png",
    alt: "AI project pitch to judges panel",
    className: "md:col-span-1 md:row-span-1",
    objectPosition: "object-center"
  },
  {
    src: "/images/hackathon_group3.png",
    alt: "Delegates and organizers group photo at hackathon summit",
    className: "md:col-span-2 md:row-span-1",
    objectPosition: "object-center"
  },
  {
    src: "/images/hackathon_team1.png",
    alt: "Hackathon team working space session",
    className: "md:col-span-1 md:row-span-1",
    objectPosition: "object-center"
  },
  {
    src: "/images/hackathon_working2.png",
    alt: "Mentors guiding teams on network protocols",
    className: "md:col-span-1 md:row-span-1",
    objectPosition: "object-center"
  },
  {
    src: "/images/hackathon_felicitation1.png",
    alt: "Founder Receiving Recognition Award",
    className: "md:col-span-2 md:row-span-1",
    objectPosition: "object-top" // Prevents the founder's face from being cut off
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
    <section className="w-full bg-white py-28 lg:py-36 px-6 md:px-12 border-t border-gray-100 relative z-10 font-heading overflow-hidden select-none">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"
        >
          {bentoStats.map((stat, idx) => {
            const Icon = stat.icon;
            const t = stat.theme;
            
            const rawVal = visibleStats[idx];
            let displayVal = rawVal.toString();
            if (t.prefix) displayVal = t.prefix + displayVal;
            if (t.suffix) displayVal = displayVal + t.suffix;

            return (
              <div 
                key={idx}
                className={`group relative bg-gradient-to-br ${t.bg} border ${t.border} rounded-2xl p-6 flex flex-col justify-between min-h-[220px] transition-all duration-350 ${t.glow} hover:-translate-y-1 overflow-hidden`}
              >
                {/* Decorative background grid pattern inside card */}
                <div 
                  className="absolute inset-0 opacity-[0.015] pointer-events-none" 
                  style={{
                    backgroundImage: `linear-gradient(to right, gray 1px, transparent 1px), linear-gradient(to bottom, gray 1px, transparent 1px)`,
                    backgroundSize: '15px 15px'
                  }}
                />
                
                <div className="space-y-4 relative z-10">
                  <div className={`p-3 rounded-full w-fit ${t.iconBg} shadow-sm transition-transform duration-350 group-hover:scale-110`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-black text-gray-950 uppercase tracking-wide">
                      {stat.label}
                    </h4>
                    <p className="text-xs font-semibold text-neutral-500 mt-1.5 leading-relaxed">
                      {stat.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-6 relative z-10">
                  <span className="text-3xl lg:text-4xl font-black tracking-tight text-gray-950 block">
                    {displayVal}
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
                      className={`object-cover ${img.objectPosition} group-hover:scale-102 transition-transform duration-500`}
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
