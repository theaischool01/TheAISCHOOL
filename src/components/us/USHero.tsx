"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function USHero() {
  return (
    <section className="relative w-full min-h-[50vh] bg-transparent text-[#171717] flex flex-col justify-between pt-8 pb-8 overflow-hidden border-b border-neutral-100 select-none z-10 font-heading">
      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(0,0,0,0.5) 0.5px, transparent 0.5px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center flex-1">
        {/* Left Content (5 Columns) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col items-start text-left z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-100 rounded-full">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#EE1C25]">
              USA's only school where startup Leaders teach AI skills.
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[48px] font-black text-gray-950 tracking-tight leading-[1.12]">
              Step into the Top 1% of the{" "}
              <span className="text-[#EE1C25] relative inline-block">
                AI-Ready Workforce.
              </span>
            </h1>
            <p className="text-neutral-500 font-extrabold text-sm tracking-widest uppercase">
              Upskill. Get Hired.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/learn"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/assessment"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-neutral-900 bg-white hover:bg-neutral-900 hover:text-white text-neutral-900 text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Take Assessment</span>
            </Link>
          </div>
        </div>

        {/* Right Side Isometric SVG (7 Columns) */}
        <div className="lg:col-span-7 flex justify-center items-center w-full relative z-10">
          <div className="w-full max-w-[550px] aspect-[72/62]">
            <svg viewBox="0 0 720 620" className="w-full h-full">
              <defs>
                <radialGradient id="glow" cx="55%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#EE1C25" stopOpacity="0.08"/>
                  <stop offset="100%" stopColor="#EE1C25" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <rect width="720" height="620" fill="url(#glow)"/>
              <circle cx="420" cy="330" r="260" fill="none" stroke="#000000" strokeOpacity="0.05"/>
              <circle cx="420" cy="330" r="260" strokeDasharray="1 7" fill="none" stroke="#EE1C25" strokeOpacity="0.3" strokeWidth="1.5"/>
              <circle cx="130" cy="120" r="3" fill="#EE1C25" opacity="0.5"/>
              <circle cx="600" cy="140" r="2.5" fill="#000" opacity="0.2"/>
              <circle cx="620" cy="100" r="2" fill="#EE1C25" opacity="0.4"/>
              <circle cx="100" cy="220" r="2" fill="#000" opacity="0.2"/>
              
              <ellipse cx="380" cy="580" rx="260" ry="26" fill="#000" opacity="0.06"/>
              
              {/* Box 1 (White) */}
              <polygon points="140,470 180,490 140,510 100,490" fill="#fff" stroke="#00000014"/>
              <polygon points="100,490 140,510 140,545 100,525" fill="#f1f1f1" stroke="#00000014"/>
              <polygon points="140,510 180,490 180,525 140,545" fill="#dcdcdc" stroke="#00000014"/>
              
              {/* Box 2 (Light Gray) */}
              <polygon points="240,430 280,450 240,470 200,450" fill="#f2f2f2" stroke="#00000018"/>
              <polygon points="200,450 240,470 240,545 200,525" fill="#c9c9c9" stroke="#00000018"/>
              <polygon points="240,470 280,450 280,525 240,545" fill="#a8a8a8" stroke="#00000018"/>
              
              {/* Box 3 (Charcoal) */}
              <polygon points="340,380 380,400 340,420 300,400" fill="#4a4a4a" stroke="#00000030"/>
              <polygon points="300,400 340,420 340,545 300,525" fill="#2b2b2b" stroke="#00000030"/>
              <polygon points="340,420 380,400 380,525 340,545" fill="#171717" stroke="#00000030"/>
              
              {/* Box 4 (Red - Tallest) */}
              <polygon points="440,310 480,330 440,350 400,330" fill="#ff6b64" stroke="#00000020"/>
              <polygon points="400,330 440,350 440,545 400,525" fill="#EE1C25" stroke="#00000020"/>
              <polygon points="440,350 480,330 480,525 440,545" fill="#b8141a" stroke="#00000020"/>
              
              {/* Flagpole & Flag */}
              <line x1="460" y1="330" x2="460" y2="200" stroke="#171717" strokeWidth="3" strokeLinecap="round"/>
              <path d="M460,200 L460,235 L525,222 L460,208 Z" fill="#EE1C25"/>
              <circle cx="460" cy="330" r="6" fill="#fff" stroke="#EE1C25" strokeWidth="2"/>
              
              <circle cx="200" cy="260" r="3" fill="#171717" opacity="0.4"/>
              <circle cx="540" cy="250" r="3" fill="#EE1C25" opacity="0.4"/>
              <circle cx="560" cy="310" r="2.5" fill="#171717" opacity="0.3"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
