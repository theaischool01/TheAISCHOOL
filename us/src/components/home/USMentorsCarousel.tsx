"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ABOUT_US_DATA } from "@us/config/aboutUsData";
import AvatarPlaceholder from "./AvatarPlaceholder";

function LinkedinCircleIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function USMentorsCarousel() {
  const shouldReduceMotion = useReducedMotion();
  const { mentors } = ABOUT_US_DATA;

  return (
    <section
      id="our-mentors"
      className="relative w-full bg-[#FAFAFA] py-16 lg:py-24 px-6 md:px-12 font-sans border-b border-neutral-100 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="border-b border-neutral-200/80 pb-8 text-center sm:text-left">
          <span className="text-xs font-extrabold text-[#EE1C25] uppercase tracking-widest block mb-2">
            LEARN LIVE FROM ACTIVE PRACTITIONERS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#171717] uppercase tracking-tight">
            Our <span className="text-[#EE1C25]">Mentors</span>
          </h2>
        </div>

        {/* Compact Responsive Card Grid (10 Mentors) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {mentors.map((mentor, idx) => (
            <motion.div
              key={mentor.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="relative bg-white border border-neutral-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 group overflow-hidden"
            >
              {/* Red Left Accent Bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#EE1C25] group-hover:w-[6px] transition-all duration-300" />

              <div className="flex flex-col items-center text-center space-y-3 pt-1">
                {/* Circular Photo */}
                <div className="w-20 h-20 rounded-full overflow-hidden border border-neutral-200 shadow-2xs relative bg-neutral-50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <AvatarPlaceholder
                    name={mentor.name}
                    imageUrl={mentor.image}
                    size="md"
                    theme="light"
                    className="w-full h-full text-lg"
                  />
                </div>

                {/* Name & Role Tag */}
                <div className="space-y-1 w-full">
                  <h3 className="text-sm font-black text-[#171717] tracking-tight line-clamp-1">
                    {mentor.name}
                  </h3>
                  <p className="text-[11px] font-extrabold text-[#EE1C25] uppercase tracking-wide line-clamp-2 min-h-[32px] flex items-center justify-center">
                    {mentor.role}
                  </p>
                  {mentor.company && mentor.company !== mentor.role && (
                    <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider line-clamp-1">
                      {mentor.company}
                    </p>
                  )}
                </div>
              </div>

              {/* Footer Action: LinkedIn Link */}
              <div className="mt-4 pt-3 border-t border-neutral-100 flex justify-center">
                {mentor.linkedin ? (
                  <a
                    href={mentor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn profile of ${mentor.name}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-[#EE1C25] text-neutral-700 hover:text-white text-[11px] font-bold transition-all duration-200 shadow-2xs"
                  >
                    <LinkedinCircleIcon className="w-3.5 h-3.5 fill-current" />
                    <span>Profile</span>
                  </a>
                ) : (
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Mentor
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
