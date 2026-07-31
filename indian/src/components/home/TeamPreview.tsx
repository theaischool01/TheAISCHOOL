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
      bio: "Srinath is a startup founder and veteran AI solutions architect. He specializes in designing large language model pipelines, agent orchestration frameworks, and production-ready machine learning architectures."
    },
    {
      name: "K. Spandana",
      role: "Co-Founder",
      initials: "KS",
      image: "/mentors/spandana.webp",
      bio: "Spandana is an experienced educator and deep-learning operations specialist. She leads curriculum design, student mentorship tracks, and strategic placement partnerships across tech sectors."
    },
  ];

  const partnerAvatars = [
    { initials: "AC", image: "/mentors/arun.webp",   name: "Arun Chinnachamy", role: "CTO, Hyperleap.ai" },
    { initials: "GK", image: "/mentors/gopi.webp",   name: "Gopi Krishna",     role: "CEO, Rava.ai" },
    { initials: "KB", image: "/mentors/kiran.webp",  name: "Kiran Babu",       role: "Founder, DotCheckout" },
    { initials: "RM", image: "/mentors/raja.webp",   name: "Raja Mamidi",      role: "Lead, AgentAnalytics" },
    { initials: "RR", image: "/mentors/ranjan.webp", name: "Ranjan Relan",     role: "AI Consultant" },
  ];

  const mentorAvatars = [
    { initials: "VP", image: "/images/mentor_vikas_v2.png",  name: "Vikas Patel",   role: "ML Consultant" },
    { initials: "SP", image: "/images/mentor_sagnik_v2.png", name: "Sagnik Pal",    role: "Senior AI Architect" },
    { initials: "AV", image: "/images/mentor_akhil_v2.png",  name: "Akhil Vydyula", role: "Agent Specialist" },
    { initials: "AP", image: "/images/mentor_anshu_v2.png",  name: "Anshu Pandey",  role: "NLP Researcher" },
    { initials: "HK", image: "/images/mentor_harish_v2.png", name: "Harish Kumar",  role: "RAG Architect" },
  ];

  return (
    <section className="w-full bg-transparent py-16 lg:py-20 px-6 md:px-12 relative z-10 font-heading select-none">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Title */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl md:text-3xl font-black text-gray-950 uppercase tracking-tight">
            Our Leadership Members
          </h3>
        </div>

        {/* ================= SECTION 1: FOUNDERS ROW ================= */}
        <div className="w-full">
          {/* Desktop Layout (12-column grid, items-stretch) */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Block 1 (tall, left): Founder card */}
            <div className="lg:col-span-3 bg-gradient-to-br from-white to-slate-50 border border-gray-150 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 min-h-[340px]">
              <div className="w-24 h-24 rounded-full bg-slate-200 text-slate-600 font-extrabold text-2xl flex items-center justify-center mb-5 border border-slate-300/40 overflow-hidden relative shrink-0">
                {founders[0].image ? (
                  <Image
                    src={founders[0].image}
                    alt={founders[0].name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  founders[0].initials
                )}
              </div>
              <div>
                <h4 className="text-sm font-black text-gray-900 tracking-tight uppercase leading-snug">
                  {founders[0].name}
                </h4>
                <p className="text-xs font-extrabold text-[#EE1C25] uppercase tracking-wider mt-1">
                  {founders[0].role}
                </p>
              </div>
            </div>

            {/* Middle stacked column (Block 2 and Block 3) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {/* Block 2 (short, wide, stacked above Block 3) */}
              <div className="flex-1 bg-gradient-to-br from-white to-slate-50 border border-gray-150 rounded-2xl p-6 flex flex-col justify-center shadow-xs hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300">
                <span className="text-[9px] font-black uppercase tracking-wider text-[#EE1C25] mb-1">Founder Profile</span>
                <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                  {founders[0].bio}
                </p>
              </div>

              {/* Block 3 (short, wide, stacked below Block 2) */}
              <div className="flex-1 bg-gradient-to-br from-white to-slate-50 border border-gray-150 rounded-2xl p-6 flex flex-col justify-center shadow-xs hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300">
                <span className="text-[9px] font-black uppercase tracking-wider text-[#EE1C25] mb-1">Co-Founder Profile</span>
                <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                  {founders[1].bio}
                </p>
              </div>
            </div>

            {/* Block 4 (tall/large, right): Co-founder card */}
            <div className="lg:col-span-4 bg-gradient-to-br from-white to-slate-50 border border-gray-150 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 min-h-[340px]">
              <div className="w-28 h-28 rounded-full bg-slate-200 text-slate-600 font-extrabold text-3xl flex items-center justify-center mb-5 border border-slate-300/40 overflow-hidden relative shrink-0">
                {founders[1].image ? (
                  <Image
                    src={founders[1].image}
                    alt={founders[1].name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                ) : (
                  founders[1].initials
                )}
              </div>
              <div>
                <h4 className="text-sm font-black text-gray-900 tracking-tight uppercase leading-snug">
                  {founders[1].name}
                </h4>
                <p className="text-xs font-extrabold text-[#EE1C25] uppercase tracking-wider mt-1">
                  {founders[1].role}
                </p>
              </div>
            </div>

          </div>

          {/* Mobile/Tablet Responsive Layout (Block 1+2 stacked, Block 3+4 stacked) */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Founder Stack (Block 1 + Block 2) */}
            <div className="flex flex-col gap-6">
              {/* Block 1 */}
              <div className="bg-gradient-to-br from-white to-slate-50 border border-gray-150 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 min-h-[260px]">
                <div className="w-24 h-24 rounded-full bg-slate-200 border border-slate-300/45 overflow-hidden relative mb-4">
                  {founders[0].image && (
                    <Image src={founders[0].image} alt={founders[0].name} fill sizes="96px" className="object-cover" />
                  )}
                </div>
                <h4 className="text-sm font-black text-gray-900 uppercase">{founders[0].name}</h4>
                <p className="text-xs font-extrabold text-[#EE1C25] uppercase tracking-wider mt-1">{founders[0].role}</p>
              </div>
              {/* Block 2 */}
              <div className="bg-gradient-to-br from-white to-slate-50 border border-gray-150 rounded-2xl p-6 shadow-xs hover:-translate-y-0.5 transition-all duration-300">
                <span className="text-[9px] font-black uppercase tracking-wider text-[#EE1C25] mb-1 block">Founder Profile</span>
                <p className="text-xs font-semibold text-slate-600 leading-relaxed">{founders[0].bio}</p>
              </div>
            </div>

            {/* Co-Founder Stack (Block 4 + Block 3) */}
            <div className="flex flex-col gap-6">
              {/* Block 4 */}
              <div className="bg-gradient-to-br from-white to-slate-50 border border-gray-150 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 min-h-[260px]">
                <div className="w-24 h-24 rounded-full bg-slate-200 border border-slate-300/45 overflow-hidden relative mb-4">
                  {founders[1].image && (
                    <Image src={founders[1].image} alt={founders[1].name} fill sizes="96px" className="object-cover" />
                  )}
                </div>
                <h4 className="text-sm font-black text-gray-900 uppercase">{founders[1].name}</h4>
                <p className="text-xs font-extrabold text-[#EE1C25] uppercase tracking-wider mt-1">{founders[1].role}</p>
              </div>
              {/* Block 3 */}
              <div className="bg-gradient-to-br from-white to-slate-50 border border-gray-150 rounded-2xl p-6 shadow-xs hover:-translate-y-0.5 transition-all duration-300">
                <span className="text-[9px] font-black uppercase tracking-wider text-[#EE1C25] mb-1 block">Co-Founder Profile</span>
                <p className="text-xs font-semibold text-slate-600 leading-relaxed">{founders[1].bio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECTION 2: INDUSTRY PARTNERS (ZIGZAG LAYOUT) ================= */}
        <div className="w-full pt-4">
          <hr className="border-gray-200/60 mb-12" />
          
          <div className="flex items-center justify-between mb-10">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                INDUSTRY PARTNERS
              </span>
              <h4 className="text-lg font-black text-gray-950 uppercase tracking-tight">
                Backed by Tech Founders
              </h4>
            </div>
            <Link 
              href="/about-us" 
              className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#EE1C25] hover:text-[#d61920] group"
            >
              <span>MEET OUR PARTNERS</span> 
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-start pb-8">
            {partnerAvatars.map((partner, idx) => {
              const isOffset = idx % 2 === 1;
              return (
                <div 
                  key={idx}
                  className={`bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-center text-center shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 ${
                    isOffset ? "lg:translate-y-6" : ""
                  }`}
                >
                  <div className="w-14 h-14 rounded-full bg-slate-200 border-2 border-white overflow-hidden relative shadow-sm shrink-0 mb-3">
                    {partner.image ? (
                      <Image
                        src={partner.image}
                        alt={partner.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex items-center justify-center w-full h-full text-xs font-black text-slate-600">
                        {partner.initials}
                      </span>
                    )}
                  </div>
                  <h5 className="text-[11px] font-black text-gray-950 uppercase tracking-tight leading-snug">
                    {partner.name}
                  </h5>
                  <p className="text-[9px] font-extrabold text-[#EE1C25] uppercase tracking-wider mt-1">
                    {partner.role}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= SECTION 3: EXPERT NETWORK (ZIGZAG LAYOUT) ================= */}
        <div className="w-full pt-4">
          <hr className="border-gray-200/60 mb-12" />
          
          <div className="flex items-center justify-between mb-10">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                EXPERT NETWORK
              </span>
              <h4 className="text-lg font-black text-gray-950 uppercase tracking-tight">
                Learn Live with ML Architects
              </h4>
            </div>
            <Link 
              href="/about-us" 
              className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#EE1C25] hover:text-[#d61920] group"
            >
              <span>VIEW ALL MENTORS</span> 
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-start pb-8">
            {mentorAvatars.map((mentor, idx) => {
              const isOffset = idx % 2 === 1;
              return (
                <div 
                  key={idx}
                  className={`bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-center text-center shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 ${
                    isOffset ? "lg:translate-y-6" : ""
                  }`}
                >
                  <div className="w-14 h-14 rounded-full bg-slate-200 border-2 border-white overflow-hidden relative shadow-sm shrink-0 mb-3">
                    {mentor.image ? (
                      <Image
                        src={mentor.image}
                        alt={mentor.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex items-center justify-center w-full h-full text-xs font-black text-slate-600">
                        {mentor.initials}
                      </span>
                    )}
                  </div>
                  <h5 className="text-[11px] font-black text-gray-950 uppercase tracking-tight leading-snug">
                    {mentor.name}
                  </h5>
                  <p className="text-[9px] font-extrabold text-[#EE1C25] uppercase tracking-wider mt-1">
                    {mentor.role}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
