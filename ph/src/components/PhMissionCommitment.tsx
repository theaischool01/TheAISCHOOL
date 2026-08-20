"use client";

import React from "react";
import { Target, Compass } from "lucide-react";

export default function PhMissionCommitment() {
  return (
    <section className="py-20 bg-[#FAFBFD] border-b border-slate-200/80 px-6 md:px-12 font-heading">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-2 text-center max-w-xl mx-auto">
          <span className="text-xs font-mono text-[#EE1C25] uppercase tracking-widest font-bold">CORE GUIDING PRINCIPLES</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Our Mission & Commitment
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-8 space-y-5 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#EE1C25]" />

            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#EE1C25] border border-red-100 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-slate-400 font-bold">PURPOSE</span>
            </div>

            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
              Our Mission
            </h3>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              Our mission is to drive innovation and continuous improvement through comprehensive educational programs, entrepreneurial support, and robust industry network pipelines in association with global organizations.
            </p>
          </div>

          {/* Commitment Card */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-8 space-y-5 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-slate-900" />

            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-slate-400 font-bold">PROMISE</span>
            </div>

            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
              Our Commitment
            </h3>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              Our commitment extends to fostering a collaborative ecosystem that encourages lifelong learning, cultivates creativity, and promotes sustainable growth by aligning efforts with the needs of the digital age.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
