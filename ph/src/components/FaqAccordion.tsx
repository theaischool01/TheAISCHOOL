"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { WorkshopFAQ } from "@ph/config/workshopsData";

interface FaqAccordionProps {
  faqs: WorkshopFAQ[];
  courseTitle: string;
}

export default function FaqAccordion({ faqs, courseTitle }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        const buttonId = `faq-btn-${idx}`;
        const contentId = `faq-content-${idx}`;

        return (
          <div
            key={idx}
            className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
              isOpen
                ? "bg-slate-900/80 border-red-500/40 shadow-lg shadow-red-500/5"
                : "bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
            }`}
          >
            <button
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => toggleIndex(idx)}
              className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 focus:outline-none focus:ring-2 focus:ring-red-500/40 rounded-2xl cursor-pointer"
            >
              <span className="flex items-center gap-3 text-base sm:text-lg font-bold text-white leading-snug">
                <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${isOpen ? "text-[#EE1C25]" : "text-slate-400"}`} />
                <span>{faq.question}</span>
              </span>

              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                  isOpen ? "bg-red-500/20 text-[#EE1C25] rotate-180" : "bg-slate-800 text-slate-400"
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-1 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-800/60 font-medium">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
