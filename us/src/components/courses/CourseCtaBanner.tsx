"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FullCourseData } from "@us/config/coursesData";
import { ArrowRight, Sparkles } from "lucide-react";

interface Props {
  course: FullCourseData;
}

export default function CourseCtaBanner({ course }: Props) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full bg-[#C1121C] text-white py-16 sm:py-20 px-6 md:px-12 font-sans overflow-hidden">
      {/* Decorative Ghost Background Element: Faint Large White Outline Shape */}
      <motion.div
        animate={
          shouldReduceMotion
            ? false
            : {
                rotate: [0, 360],
              }
        }
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none select-none z-0 opacity-10 text-white"
      >
        <svg viewBox="0 0 500 500" className="w-full h-full fill-none stroke-current stroke-[2]">
          <polygon points="250,25 450,125 450,375 250,475 50,375 50,125" />
          <polygon points="250,75 390,150 390,350 250,425 110,350 110,150" />
        </svg>
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center space-y-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
          {course.ctaBanner.heading}
        </h2>

        <a
          href="#enroll"
          className="inline-flex items-center gap-2.5 px-8 py-4 bg-white hover:bg-neutral-100 text-[#C1121C] text-sm sm:text-base font-extrabold uppercase tracking-wider rounded-full shadow-xl hover:-translate-y-0.5 transition-all duration-200"
        >
          <span>{course.ctaBanner.buttonText}</span>
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
