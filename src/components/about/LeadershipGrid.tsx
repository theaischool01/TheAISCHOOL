"use client";

import React from "react";

export default function LeadershipGrid() {
  const leadership = [
    {
      name: "Susanta Srinath Reddy",
      title: "Founder/CEO",
      initials: "SR",
      linkedin: "https://www.linkedin.com/in/susanta-srinath-reddy-57a9776b/",
    },
    {
      name: "K. Spandana",
      title: "Co-Founder",
      initials: "KS",
      linkedin: "https://www.linkedin.com/company/theaischool/",
    },
    {
      name: "Manaswini Reddy",
      title: "Head of Strategic Alliances",
      initials: "MR",
      linkedin: "https://www.linkedin.com/company/theaischool/",
    },
    {
      name: "Rupak Thummalaeddy",
      title: "Strategic Advisor",
      initials: "RT",
      linkedin: "https://www.linkedin.com/company/theaischool/",
    },
  ];

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 border-t border-gray-100 font-heading select-none">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Title */}
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#EE1C25]">
            Executive Team
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-gray-950 uppercase tracking-tight">
            Our Leadership
          </h3>
        </div>

        {/* 4-column static grid (2x2 on mobile) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((member, idx) => (
            <div 
              key={idx}
              className="bg-gradient-to-br from-white to-slate-50 border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative group"
            >
              {/* Larger Avatar: 120px */}
              <div className="w-28 h-28 rounded-full bg-slate-200 text-slate-600 font-extrabold text-3xl flex items-center justify-center mb-4 border border-slate-300/40 select-none">
                {member.initials}
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-black text-gray-900 tracking-tight uppercase leading-snug">
                  {member.name}
                </h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {member.title}
                </p>
              </div>

              {/* LinkedIn hover overlay icon */}
              <a 
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-[#EE1C25] hover:border-[#EE1C25] hover:text-white text-slate-400 transition-all duration-300"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
