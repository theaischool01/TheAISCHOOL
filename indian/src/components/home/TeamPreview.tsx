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

  /* Reusable small person card (partner/mentor rows) */
  function SmallPersonCard({ person, isOffset }: { person: typeof partnerAvatars[0]; isOffset: boolean }) {
    return (
      <div
        className={`w-full max-w-[240px] mx-auto border border-neutral-900 bg-black rounded-2xl overflow-hidden shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col ${
          isOffset ? "lg:translate-y-8" : ""
        }`}
        style={{ height: "320px" }}
      >
        {/* Image portion: fills most of the card */}
        <div className="relative w-full bg-black" style={{ height: "230px" }}>
          {person.image ? (
            <Image
              src={person.image}
              alt={person.name}
              fill
              sizes="240px"
              className="object-cover object-top"
            />
          ) : (
            <span className="flex items-center justify-center w-full h-full text-xl font-extrabold text-slate-400">
              {person.initials}
            </span>
          )}
        </div>
        {/* Text portion */}
        <div className="flex-1 flex flex-col items-center justify-center px-3 py-3 bg-black text-center border-t border-neutral-900">
          <h5 className="text-[11px] font-black text-white uppercase tracking-tight leading-snug">
            {person.name}
          </h5>
          <p className="text-[9px] font-extrabold text-[#EE1C25] uppercase tracking-wider mt-1">
            {person.role}
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full bg-transparent py-16 lg:py-20 px-6 md:px-12 relative z-10 font-heading select-none">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Title */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl md:text-3xl font-black text-gray-950 uppercase tracking-tight">
            Our Leadership Members
          </h3>
        </div>

        {/* ================= SECTION 1: FOUNDERS (2 equal cards, same size as others) ================= */}
        <div className="w-full">
          <div className="flex flex-row gap-5 justify-center items-start flex-wrap">
            {founders.map((founder, idx) => (
              <div
                key={idx}
                className="w-full max-w-[240px] border border-neutral-900 bg-black rounded-2xl overflow-hidden shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col"
                style={{ height: "320px" }}
              >
                {/* Image portion */}
                <div className="relative w-full bg-black" style={{ height: "230px" }}>
                  {founder.image ? (
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      fill
                      sizes="240px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <span className="flex items-center justify-center w-full h-full text-2xl font-extrabold text-slate-400">
                      {founder.initials}
                    </span>
                  )}
                </div>
                {/* Text portion */}
                <div className="flex-1 flex flex-col items-center justify-center px-3 py-3 bg-black text-center border-t border-neutral-900">
                  <h4 className="text-[11px] font-black text-white tracking-tight uppercase leading-snug">
                    {founder.name}
                  </h4>
                  <p className="text-[9px] font-extrabold text-[#EE1C25] uppercase tracking-wider mt-1">
                    {founder.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SECTION 2: INDUSTRY PARTNERS (ZIGZAG) ================= */}
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 items-start pb-8">
            {partnerAvatars.map((partner, idx) => (
              <SmallPersonCard key={idx} person={partner} isOffset={idx % 2 === 1} />
            ))}
          </div>
        </div>

        {/* ================= SECTION 3: EXPERT NETWORK (ZIGZAG) ================= */}
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 items-start pb-8">
            {mentorAvatars.map((mentor, idx) => (
              <SmallPersonCard key={idx} person={mentor} isOffset={idx % 2 === 1} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
