"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ABOUT_US_DATA } from "@us/config/aboutUsData";
import { UserCheck, Wrench, Briefcase, ArrowRight, Zap } from "lucide-react";

export default function USGrowthCTA() {
  const { howItWorks } = ABOUT_US_DATA;
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  const iconMap = {
    UserCheck: UserCheck,
    Wrench: Wrench,
    Briefcase: Briefcase,
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative w-full bg-white py-20 lg:py-28 px-6 md:px-12 text-[#171717] overflow-hidden border-b border-neutral-100 font-sans"
    >
      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 flex flex-col items-center">
          {/* Eyebrow Tag Pill */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#C1121C] text-xs font-bold uppercase tracking-wider shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-[#C1121C]" />
            <span>{howItWorks.eyebrow}</span>
          </motion.div>

          {/* New Centered Bold Headline */}
          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#171717] uppercase tracking-tight text-center"
          >
            {howItWorks.heading}
          </motion.h2>
        </div>

        {/* 3-Column Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {howItWorks.cards.map((card, idx) => {
            const IconComponent = iconMap[card.icon as keyof typeof iconMap] || UserCheck;

            return (
              <motion.div
                key={card.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: shouldReduceMotion ? 0.2 : 0.45,
                  delay: shouldReduceMotion ? 0 : 0.15 + idx * 0.08,
                  ease: "easeOut",
                }}
                className="bg-neutral-50/80 border border-neutral-200/80 hover:border-red-500/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 ease-out group"
              >
                {/* Outline Icon with Red Accent */}
                <div className="w-12 h-12 rounded-xl bg-white border border-neutral-200/60 flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:border-red-200 transition-all duration-200">
                  <IconComponent className="w-6 h-6 text-[#C1121C] stroke-[1.75]" />
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#171717] leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-neutral-500">
                    {card.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Single Centered Primary CTA Button */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.45 }}
          className="flex justify-center pt-2"
        >
          <a
            href="#register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C1121C] hover:bg-[#a00e17] text-white text-sm sm:text-base font-extrabold uppercase tracking-wider rounded-full shadow-lg shadow-red-600/20 hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>{howItWorks.ctaText}</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
