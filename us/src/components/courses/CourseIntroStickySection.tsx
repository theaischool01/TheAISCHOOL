"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FullCourseData } from "@us/config/coursesData";
import { Clock, Award, Users, ChevronDown, CheckCircle2, ArrowRight } from "lucide-react";

interface Props {
  course: FullCourseData;
}

export default function CourseIntroStickySection({ course }: Props) {
  const shouldReduceMotion = useReducedMotion();
  // Default first module (index 0) open, rest collapsed
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);

  const stickyIconMap = {
    Clock: Clock,
    Award: Award,
    Users: Users,
  };

  const toggleAccordion = (index: number) => {
    setOpenModuleIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative w-full bg-[#FAFAFA] py-16 lg:py-24 px-6 md:px-12 font-sans border-b border-neutral-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-14 items-start">
        {/* LEFT COLUMN: Intro, Modules Accordion, and Key Outcomes */}
        <div className="space-y-16">
          {/* Section 2: Course Intro Description */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#171717] uppercase tracking-tight leading-tight">
              {course.name}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 font-medium leading-relaxed max-w-3xl">
              {course.description}
            </p>
          </div>

          {/* Section 3: Curriculum Modules Accordion */}
          <div id="curriculum" className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-black text-[#171717] uppercase tracking-tight">
              {course.accordionHeading}
            </h3>

            <div className="space-y-3.5">
              {course.detailedModules.map((mod, idx) => {
                const isOpen = openModuleIndex === idx;

                return (
                  <div key={mod.id} className="rounded-xl overflow-hidden shadow-2xs">
                    {/* Module Red Header Bar */}
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className={`w-full p-4 sm:p-5 flex items-center justify-between text-left text-white font-bold text-sm sm:text-base transition-colors duration-200 cursor-pointer ${
                        isOpen
                          ? "bg-[#C1121C] rounded-t-xl"
                          : "bg-[#C1121C] hover:bg-[#a00e17] rounded-xl"
                      }`}
                    >
                      <span className="pr-4 leading-snug">{mod.title}</span>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 transition-transform duration-250 ${
                          isOpen ? "rotate-180 text-white" : "text-white/80"
                        }`}
                      />
                    </button>

                    {/* Expandable Module Detail Card */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="bg-white border-x border-b border-neutral-200/80 rounded-b-xl overflow-hidden"
                        >
                          <div className="p-5 sm:p-6 space-y-3">
                            {mod.bullets.map((bullet, bIdx) => (
                              <div key={bIdx} className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C1121C] shrink-0 mt-2" />
                                <p className="text-xs sm:text-sm font-semibold text-neutral-700 leading-relaxed">
                                  {bullet}
                                </p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: Key Outcomes */}
          <div className="space-y-6 pt-4 border-t border-neutral-200/60">
            <h3 className="text-xl sm:text-2xl font-black text-[#171717] uppercase tracking-tight">
              {course.outcomesHeading}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {course.outcomes.map((outcome, idx) => (
                <motion.div
                  key={idx}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white border border-neutral-200/80 shadow-2xs"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#C1121C] fill-red-100 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm font-bold text-[#171717] leading-snug">
                    {outcome}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky "Start learning today!" Enrollment Card */}
        <div className="w-full lg:sticky lg:top-28 z-20">
          <div id="enroll" className="bg-white border border-neutral-200/80 border-t-4 border-t-[#C1121C] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="space-y-1.5">
              <h4 className="text-xl sm:text-2xl font-black text-[#171717] uppercase tracking-tight">
                {course.stickyCard.heading}
              </h4>
              <p className="text-xs sm:text-sm font-semibold text-neutral-500 leading-snug">
                {course.stickyCard.subtext}
              </p>
            </div>

            <div className="w-full h-[1px] bg-neutral-100" />

            {/* Inclusions List */}
            <div className="space-y-3.5">
              {course.stickyCard.inclusions.map((item, idx) => {
                const IconComp = stickyIconMap[item.icon as keyof typeof stickyIconMap] || Clock;
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-50 text-[#C1121C] flex items-center justify-center shrink-0">
                      <IconComp className="w-4 h-4 text-[#C1121C]" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#171717]">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>

            <a
              href="/us/contact-us"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#C1121C] hover:bg-[#a00e17] text-white text-sm font-extrabold uppercase tracking-wider rounded-xl py-3.5 px-6 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <span>{course.stickyCard.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
