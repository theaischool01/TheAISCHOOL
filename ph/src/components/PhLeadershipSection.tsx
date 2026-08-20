"use client";

import React from "react";
import { motion } from "framer-motion";
import { PH_DATA } from "@ph/config/phData";
import { ShieldCheck, Award, Building } from "lucide-react";

export default function PhLeadershipSection() {
  const { leadership } = PH_DATA;
  const founder = leadership.find((m) => m.featured) || leadership[0];
  const otherLeaders = leadership.filter((m) => m.name !== founder.name);

  return (
    <section className="py-20 bg-[#FAFBFD] border-b border-slate-200/80 px-6 md:px-12 font-heading select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-2 text-center max-w-xl mx-auto">
          <span className="text-xs font-mono text-[#EE1C25] uppercase tracking-widest font-bold">FOUNDERS & EXECUTIVE TEAM</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Our Leadership Team
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            Active tech startup founders, operations executives, and strategic advisors guiding AI education across the Philippines.
          </p>
        </div>

        {/* Asymmetric Leadership Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Featured Founder Card (Left 6 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl flex flex-col justify-between space-y-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#EE1C25]" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#EE1C25] font-bold">FOUNDER & CEO</span>
                <span className="text-xs font-mono text-slate-400">15+ YRS TECH LEADERSHIP</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-red-500/40 shrink-0 shadow-lg relative group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="text-2xl font-black text-white tracking-tight">{founder.name}</h3>
                  <p className="text-xs font-mono text-[#EE1C25] font-extrabold uppercase">{founder.title}</p>
                  <p className="text-xs text-slate-400 font-mono pt-1">The AI School Philippines & Global</p>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed font-medium pt-2 border-t border-slate-800">
                {founder.bio}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 relative z-10">
              <span>FOUNDED THE AI SCHOOL</span>
              <span className="text-[#EE1C25] font-bold">EXECUTIVE BOARD</span>
            </div>
          </motion.div>

          {/* Other Leadership Cards (Right 6 Columns, 3 Rows/Cards) */}
          <div className="lg:col-span-6 grid grid-cols-1 gap-6">
            {otherLeaders.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (idx + 1) * 0.1 }}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-6 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-slate-200 group-hover:bg-[#EE1C25] transition-colors duration-300" />

                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-slate-200 shrink-0 shadow-sm relative group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-[#EE1C25] transition-colors">
                      {member.name}
                    </h3>
                    <span className="text-[10px] font-mono text-[#EE1C25] font-extrabold uppercase bg-red-50 px-2.5 py-0.5 rounded-md border border-red-100 self-center sm:self-auto">
                      {member.title}
                    </span>
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed font-medium">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
