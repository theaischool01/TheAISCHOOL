"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Users, Sparkles, ShieldCheck, ArrowUpRight } from "lucide-react";
import { PH_DATA } from "@ph/config/phData";

export default function LeadershipSection() {
  const { leadership } = PH_DATA;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="relative py-20 md:py-28 bg-[#F8FAFC] border-t border-slate-200/80 overflow-hidden font-heading select-none">
      {/* Ambient Red Radial Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-red-500/[0.025] blur-[160px] pointer-events-none rounded-full z-0" />
      
      {/* Faint Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.4) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Large Ghost Typography Element Behind Everything */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-10 left-1/2 -translate-x-1/2 text-[90px] sm:text-[140px] md:text-[190px] font-black uppercase text-slate-900/[0.025] tracking-widest pointer-events-none select-none z-0 whitespace-nowrap"
      >
        LEADERSHIP
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-14">
        {/* Section Header */}
        <div className="text-center space-y-3.5 max-w-3xl mx-auto">
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-[#EE1C25] border border-red-100 text-xs font-bold uppercase tracking-wider shadow-2xs"
          >
            <Users className="w-3.5 h-3.5" />
            <span>THE PEOPLE BEHIND THE VISION</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-black text-[#101828] tracking-tight font-heading leading-[1.12]"
          >
            Our <span className="text-[#EE1C25]">Leadership</span> &amp; Mentors
          </motion.h2>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#475467] text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Learn from founders, operators and industry leaders building real-world AI products, partnerships and technology ecosystems.
          </motion.p>
        </div>

        {/* 4-Card Image-First Leadership Showcase */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 items-stretch"
        >
          {leadership.map((member, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-white rounded-[24px] border border-[#E4E7EC] shadow-2xs hover:shadow-xl hover:shadow-red-500/10 hover:border-red-300 transition-all duration-400 flex flex-col justify-between overflow-hidden cursor-pointer h-full"
            >
              {/* Top Section: Photo Container */}
              <div className="relative w-full h-72 md:h-80 overflow-hidden bg-slate-100">
                <img
                  src={member.image}
                  alt={`${member.name}, ${member.title} of The AI School Philippines`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                {/* Subtle Image Bottom Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />

                {/* Overlaid Role Pill Badge */}
                <div className="absolute bottom-3.5 left-4 z-10">
                  <span className="inline-block text-[10px] font-black uppercase tracking-widest text-white bg-[#EE1C25] px-3 py-1 rounded-full shadow-xs">
                    {member.title}
                  </span>
                </div>
              </div>

              {/* Bottom Section: Name & Bio */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between relative bg-white">
                <div className="space-y-1.5">
                  <h3 className="text-xl md:text-2xl font-bold text-[#101828] tracking-tight group-hover:text-[#EE1C25] transition-colors duration-200">
                    {member.name}
                  </h3>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-[#EE1C25]">
                    {member.title}
                  </p>
                </div>

                <p className="text-xs md:text-sm text-[#475467] leading-relaxed font-medium line-clamp-3 pt-1">
                  {member.bio}
                </p>
              </div>

              {/* Understated Red Line Accent at Card Bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE1C25] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
