"use client";

import React from "react";
import { US_DATA } from "@us/config/usData";

export default function LeadershipSection() {
  const { leadership } = US_DATA;

  return (
    <section
      id="leadership"
      className="w-full bg-white py-16 lg:py-24 px-6 md:px-12 relative z-10 font-heading select-none overflow-hidden"
    >
      {/* TASK 4: Oversized Ghost Typography (Layer 0) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden">
        <span className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[13rem] font-black text-slate-900/[0.035] tracking-widest uppercase whitespace-nowrap transform -translate-y-4">
          LEADERSHIP
        </span>
      </div>

      {/* TASK 3: Abstract AI Network/Circuit Pattern Background (Layer 0) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.06]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 10 10 L 90 10 L 90 90 L 10 90 Z" fill="none" stroke="#64748B" strokeWidth="0.5" strokeDasharray="4 4" />
              <circle cx="10" cy="10" r="3" fill="#EE1C25" />
              <circle cx="90" cy="10" r="2" fill="#64748B" />
              <circle cx="90" cy="90" r="3" fill="#EE1C25" />
              <circle cx="10" cy="90" r="2" fill="#64748B" />
              <path d="M 10 50 H 90 M 50 10 V 90" stroke="#94A3B8" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="2.5" fill="#64748B" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>

      {/* Foreground Content Container (Layer 10) */}
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Header Title */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-black text-gray-950 uppercase tracking-tight">
            OUR LEADERSHIP MEMBERS
          </h3>
        </div>

        {/* Leadership Cards Grid */}
        <div className="flex flex-row gap-8 justify-center items-center flex-wrap">
          {leadership.map((member, idx) => (
            <div
              key={idx}
              className="relative w-full max-w-[270px] bg-black border border-neutral-900 rounded-3xl overflow-hidden shadow-xl flex flex-col"
              style={{ height: "350px" }}
            >
              {/* TASK 2: Accent Red Side Line & Top-Right Corner Detail */}
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#EE1C25] z-20" />
              <div className="absolute top-0 right-0 w-8 h-8 bg-[#EE1C25]/20 border-b border-l border-[#EE1C25]/40 rounded-bl-xl z-20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#EE1C25]" />
              </div>

              {/* Top portion: Leader Photo */}
              <div className="relative w-full bg-neutral-950 overflow-hidden" style={{ height: "260px" }}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>

              {/* TASK 1: Name Tag Overlap (-mt-10 overlap onto photo) */}
              <div className="relative z-10 -mt-10 mx-3 bg-black border border-neutral-800 rounded-2xl px-4 py-3.5 flex flex-col items-center justify-center text-center shadow-lg">
                <h4 className="text-[12px] font-black text-white tracking-tight uppercase leading-snug">
                  {member.name}
                </h4>
                <p className="text-[9px] font-extrabold text-[#EE1C25] uppercase tracking-wider mt-1">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
