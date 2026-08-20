"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PH_DATA } from "@ph/config/phData";
import { Building2, Sparkles } from "lucide-react";

export default function PhMentorsSection() {
  const { mentors } = PH_DATA;
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Startup Founder", "ML Scientist", "AI Consultant"];

  const filteredMentors =
    activeFilter === "All"
      ? mentors
      : mentors.filter((m) => m.category === activeFilter);

  return (
    <section className="py-20 bg-white border-b border-slate-200/80 px-6 md:px-12 font-heading select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#EE1C25] uppercase tracking-widest font-bold">PRACTICAL EXPERTISE</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Our Technical Mentors
            </h2>
            <p className="text-slate-600 text-sm font-medium max-w-xl">
              Active tech founders, machine learning scientists, and Generative AI consultants from top global tech companies.
            </p>
          </div>

          {/* Understated Filter Controls */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`relative px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive ? "text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="mentorFilterTab"
                      className="absolute inset-0 bg-slate-900 rounded-xl shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Mentors Cards Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredMentors.map((mentor, idx) => {
              const isFounder = mentor.category === "Startup Founder";
              const isScientist = mentor.category === "ML Scientist";

              return (
                <motion.div
                  key={mentor.name}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -15 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  className="bg-[#FAFBFD] border border-slate-200/90 rounded-3xl p-6 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between space-y-5 group relative overflow-hidden"
                >
                  {/* Subtle Accent Line on Left */}
                  <div
                    className={`absolute top-0 left-0 bottom-0 w-[3px] transition-colors duration-300 ${
                      isFounder
                        ? "bg-[#EE1C25]"
                        : isScientist
                        ? "bg-indigo-500"
                        : "bg-emerald-500"
                    }`}
                  />

                  <div className="space-y-4">
                    {/* Top Category Badge & Index */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${
                          isFounder
                            ? "bg-red-50 text-[#EE1C25] border-red-100"
                            : isScientist
                            ? "bg-indigo-50 text-indigo-600 border-indigo-100"
                            : "bg-emerald-50 text-emerald-600 border-emerald-100"
                        }`}
                      >
                        {mentor.category}
                      </span>
                      <span className="text-xs font-mono text-slate-400 font-bold">0{idx + 1}</span>
                    </div>

                    {/* Mentor Profile Image & Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-slate-200 shrink-0 shadow-sm relative group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={mentor.image}
                          alt={mentor.name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-bold text-slate-900 text-base tracking-tight group-hover:text-[#EE1C25] transition-colors leading-snug">
                          {mentor.name}
                        </h3>
                        <p className="text-xs font-mono text-slate-600 font-semibold leading-normal">
                          {mentor.title}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Company Affiliation Bar */}
                  <div className="pt-3 border-t border-slate-200/80 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{mentor.company || "Technology Leader"}</span>
                    </span>
                    <span className="font-bold text-slate-700">INDUSTRY MENTOR</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
