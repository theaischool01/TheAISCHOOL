"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { COURSE_MENTORS } from "@us/config/coursesData";
import AvatarPlaceholder from "@us/components/home/AvatarPlaceholder";

function LinkedinIcon({ className = "w-4 h-4 fill-current text-white" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function CourseMentorsSection() {
  const shouldReduceMotion = useReducedMotion();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="relative w-full bg-white py-16 lg:py-24 px-6 md:px-12 font-sans border-b border-neutral-100">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Heading matching reference design */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#171717] tracking-tight">
            Meet Your <span className="text-[#C1121C]">Mentors</span>
          </h2>
        </div>

        {/* 3-Card Mentor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto items-stretch">
          {COURSE_MENTORS.map((mentor, idx) => {
            const hasError = imageErrors[mentor.id];

            return (
              <motion.div
                key={mentor.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col items-center text-center justify-between group"
              >
                <div className="flex flex-col items-center w-full">
                  {/* Large Circular Photo */}
                  <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden relative mb-5 border border-neutral-100 shadow-2xs shrink-0 flex items-center justify-center bg-white">
                    <AvatarPlaceholder
                      name={mentor.name}
                      imageUrl={mentor.image}
                      size="xl"
                      theme="light"
                      className="w-full h-full text-2xl"
                    />
                  </div>

                  {/* Name in Bold Red */}
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#C1121C] tracking-tight leading-snug">
                    {mentor.name}
                  </h3>

                  {/* Title + Company in Gray */}
                  <p className="text-xs sm:text-sm font-semibold text-[#6B7280] mt-1">
                    {mentor.titleAndCompany}
                  </p>
                </div>

                {/* Small Circular Red LinkedIn Icon Button */}
                <a
                  href={mentor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn profile of ${mentor.name}`}
                  className="w-8 h-8 rounded-full bg-[#C1121C] text-white flex items-center justify-center hover:bg-[#a00e17] transition-transform duration-200 hover:scale-110 mt-5 shadow-2xs"
                >
                  <LinkedinIcon className="w-4 h-4 fill-current text-white" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
