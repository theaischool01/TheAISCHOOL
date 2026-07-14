"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TeamPreview() {
  const founders = [
    {
      name: "Susanta Srinath Reddy",
      role: "Founder/CEO",
      initials: "SR",
    },
    {
      name: "K. Spandana",
      role: "Co-Founder",
      initials: "KS",
    },
  ];

  // Dummy initials for avatars
  const partnerAvatars = ["AC", "GK", "KB", "RM", "RR"];
  const mentorAvatars = ["VP", "SP", "AV", "AP", "HK", "MB"];

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 border-t border-gray-100 relative z-10 font-heading select-none">
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

        {/* Bento-style Grid (Founders Left, Mentors/Partners Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Founders Block (5 Columns) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {founders.map((founder, idx) => (
              <div 
                key={idx} 
                className="bg-gradient-to-br from-white to-slate-50 border border-gray-100 rounded-2xl p-5 flex flex-col items-center text-center shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                {/* 120px Circular Avatar Fallback */}
                <div className="w-24 h-24 rounded-full bg-slate-200 text-slate-600 font-extrabold text-2xl flex items-center justify-center mb-4 border border-slate-300/40 select-none">
                  {founder.initials}
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

          {/* Right Column: Mentors & Partners Strips (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            
            {/* Industry Partners Strip */}
            <div className="bg-gradient-to-br from-white to-slate-50 border border-gray-100 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300 flex-1">
              <div className="space-y-2">
                <span className="text-[9px] font-black uppercase tracking-wider text-neutral-400">
                  Industry Partners
                </span>
                <p className="text-xs font-bold text-slate-700 leading-normal max-w-sm">
                  Backed by founders from Hyperleap.ai, Rava.ai, DotCheckout, AgentAnalytics.AI & more.
                </p>
                <Link 
                  href="/about-us" 
                  className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#EE1C25] hover:text-[#d61920]"
                >
                  Meet Our Partners <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Avatar Cluster */}
              <div className="flex items-center -space-x-3.5 pl-2 shrink-0">
                {partnerAvatars.map((avatar, idx) => (
                  <div 
                    key={idx} 
                    className="w-11 h-11 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-black text-slate-600 shadow-sm"
                  >
                    {avatar}
                  </div>
                ))}
              </div>
            </div>

            {/* Mentors Strip */}
            <div className="bg-gradient-to-br from-white to-slate-50 border border-gray-100 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300 flex-1">
              <div className="space-y-2">
                <span className="text-[9px] font-black uppercase tracking-wider text-neutral-400">
                  Expert Network
                </span>
                <p className="text-xs font-bold text-slate-700 leading-normal max-w-sm">
                  Learn live with 9+ seasoned machine learning, platform engineering, and RAG architectures consultants.
                </p>
                <Link 
                  href="/about-us" 
                  className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#EE1C25] hover:text-[#d61920]"
                >
                  View All Mentors <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Avatar Cluster */}
              <div className="flex items-center -space-x-3.5 pl-2 shrink-0">
                {mentorAvatars.map((avatar, idx) => (
                  <div 
                    key={idx} 
                    className="w-11 h-11 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-black text-slate-600 shadow-sm"
                  >
                    {avatar}
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
