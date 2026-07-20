"use client";

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Who are the mentors teaching the GenAI courses?",
    answer: "Every single masterclass and specialized track is designed and taught directly by active tech startup founders, elite architects, and industry leaders from ecosystems like T-Hub. You learn from people building real-world tech, not traditional academic textbooks."
  },
  {
    question: "Is prior coding experience mandatory?",
    answer: "For the Beginners track, no prior coding exposure is required. For our Intermediate and Advanced 3-to-5 month programs, a baseline understanding of coding logic is expected, and candidates must clear an entrance benchmark (50% and 75% respectively) to secure a seat."
  },
  {
    question: "Do I receive an internship certificate upon completion?",
    answer: "Yes. Every course track is paired with real-world industry projects. Upon successful deployment of your project architecture, you receive an official Internship Completion Certificate backed by our ecosystem partners."
  },
  {
    question: "What is the cohort size limit?",
    answer: "To maintain an elite 1:1 mentorship environment with our startup founders, every specialized cohort is strictly capped at 30 seats maximum. Applications are processed on a rolling, competitive basis."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-white py-12 px-6 md:px-12 border-t border-gray-100 relative z-10">
      <div className="max-w-4xl mx-auto space-y-12">

        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25] font-heading">Got Questions?</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight font-heading">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 bg-white shadow-xs hover:border-gray-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-gray-900 bg-white hover:bg-gray-50/50 transition-colors cursor-pointer font-heading"
                >
                  <div className="flex items-center space-x-3">
                    <svg className={`w-5 h-5 shrink-0 ${isOpen ? 'text-[#EE1C25]' : 'text-gray-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <path d="M12 17h.01" />
                    </svg>
                    <span>{faq.question}</span>
                  </div>
                  <div className="shrink-0 p-1 bg-gray-50 rounded-lg text-gray-500">
                    {isOpen ? (
                      <svg className="w-4 h-4 text-[#EE1C25]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    )}
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-48 border-t border-gray-100' : 'max-h-0'
                    }`}
                >
                  <p className="p-6 text-sm text-gray-600 leading-relaxed bg-gray-50/30">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
