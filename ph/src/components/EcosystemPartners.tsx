"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Network, Sparkles, Building } from "lucide-react";

interface EcosystemPartner {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: string;
}

const ECOSYSTEM_PARTNERS: EcosystemPartner[] = [
  {
    id: "t-hub",
    name: "T-Hub 2.0",
    logo: "/ph/ecosystem/thub.png",
    category: "Innovation & Incubation Hub",
    description: "World's largest innovation campus fostering startup growth, venture creation, and technology scaling.",
  },
  {
    id: "math",
    name: "MATH",
    logo: "/ph/ecosystem/math.png",
    category: "AI Center of Excellence",
    description: "Machine Learning and Artificial Intelligence Technology Hub driving AI evolution and practical innovation.",
  },
  {
    id: "dst",
    name: "Dept. of Science & Technology",
    logo: "/ph/ecosystem/dst.png",
    category: "Government Body",
    description: "Government of India's premier department advancing scientific research, deeptech education, and technological development.",
  },
];

export default function EcosystemPartners() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="relative py-20 md:py-28 bg-[#FAFBFD] border-b border-slate-200/80 overflow-hidden font-heading select-none">
      {/* Subtle Ambient Red Tinted Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-500/[0.025] blur-[150px] pointer-events-none rounded-full z-0" />

      {/* Faint Background Dot Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.4) 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Background Watermark */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[90px] sm:text-[130px] md:text-[170px] font-black uppercase text-slate-900/[0.015] tracking-widest pointer-events-none select-none z-0">
        Ecosystem
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-14">
        {/* Section Header */}
        <div className="text-center space-y-3.5 max-w-3xl mx-auto">
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-[#EE1C25] border border-red-100 text-xs font-bold uppercase tracking-wider shadow-2xs"
          >
            <Network className="w-3.5 h-3.5" />
            <span>ECOSYSTEM NETWORK</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-heading"
          >
            Ecosystem <span className="text-[#EE1C25]">Partners</span>
          </motion.h2>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-sm md:text-base font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Connected with innovation ecosystems, technology networks and institutions that help strengthen AI learning, collaboration and industry access.
          </motion.p>
        </div>

        {/* 3-Card Premium Showcase */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          {ECOSYSTEM_PARTNERS.map((partner) => (
            <motion.div
              key={partner.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-white rounded-[24px] p-8 md:p-10 border border-[#E9ECF2] shadow-xs hover:shadow-xl hover:shadow-red-500/10 hover:border-red-300/80 transition-all duration-300 flex flex-col justify-between items-center text-center cursor-pointer min-h-[300px] md:min-h-[330px] overflow-hidden"
            >
              {/* Subtle background radial accent on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-red-50/0 via-red-50/0 to-red-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Top Section: Category Pill */}
              <div className="z-10">
                <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-[#EE1C25] bg-red-50 border border-red-100/60 px-3 py-1 rounded-full">
                  {partner.category}
                </span>
              </div>

              {/* Center Section: Full-Color Logo Container */}
              <div className="w-full h-24 md:h-28 flex items-center justify-center my-4 relative z-10 px-4">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-16 md:max-h-20 w-auto max-w-[85%] object-contain filter-none opacity-100 transition-transform duration-300 transform group-hover:scale-[1.04]"
                />
              </div>

              {/* Bottom Section: Partner Description */}
              <div className="relative z-10 pt-2 border-t border-slate-100 w-full">
                <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-2">
                  {partner.description}
                </p>
              </div>

              {/* Understated Red Line Accent at Bottom Edge */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE1C25] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
