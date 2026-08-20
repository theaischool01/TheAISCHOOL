"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FullCourseData } from "@us/config/coursesData";
import { ChevronDown, HelpCircle } from "lucide-react";

interface Props {
  course: FullCourseData;
}

export default function CourseFaqSection({ course }: Props) {
  const shouldReduceMotion = useReducedMotion();
  // Default first FAQ (index 0) open, rest collapsed
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faqs" className="relative w-full bg-white py-16 lg:py-24 px-6 md:px-12 font-sans border-b border-neutral-100 overflow-hidden">
      {/* Decorative Ghost Background Element */}
      <div className="absolute bottom-6 right-6 pointer-events-none select-none z-0 opacity-[0.04] text-[#C1121C]">
        <HelpCircle className="w-72 h-72 stroke-[1.2] fill-none" />
      </div>

      <div className="max-w-4xl mx-auto space-y-10 relative z-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#171717] uppercase tracking-tight">
            {course.faqsHeading}{" "}
            <span className="text-[#C1121C]">
              {course.faqsAccentText}
            </span>
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-neutral-500 max-w-xl mx-auto">
            Everything you need to know about joining, schedule, learning style, and certification.
          </p>
        </div>

        {/* Lighter Weight Neutral FAQ Accordion */}
        <div className="space-y-3">
          {course.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;

            return (
              <div
                key={faq.id}
                className="bg-neutral-50/80 border border-neutral-200/80 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 flex items-center justify-between text-left text-[#171717] font-extrabold text-base sm:text-lg transition-colors cursor-pointer hover:bg-neutral-100/60"
                >
                  <span className="pr-4 leading-snug">{faq.question}</span>
                  <div className="w-8 h-8 rounded-full bg-white border border-neutral-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#C1121C]" : "text-neutral-500"
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="border-t border-neutral-200/60 bg-white"
                    >
                      <div className="p-5 sm:p-6">
                        <p className="text-xs sm:text-sm font-medium text-neutral-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
