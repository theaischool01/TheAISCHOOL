"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function TeamPreview() {
  const founders = [
    {
      name: "Ganta Srinath Reddy",
      role: "Founder/CEO",
      initials: "SR",
      image: "/mentors/srinath.webp",
    },
    {
      name: "K. Spandana",
      role: "Co-Founder",
      initials: "KS",
      image: "/mentors/spandana.webp",
    },
  ];

  const partnerAvatars = [
    { initials: "AC", image: "/mentors/arun.webp",   name: "Arun Chinnachamy" },
    { initials: "GK", image: "/mentors/gopi.webp",   name: "Gopi Krishna" },
    { initials: "KB", image: "/mentors/kiran.webp",  name: "Kiran Babu" },
    { initials: "RM", image: "/mentors/raja.webp",   name: "Raja Mamidi" },
    { initials: "RR", image: "/mentors/ranjan.webp", name: "Ranjan Relan" },
  ];

  const mentorAvatars = [
    { initials: "VP", image: "/images/mentor_vikas_v2.png",   name: "Vikas Patel" },
    { initials: "SP", image: "/images/mentor_sagnik_v2.png",  name: "Sagnik Pal" },
    { initials: "AV", image: "/images/mentor_akhil_v2.png",   name: "Akhil Vydyula" },
    { initials: "AP", image: "/images/mentor_anshu_v2.png",   name: "Anshu Pandey" },
    { initials: "HK", image: "/images/mentor_harish_v2.png",  name: "Harish Kumar" },
    { initials: "MB", image: "/images/mentor_mohit.png",      name: "Mohit Bhatia" },
  ];

  return (
    <section className="w-full bg-transparent py-14 lg:py-16 px-6 md:px-12 relative z-10 font-heading select-none">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Title */}
        <div className="text-center space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#EE1C25]">
            Who We Are
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-gray-950 uppercase tracking-tight">
            Meet the Builders
          </h3>
        </div>

        {/* Fully Vertical Stack: 3 Rows */}
        <div className="flex flex-col gap-6 w-full">
          
          {/* ROW 1: Centered Founders Pair */}
          <div className="w-full">
            <div className="max-w-2xl mx-auto grid grid-cols-2 gap-6">
              {founders.map((founder, idx) => (
                <div 
                  key={idx} 
                  className="bg-gradient-to-br from-white to-slate-50 border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                >
                  {/* 96px Circular Avatar with real photo */}
                  <div className="w-24 h-24 rounded-full bg-slate-200 text-slate-600 font-extrabold text-2xl flex items-center justify-center mb-4 border border-slate-300/40 overflow-hidden relative shrink-0">
                    {founder.image ? (
                      <Image
                        src={founder.image}
                        alt={founder.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : (
                      founder.initials
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-gray-900 tracking-tight uppercase leading-snug">
                      {founder.name}
                    </h4>
                    <p className="text-[10px] font-extrabold text-[#EE1C25] uppercase tracking-wider mt-0.5">
                      {founder.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ROW 2: Industry Partners Strip (Full-width) */}
          <div className="w-full">
            <div className="bg-gradient-to-br from-white to-slate-50 border border-gray-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300">
              <div className="space-y-2">
                <span className="text-[9px] font-black uppercase tracking-wider text-neutral-400">
                  Industry Partners
                </span>
                <p className="text-xs md:text-sm font-bold text-slate-700 leading-normal max-w-xl">
                  Backed by founders from Hyperleap.ai, Rava.ai, DotCheckout, AgentAnalytics.AI & more.
                </p>
                <Link 
                  href="/about-us" 
                  className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#EE1C25] hover:text-[#d61920] mt-1"
                >
                  Meet Our Partners <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Avatar Cluster with slight spread to fit the wider space */}
              <div className="flex items-center -space-x-4 pl-2 shrink-0 md:self-center">
                {partnerAvatars.map((avatar, idx) => (
                  <div 
                    key={idx} 
                    className="w-16 h-16 rounded-full bg-slate-200 border-2 border-white overflow-hidden relative shadow-sm shrink-0"
                  >
                    {avatar.image ? (
                      <Image
                        src={avatar.image}
                        alt={avatar.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex items-center justify-center w-full h-full text-xs font-black text-slate-600">
                        {avatar.initials}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ROW 3: Expert Network Strip (Full-width) */}
          <div className="w-full">
            <div className="bg-gradient-to-br from-white to-slate-50 border border-gray-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300">
              <div className="space-y-2">
                <span className="text-[9px] font-black uppercase tracking-wider text-neutral-400">
                  Expert Network
                </span>
                <p className="text-xs md:text-sm font-bold text-slate-700 leading-normal max-w-xl">
                  Learn live with 9+ seasoned machine learning, platform engineering, and RAG architectures consultants.
                </p>
                <Link 
                  href="/about-us" 
                  className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#EE1C25] hover:text-[#d61920] mt-1"
                >
                  View All Mentors <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Avatar Cluster with slight spread to fit the wider space */}
              <div className="flex items-center -space-x-4 pl-2 shrink-0 md:self-center">
                {mentorAvatars.map((avatar, idx) => (
                  <div 
                    key={idx} 
                    className="w-16 h-16 rounded-full bg-slate-200 border-2 border-white overflow-hidden relative shadow-sm shrink-0"
                  >
                    {avatar.image ? (
                      <Image
                        src={avatar.image}
                        alt={avatar.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex items-center justify-center w-full h-full text-xs font-black text-slate-600">
                        {avatar.initials}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
