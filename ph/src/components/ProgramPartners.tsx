"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Handshake, Award, Building2 } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  logo: string;
  category: string;
}

const PARTNERS: Partner[] = [
  { id: "dot-india", name: "DOT India Telecom", logo: "/ph/partners/dot-india.png", category: "Govt & Telecom" },
  { id: "itu-wtsa", name: "ITU WTSA 2024", logo: "/ph/partners/itu-wtsa.png", category: "Global Innovation" },
  { id: "bharat-dynamics", name: "Bharat Dynamics Limited", logo: "/ph/partners/bharat-dynamics.png", category: "Enterprise & Defense" },
  { id: "star-academy", name: "STAR Academy", logo: "/ph/partners/star-academy.png", category: "Education & Research" },
  { id: "jaipuria", name: "Jaipuria Group", logo: "/ph/partners/jaipuria.png", category: "Academic Group" },
  { id: "csi", name: "Computer Society of India", logo: "/ph/partners/csi.png", category: "Professional Body" },
  { id: "area51", name: "Area 51 IT Services", logo: "/ph/partners/area51.png", category: "Technology Services" },
  { id: "tcoe", name: "TCOE India", logo: "/ph/partners/tcoe.png", category: "Center of Excellence" },
  { id: "srm-university", name: "SRM University AP", logo: "/ph/partners/srm-university.png", category: "Higher Education" },
  { id: "avpl", name: "AVPL International", logo: "/ph/partners/avpl.png", category: "Drones & Tech" },
  { id: "agentanalytics", name: "AgentAnalytics.AI", logo: "/ph/partners/agentanalytics.png", category: "AI Ecosystem" },
  { id: "hyperleap", name: "hyperleap.ai", logo: "/ph/partners/hyperleap.png", category: "GenAI Platform" },
  { id: "rava", name: "rava.ai", logo: "/ph/partners/rava.png", category: "AI Automation" },
  { id: "saven", name: "Saven", logo: "/ph/partners/saven.png", category: "Enterprise Solutions" },
];

export default function ProgramPartners() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45 },
    },
  };

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50 border-b border-slate-200/80 overflow-hidden font-heading select-none">
      {/* Background Decorative Ambient Glow & Texture */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-500/[0.03] blur-[140px] pointer-events-none rounded-full z-0" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.4) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />
      
      {/* Subtle Background Watermark Text */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[80px] sm:text-[120px] md:text-[150px] font-black uppercase text-slate-900/[0.018] tracking-widest pointer-events-none select-none z-0">
        Partners
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 text-[#EE1C25] border border-red-100 text-xs font-bold uppercase tracking-wider shadow-2xs"
          >
            <Handshake className="w-3.5 h-3.5" />
            <span>Official Collaborations</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight font-heading"
          >
            Program <span className="text-[#EE1C25]">Partners</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-sm md:text-base font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Trusted by leading government bodies, academic institutions, defense organizations, and GenAI pioneers.
          </motion.p>
        </div>

        {/* Smooth Continuous Marquee Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative w-full overflow-hidden py-3 bg-white/80 backdrop-blur-xs rounded-2xl border border-slate-200/60 shadow-2xs"
        >
          <div className="flex w-[200%] animate-marquee space-x-8 items-center">
            {[...PARTNERS, ...PARTNERS].map((partner, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 shrink-0 px-4 py-1.5 rounded-xl bg-slate-50/80 border border-slate-100 text-slate-700 font-semibold text-xs transition-colors hover:bg-red-50/40 hover:border-red-100 hover:text-[#EE1C25]"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-5.5 w-auto object-contain opacity-100"
                />
                <span className="font-bold tracking-tight whitespace-nowrap">{partner.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Responsive Logo Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3.5 md:gap-4.5"
        >
          {PARTNERS.map((partner) => (
            <motion.div
              key={partner.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="group relative bg-white rounded-2xl p-4 md:p-5 border border-slate-200/80 shadow-2xs hover:shadow-xl hover:shadow-red-500/10 hover:border-red-300 transition-all duration-300 flex flex-col items-center justify-center h-28 md:h-32 text-center cursor-pointer overflow-hidden"
            >
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#EE1C25] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl origin-left" />

              {/* Partner Logo - Original Full Color */}
              <div className="w-full h-full flex items-center justify-center relative">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 md:max-h-14 w-auto max-w-[85%] object-contain opacity-100 transition-transform duration-300 transform group-hover:scale-104"
                />
              </div>

              {/* Subtle hover label badge */}
              <div className="absolute bottom-1.5 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px] font-bold text-[#EE1C25] bg-red-50/90 py-0.5 rounded-md truncate px-1">
                {partner.category}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
