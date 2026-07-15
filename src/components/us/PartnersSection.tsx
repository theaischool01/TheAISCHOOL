"use client";

import React from "react";

const ecosystemStrip = [
  { name: "T-Hub", logo: "/assets/t-hub.png" },
  { name: "MATH", logo: "/assets/math.png" },
  { name: "Department of Science & Technology", logo: "/assets/dst.png" }
];

const mainPartners = [
  { name: "Uber", logo: "/assets/uber.png", size: "col-span-2 row-span-1" },
  { name: "DoT / India Telecom", logo: "/assets/dot.png", size: "col-span-1 row-span-1" },
  { name: "ITU WTSA", logo: "/assets/itu.png", size: "col-span-1 row-span-1" },
  { name: "Bharat Dynamics Limited", logo: "/assets/bdl.png", size: "col-span-2 row-span-2" },
  { name: "BSNL Academy", logo: "/assets/bsnl.png", size: "col-span-1 row-span-1" },
  { name: "STAR Academy", logo: "/assets/star.png", size: "col-span-1 row-span-1" },
  { name: "Jaipuria Group", logo: "/assets/jaipuria.png", size: "col-span-2 row-span-1" },
  { name: "SRM University AP", logo: "/assets/srm.png", size: "col-span-1 row-span-1" },
  { name: "ICT Academy", logo: "/assets/ict.png", size: "col-span-1 row-span-1" },
  { name: "TCOE India", logo: "/assets/tcoe.png", size: "col-span-2 row-span-1" },
  { name: "Computer Society of India", logo: "/assets/csi.png", size: "col-span-1 row-span-1" },
  { name: "AVPL International", logo: "/assets/avpl.png", size: "col-span-1 row-span-1" },
  { name: "Area 51 IT", logo: "/assets/area51.png", size: "col-span-2 row-span-1" },
  { name: "Mapua University", logo: "/assets/mapua.png", size: "col-span-1 row-span-1" },
  { name: "RFgen", logo: "/assets/rfgen.png", size: "col-span-1 row-span-1" },
  { name: "hyperleap.ai", logo: "/assets/hyperleap.png", size: "col-span-2 row-span-2" },
  { name: "rava.ai", logo: "/assets/rava.png", size: "col-span-1 row-span-1" },
  { name: "AgentAnalytics.AI", logo: "/assets/agent_analytics.png", size: "col-span-1 row-span-1" },
  { name: "Acharya Nagarjuna University", logo: "/assets/anu.png", size: "col-span-2 row-span-1" }
];

export default function PartnersSection() {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 border-t border-gray-100 relative z-10 font-heading">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Ecosystem Partners Small Strip */}
        <div className="text-center space-y-6">
          <p className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
            Ecosystem Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-85">
            {ecosystemStrip.map((partner, idx) => (
              <div key={idx} className="h-10 w-32 relative flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain grayscale contrast-200 hover:grayscale-0 hover:contrast-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bento Grid Title */}
        <div className="text-center space-y-3 pt-4">
          <h2 className="text-3xl font-black text-gray-950 tracking-tight uppercase">
            Our <span className="text-[#EE1C25]">Partners</span>
          </h2>
          <p className="text-sm font-semibold text-neutral-500 max-w-md mx-auto">
            Innovating together with industry leaders, educational giants, and pioneers worldwide.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[100px] md:auto-rows-[120px] max-w-5xl mx-auto">
          {mainPartners.map((partner, idx) => (
            <div
              key={idx}
              className={`${partner.size} bg-white border border-neutral-100 rounded-3xl p-6 flex flex-col items-center justify-center shadow-xs hover:shadow-md hover:border-red-100 transition-all duration-300 group`}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-[60%] max-w-[85%] object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
              />
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wide mt-2 text-center truncate w-full group-hover:text-gray-950 transition-colors">
                {partner.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
