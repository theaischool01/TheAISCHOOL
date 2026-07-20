"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HackathonFeatures from "@/components/hackathon/HackathonFeatures";
import HackathonTimeline from "@/components/hackathon/HackathonTimeline";
import HackathonFuture from "@/components/hackathon/HackathonFuture";
import RegistrationForm from "@/components/home/RegistrationForm";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { 
  Trophy, 
  Users, 
  Clock,
  Laptop
} from "lucide-react";

const snapshotStats = [
  {
    value: "30+",
    label: "Hours of Intense",
    highlight: "Co-creation",
    desc: "Non-stop brainstorm and code sprint to build working prototypes.",
    icon: Clock,
  },
  {
    value: "15+",
    label: "Industry Expert",
    highlight: "Mentors",
    desc: "Direct support from tech experts representing active startups.",
    icon: Users,
  },
  {
    value: "100+",
    label: "Participating Tech",
    highlight: "Developers",
    desc: "Collaborative building loops and peer networking opportunities.",
    icon: Laptop,
  },
  {
    value: "₹50k+",
    label: "Cash Prize &",
    highlight: "Incubation",
    desc: "Exclusive awards and support to launch selected ideas as products.",
    icon: Trophy,
  },
];

const statsData = [
  { value: 3500, label: "Teams Registered", suffix: "+" },
  { value: 839, label: "Applications" },
  { value: 72, label: "Teams Competed" },
  { value: 41, label: "Shortlisted" },
  { value: 15, label: "Winners Selected" }
];

const galleryImages = [
  {
    src: "/images/hackathon_main.jpg",
    alt: "Main presentation stage at T-Hub 2.0 Hyderabad",
    className: "md:col-span-2 md:row-span-2",
    objectPosition: "object-center"
  },
  {
    src: "/images/hackathon_team1.png",
    alt: "Teams brainstorming solution architectures",
    className: "md:col-span-2 md:row-span-1",
    objectPosition: "object-center"
  },
  {
    src: "/images/hackathon_mentoring1.png",
    alt: "Jury evaluating prompt engineering prototypes",
    className: "md:col-span-1 md:row-span-1",
    objectPosition: "object-center"
  },
  {
    src: "/images/hackathon_pitch1.png",
    alt: "Finalist presenting to telecom board directors",
    className: "md:col-span-1 md:row-span-1",
    objectPosition: "object-center"
  },
  {
    src: "/images/hackathon_stage2.png",
    alt: "Winning teams with TCOE grand prizes",
    className: "md:col-span-1 md:row-span-1",
    objectPosition: "object-center"
  },
  {
    src: "/images/hackathon_working2.png",
    alt: "Mentors guiding teams on network protocols",
    className: "md:col-span-1 md:row-span-1",
    objectPosition: "object-center"
  }
];

export default function DedicatedHackathonPage() {
  const [visibleStats, setVisibleStats] = useState<number[]>([0, 0, 0, 0, 0]);
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimatedStats, setHasAnimatedStats] = useState(false);

  useEffect(() => {
    const currentRef = statsSectionRef.current;
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
            const newStats = statsData.map((stat) => {
              const target = stat.value;
              const progress = currentStep / steps;
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
    <main className="relative min-h-screen bg-white">
      <Header />

      {/* ================= HERO & HEADLINE (Row 1 - White) ================= */}
      <SectionWrapper tone="white">
        <section className="w-full bg-transparent pt-36 pb-20 px-6 md:px-12 relative font-heading">
          <div className="max-w-7xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 border border-red-100 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#EE1C25] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#EE1C25]">
                National Hackathon Platform
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-gray-950 tracking-tight leading-tight uppercase">
              World&#39;s Largest <span className="text-[#EE1C25]">AI Hackathon</span>
            </h1>

            <p className="text-base md:text-lg font-semibold text-slate-600 max-w-2xl mx-auto leading-relaxed">
              India&#39;s premier AI innovation platform connecting students, developers, and industry leaders through live networks and collaborative engineering.
            </p>
          </div>
        </section>
      </SectionWrapper>

      {/* ================= EVENT SNAPSHOT HIGHLIGHTS (Row 2 - Tinted) ================= */}
      <SectionWrapper tone="tinted">
        <section className="w-full bg-transparent pb-20 px-6 md:px-12 font-heading">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {snapshotStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={idx}
                  className="group bg-white border border-gray-200/80 rounded-3xl p-8 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
                >
                  <div className="space-y-4">
                    <div className="p-3 bg-red-50 text-[#EE1C25] border border-red-100 rounded-2xl w-fit group-hover:bg-[#EE1C25] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="block text-sm font-extrabold text-neutral-500 uppercase tracking-wider">{stat.label}</span>
                      <span className="block text-sm font-black text-gray-950 uppercase">{stat.highlight}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-3xl font-black text-gray-950">{stat.value}</span>
                    <p className="text-[11px] font-semibold text-neutral-400 leading-normal mt-1">{stat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </SectionWrapper>

      {/* ================= HACKATHON FEATURES (Row 3 - White) ================= */}
      <SectionWrapper tone="white">
        <HackathonFeatures />
      </SectionWrapper>

      {/* ================= HACKATHON CYCLE TIMELINE (Row 4 - Tinted) ================= */}
      <SectionWrapper tone="tinted">
        <HackathonTimeline />
      </SectionWrapper>

      {/* ================= STATISTICS & OUTCOMES (Row 5 - White) ================= */}
      <SectionWrapper tone="white">
        <section ref={statsSectionRef} className="w-full bg-transparent py-14 px-6 md:px-12 font-heading">
          <div className="max-w-7xl mx-auto bg-slate-50 border border-gray-100 rounded-[2.5rem] py-16 px-8 grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {statsData.map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <span className="block text-4xl md:text-5xl font-black text-gray-950 tracking-tight font-heading">
                  {visibleStats[idx]}{stat.suffix || ""}
                </span>
                <span className="block text-xs font-bold text-neutral-500 uppercase tracking-wider leading-relaxed">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      </SectionWrapper>

      {/* ================= FULL GALLERY (Row 6 - Tinted) ================= */}
      <SectionWrapper tone="tinted">
        <section id="gallery" className="w-full bg-transparent py-14 px-6 md:px-12 font-heading">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25]">
                Innovation in Action
              </span>
              <h2 className="text-3xl font-black text-gray-950 uppercase">
                Hackathon Gallery
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`relative overflow-hidden rounded-[2rem] border border-gray-200/80 group shadow-xs ${img.className}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-cover ${img.objectPosition || "object-center"} group-hover:scale-105 transition-transform duration-500`}
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 z-10">
                    <span className="text-white text-xs font-bold font-heading uppercase tracking-wide">
                      {img.alt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* ================= FUTURE PLATFORM CARD (Row 7 - White) ================= */}
      <SectionWrapper tone="white">
        <HackathonFuture />
      </SectionWrapper>

      {/* ================= REGISTER INTEREST FORM (Distinct - Excluded) ================= */}
      <div id="register" className="border-t border-gray-100">
        <RegistrationForm />
      </div>

      <Footer />
    </main>
  );
}
