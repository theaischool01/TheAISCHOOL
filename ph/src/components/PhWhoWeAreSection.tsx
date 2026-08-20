"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Layers } from "lucide-react";

export default function PhWhoWeAreSection() {
  return (
    <section className="py-20 bg-white border-b border-slate-200/80 px-6 md:px-12 font-heading">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Narrative Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#EE1C25] uppercase tracking-widest font-bold">FOUNDATION & VISION</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Who We Are
            </h2>
          </div>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
            At TheAISCHOOL, we are driven by a singular vision: to create a future where youth are empowered with production-grade AI skills, tech startups thrive, and digital innovation flourishes across the Philippines.
          </p>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            Through our comprehensive approach to hands-on skill development, startup incubation support, and university academic collaboration, we are committed to making a lasting impact on digital talent and enterprise growth in the region.
          </p>

          <div className="pt-2 space-y-3">
            {[
              "Direct mentorship from active tech founders & AI architects",
              "80% practical live coding labs and portfolio project building",
              "Strategic university partnerships and enterprise talent pipelines",
            ].map((pillar, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-800">
                <div className="w-5 h-5 rounded-full bg-red-50 text-[#EE1C25] flex items-center justify-center shrink-0 border border-red-100 font-mono">
                  ✓
                </div>
                <span>{pillar}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Metric Highlights Box */}
        <div className="lg:col-span-5">
          <div className="bg-[#FAFBFD] border border-slate-200/90 rounded-3xl p-8 shadow-xs space-y-6">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-200/80 pb-4">
              COMMUNITY & ECOSYSTEM IMPACT
            </h3>

            <div className="space-y-4 text-xs font-medium">
              <div className="flex justify-between items-center py-2 border-b border-slate-200/60">
                <span className="text-slate-500">Learners & Alumni Trained</span>
                <span className="font-bold text-slate-900 font-mono">5,000+ Students</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-200/60">
                <span className="text-slate-500">Specialized Workshops</span>
                <span className="font-bold text-slate-900 font-mono">12 Active Tracks</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-200/60">
                <span className="text-slate-500">Startup Founder Mentors</span>
                <span className="font-bold text-[#EE1C25] font-mono">10+ Tech Leaders</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-200/60">
                <span className="text-slate-500">Academic & Enterprise Partners</span>
                <span className="font-bold text-slate-900 font-mono">Active Ecosystem</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
