"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ABOUT_US_DATA } from "@us/config/aboutUsData";
import AvatarPlaceholder from "./AvatarPlaceholder";
import { ChevronLeft, ChevronRight } from "lucide-react";

function LinkedinIcon({ className = "w-3.5 h-3.5 fill-current" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function USTeamCarousel() {
  const { teamMembers } = ABOUT_US_DATA;
  const N = teamMembers.length;

  // Tripled array for seamless infinite looping
  const extendedMembers = [...teamMembers, ...teamMembers, ...teamMembers];

  // Start at middle set index (N = 5)
  const [currentIndex, setCurrentIndex] = useState(N);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleAnimationComplete = () => {
    if (currentIndex >= N * 2) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - N);
    } else if (currentIndex < N) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + N);
    }
  };

  useEffect(() => {
    if (isPaused) return;
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused]);

  return (
    <section
      id="our-team"
      className="relative w-full bg-white py-16 lg:py-24 px-6 md:px-12 font-sans overflow-hidden border-b border-neutral-100 select-none"
    >
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold text-[#C1121C] uppercase tracking-widest">
              INDUSTRY LEADERSHIP &amp; FOUNDERS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#171717] uppercase tracking-tight">
              Our <span className="text-[#C1121C]">Team</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-neutral-100 hover:bg-[#C1121C] hover:text-white text-neutral-800 transition-colors shadow-sm cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-neutral-100 hover:bg-[#C1121C] hover:text-white text-neutral-800 transition-colors shadow-sm cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Outer Container */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex gap-6 cursor-grab active:cursor-grabbing py-4"
            animate={{ x: `-${currentIndex * 284}px` }}
            transition={
              isTransitioning
                ? { type: "spring", stiffness: 260, damping: 28 }
                : { duration: 0 }
            }
            onAnimationComplete={handleAnimationComplete}
          >
            {extendedMembers.map((member, idx) => (
              <motion.div
                key={`${member.id}-${idx}`}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`relative min-w-[260px] max-w-[260px] bg-black border rounded-3xl p-6 flex flex-col justify-between shadow-xl transition-all duration-300 group overflow-hidden ${
                  member.isPending ? "border-neutral-800 opacity-90" : "border-neutral-900"
                }`}
                style={{ minHeight: "330px" }}
              >
                {/* Red Left Accent Bar */}
                <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#C1121C] group-hover:w-[6px] transition-all duration-300" />

                {member.isPending && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[9px] font-black uppercase tracking-wider">
                    Pending
                  </div>
                )}

                {/* Avatar */}
                <div className="my-2 flex flex-col items-center">
                  <AvatarPlaceholder
                    name={member.name}
                    imageUrl={member.image}
                    size="lg"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Details */}
                <div className="w-full text-center space-y-2 mt-2">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-xs font-extrabold text-[#C1121C] uppercase tracking-wide">
                    {member.role}
                  </p>
                  <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    {member.company}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-4 pt-3 border-t border-neutral-900 flex justify-center">
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-[#C1121C] text-neutral-300 hover:text-white text-[11px] font-bold transition-all duration-200"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5 fill-current" />
                      <span>Profile</span>
                    </a>
                  ) : (
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                      Details Coming Soon
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
