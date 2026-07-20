"use client";

import React from "react";
import Image from "next/image";

export default function IndustryPartnersGrid() {
  const partners = [
    {
      name: "Arun Chinnachamy",
      title: "Founder",
      company: "ResidualHue",
      initials: "AC",
      image: "/mentors/arun.webp",
      linkedin: "https://www.linkedin.com/in/arun-chinnachamy/",
    },
    {
      name: "Gopi Krishna",
      title: "Founder & CEO",
      company: "hyperleap.ai",
      initials: "GK",
      image: "/mentors/gopi.webp",
      linkedin: "https://www.linkedin.com/in/gopil/",
    },
    {
      name: "Kiran Babu",
      title: "Co-Founder and CEO",
      company: "rava.ai",
      initials: "KB",
      image: "/mentors/kiran.webp",
      linkedin: "https://www.linkedin.com/in/yerranagu/",
    },
    {
      name: "Raja Mamidi",
      title: "Co-Founder",
      company: "DotCheckout",
      initials: "RM",
      image: "/mentors/raja.webp",
      linkedin: "https://www.linkedin.com/in/tmpraneethnaidu/",
    },
    {
      name: "Ranjan Relan",
      title: "Founder/CEO",
      company: "AgentAnalytics.AI",
      initials: "RR",
      image: "/mentors/ranjan.webp",
      linkedin: "https://www.linkedin.com/in/ranjan-relan/",
    },
  ];

  return (
    <section className="w-full bg-white py-12 md:py-16 px-6 md:px-12 font-heading select-none">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Title */}
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#EE1C25]">
            Corporate Network
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-gray-950 uppercase tracking-tight">
            Industry Partners
          </h3>
          <p className="text-sm font-semibold text-slate-500 max-w-lg">
            Founders and startup leaders driving AI innovation and industry collaboration.
          </p>
        </div>

        {/* 3 columns desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, idx) => (
            <div 
              key={idx}
              className="group bg-white border border-gray-100 rounded-[20px] p-8 md:p-10 flex flex-col items-center text-center shadow-sm hover:-translate-y-2 hover:shadow-[0_20px_50px_-12px_rgba(238,28,37,0.15)] hover:border-[#EE1C25]/25 transition-all duration-300 min-h-[320px] justify-between"
            >
              <div className="flex flex-col items-center space-y-5">
                {/* Avatar: 112px circular with real photo */}
                <div className="w-28 h-28 rounded-full bg-slate-100 text-slate-600 font-extrabold text-2xl flex items-center justify-center border-2 border-slate-100 overflow-hidden relative shrink-0 group-hover:border-[#EE1C25]/30 transition-colors duration-300">
                  {partner.image ? (
                    <Image
                      src={partner.image}
                      alt={partner.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  ) : (
                    partner.initials
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="text-base font-black text-gray-900 tracking-tight uppercase leading-snug">
                    {partner.name}
                  </h4>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                    {partner.title}
                  </p>
                  <p className="text-sm font-black text-[#EE1C25] uppercase tracking-wide">
                    {partner.company}
                  </p>
                </div>
              </div>

              {/* Premium LinkedIn Button (48px) */}
              <a 
                href={partner.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#0A66C2] hover:bg-[#EE1C25] hover:border-[#EE1C25] hover:text-white shadow-sm hover:shadow-md hover:scale-110 transition-all duration-300"
                aria-label={`${partner.name} LinkedIn Profile`}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
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
