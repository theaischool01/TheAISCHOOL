"use client";

import React from "react";
import { motion } from "framer-motion";
import { ABOUT_US_DATA } from "@us/config/aboutUsData";
import AvatarPlaceholder from "./AvatarPlaceholder";
import { Users } from "lucide-react";

function LinkedinIcon({ className = "w-3.5 h-3.5 fill-current" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function USCoreMembersSection() {
  const { coreMembers } = ABOUT_US_DATA;

  return (
    <section
      id="core-members"
      className="relative w-full bg-white py-16 lg:py-24 px-6 md:px-12 font-sans overflow-hidden border-b border-neutral-100"
    >
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Header with Eyebrow Pill */}
        <div className="text-center space-y-3 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#C1121C] text-xs font-bold uppercase tracking-wider shadow-sm"
          >
            <Users className="w-3.5 h-3.5 text-[#C1121C]" />
            <span>LEADERSHIP</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#171717] uppercase tracking-tight"
          >
            Meet Our <span className="text-[#C1121C]">Core Members</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-sm sm:text-base font-semibold text-neutral-500 max-w-xl mx-auto"
          >
            Visionary leaders driving AI innovation and empowering the next generation of engineers.
          </motion.p>
        </div>

        {/* 5 Cards Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 justify-center items-stretch">
          {coreMembers.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut", delay: idx * 0.08 }}
              className="relative bg-white border border-neutral-200/80 hover:border-red-500/40 rounded-3xl p-6 flex flex-col items-center justify-between shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 group overflow-hidden"
            >
              {/* Top Avatar Portion */}
              <div className="my-2 flex flex-col items-center">
                <AvatarPlaceholder
                  name={member.name}
                  imageUrl={member.image}
                  size="lg"
                  theme="light"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Name & Role Portion */}
              <div className="w-full text-center space-y-1.5 mt-3">
                <h3 className="text-base font-extrabold text-[#171717] leading-snug line-clamp-2">
                  {member.name}
                </h3>
                <p className="text-xs font-bold text-[#C1121C] uppercase tracking-wide">
                  {member.role}
                </p>
              </div>

              {/* Outlined Connect Pill Button */}
              <div className="mt-5 w-full pt-3 border-t border-neutral-100 flex justify-center">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-red-200 text-[#C1121C] bg-white hover:bg-[#C1121C] hover:border-[#C1121C] hover:text-white text-xs font-extrabold transition-all duration-200 shadow-xs"
                  aria-label={`LinkedIn profile for ${member.name}`}
                >
                  <LinkedinIcon className="w-3.5 h-3.5 fill-current" />
                  <span>Connect</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
