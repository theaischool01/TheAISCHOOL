"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FullCourseData } from "@us/config/coursesData";
import { Globe, BarChart2, Clock, Award, ArrowRight, Sparkles } from "lucide-react";

interface Props {
  course: FullCourseData;
}

export default function CourseHeroSection({ course }: Props) {
  const shouldReduceMotion = useReducedMotion();

  const iconMap = {
    Globe: Globe,
    BarChart2: BarChart2,
    Clock: Clock,
    Award: Award,
  };

  return (
    <section className="relative w-full bg-white py-16 sm:py-20 lg:py-24 px-6 md:px-12 font-sans overflow-hidden border-b border-neutral-100">
      {/* Decorative Ghost Background Element: Oversized Neural Nodes & Connections Pattern */}
      <motion.div
        animate={
          shouldReduceMotion
            ? false
            : {
                y: [0, -8, 8, 0],
                rotate: [0, 1.5, -1.5, 0],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-12 -right-16 w-[550px] h-[550px] sm:w-[700px] sm:h-[700px] pointer-events-none select-none z-0 opacity-[0.06] text-[#C1121C]"
      >
        <svg viewBox="0 0 500 500" className="w-full h-full fill-none stroke-current stroke-[2.5]">
          <circle cx="250" cy="250" r="220" strokeDasharray="6 6" />
          <circle cx="250" cy="250" r="140" strokeDasharray="4 4" />
          <circle cx="250" cy="250" r="60" />
          {/* Neural Node Points & Connections */}
          <line x1="250" y1="30" x2="250" y2="470" />
          <line x1="30" y1="250" x2="470" y2="250" />
          <line x1="94" y1="94" x2="406" y2="406" />
          <line x1="406" y1="94" x2="94" y2="406" />
          <circle cx="250" cy="30" r="12" className="fill-[#C1121C]" />
          <circle cx="470" cy="250" r="12" className="fill-[#C1121C]" />
          <circle cx="250" cy="470" r="12" className="fill-[#C1121C]" />
          <circle cx="30" cy="250" r="12" className="fill-[#C1121C]" />
          <circle cx="94" cy="94" r="10" className="fill-[#C1121C]" />
          <circle cx="406" cy="406" r="10" className="fill-[#C1121C]" />
          <circle cx="406" cy="94" r="10" className="fill-[#C1121C]" />
          <circle cx="94" cy="406" r="10" className="fill-[#C1121C]" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* Eyebrow Tag Pill */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#C1121C] text-xs font-bold uppercase tracking-wider shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C1121C]" />
          <span>{course.eyebrow}</span>
        </motion.div>

        {/* Massive Staggered Headline */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#171717] tracking-tight uppercase leading-[1.15] max-w-5xl">
            <span className="relative inline-block text-[#171717] underline decoration-[#C1121C] decoration-4 underline-offset-8">
              {course.heroHeadlineMain}
            </span>
            <span className="font-semibold text-neutral-800">
              {course.heroHeadlineSuffix}
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#C1121C] tracking-tight pt-2">
            {course.subheading}
          </p>
        </motion.div>

        {/* Primary CTA Button */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="pt-2"
        >
          <a
            href="#enroll"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#C1121C] hover:bg-[#a00e17] text-white text-sm sm:text-base font-extrabold uppercase tracking-wider rounded-full shadow-lg shadow-red-600/20 hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Register now</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Quick-Fact Chips Row */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="pt-4 flex flex-wrap items-center gap-3"
        >
          {course.chips.map((chip, idx) => {
            const IconComp = iconMap[chip.icon as keyof typeof iconMap] || Globe;
            return (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs sm:text-sm font-bold text-[#171717] shadow-2xs"
              >
                <IconComp className="w-4 h-4 text-[#C1121C]" />
                <span>{chip.label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
