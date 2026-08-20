"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MentorsCarouselSection() {
  const partnerAvatars = [
    { initials: "AC", name: "ARUN CHINNACHAMY", role: "CTO, HYPERLEAP.AI", image: "/us/assets/arun.png" },
    { initials: "GK", name: "GOPI KRISHNA", role: "CEO, RAVA.AI", image: "/us/assets/gopi.png" },
    { initials: "KB", name: "KIRAN BABU", role: "FOUNDER, DOTCHECKOUT", image: "/us/assets/kiran.png" },
    { initials: "RM", name: "RAJA MAMIDI", role: "LEAD, AGENTANALYTICS", image: "/us/assets/raja.png" },
    { initials: "RR", name: "RANJAN RELAN", role: "AI CONSULTANT", image: "/us/assets/ranjan.png" },
  ];

  function CardItem({ person }: { person: { initials: string; name: string; role: string; image?: string } }) {
    return (
      <div className="w-full border border-neutral-900 bg-black rounded-2xl overflow-hidden shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col h-[300px] group">
        {/* Top portion */}
        <div className="relative w-full bg-neutral-950 flex items-center justify-center h-[210px] border-b border-neutral-900/60 overflow-hidden">
          {person.image ? (
            <img
              src={person.image}
              alt={person.name}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-600 font-extrabold text-xs tracking-wider">
              {person.initials}
            </div>
          )}
        </div>

        {/* Text portion */}
        <div className="flex-1 flex flex-col items-center justify-center px-3 py-3 bg-black text-center">
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
    <section className="w-full bg-white py-12 lg:py-16 px-6 md:px-12 relative z-10 font-heading select-none">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* ================= INDUSTRY PARTNERS (BACKED BY TECH FOUNDERS) ================= */}
        <div className="w-full border-t border-neutral-200/60 pt-10">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                INDUSTRY PARTNERS
              </span>
              <h4 className="text-xl md:text-2xl font-black text-gray-950 uppercase tracking-tight">
                BACKED BY TECH FOUNDERS
              </h4>
            </div>
            <Link
              href="#partners"
              className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#EE1C25] hover:text-[#d61920] group"
            >
              <span>MEET OUR PARTNERS</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 items-start">
            {partnerAvatars.map((partner, idx) => (
              <CardItem key={idx} person={partner} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
