"use client";

import React from "react";

export default function IndustryPartnersGrid() {
  const partners = [
    {
      name: "Arun Chinnachamy",
      title: "Founder",
      company: "ResidualHue",
      initials: "AC",
    },
    {
      name: "Gopi Krishna",
      title: "Founder & CEO",
      company: "hyperleap.ai",
      initials: "GK",
    },
    {
      name: "Kiran Babu",
      title: "Co-Founder and CEO",
      company: "rava.ai",
      initials: "KB",
    },
    {
      name: "Raja Mamidi",
      title: "Co-Founder",
      company: "DotCheckout",
      initials: "RM",
    },
    {
      name: "Ranjan Relan",
      title: "Founder/CEO",
      company: "AgentAnalytics.AI",
      initials: "RR",
    },
  ];

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 border-t border-gray-100 font-heading select-none">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Title */}
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#EE1C25]">
            Corporate Network
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-gray-950 uppercase tracking-tight">
            Industry Partners
          </h3>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {partners.map((partner, idx) => (
            <div 
              key={idx}
              className="bg-gradient-to-br from-white to-slate-50 border border-gray-100 rounded-2xl p-5 flex flex-col items-center text-center shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              {/* Smaller Avatar: 96px */}
              <div className="w-20 h-20 rounded-full bg-slate-200 text-slate-600 font-extrabold text-2xl flex items-center justify-center mb-4 border border-slate-300/40 select-none">
                {partner.initials}
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-black text-gray-900 tracking-tight uppercase leading-snug">
                  {partner.name}
                </h4>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  {partner.title}
                </p>
                <p className="text-[10px] font-black text-[#EE1C25] uppercase tracking-wide">
                  {partner.company}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
