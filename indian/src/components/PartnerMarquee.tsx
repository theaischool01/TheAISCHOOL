"use client";

import React from 'react';

const row1Partners = [
  { name: 'Jaipuria Group', logo: '/assets/jaipuria.png' },
  { name: 'TCOE India', logo: '/assets/tcoe.png' },
  { name: 'AVPL International', logo: '/assets/avpl.png' },
  { name: 'Mapúa University', logo: '/assets/mapua.png' },
  { name: 'Rava.ai', logo: '/assets/rava.png' },
  { name: 'Bharat Dynamics', logo: '/assets/bdl.png' },
  { name: 'TASK Telangana', logo: '/assets/task.png' },
  { name: 'T-Hub', logo: '/assets/t-hub.png' },
  { name: 'MATH', logo: '/assets/math.png' },
  { name: 'DST', logo: '/assets/dst.png' },
  { name: 'DOT India', logo: '/assets/dot.png' },
  { name: 'ITU WTSA', logo: '/assets/itu.png' },
];

const row2Partners = [
  { name: 'Computer Society of India', logo: '/assets/csi.png' },
  { name: 'Area 51', logo: '/assets/area51.png' },
  { name: 'RFgen', logo: '/assets/rfgen.png' },
  { name: 'Hyperleap', logo: '/assets/hyperleap.png' },
  { name: 'AgentAnalytics.ai', logo: '/assets/agentanalytics.png' },
  { name: 'Acharya Narendra Dev College', logo: '/assets/andc.png' },
  { name: 'BSNL Academy', logo: '/assets/bsnl.png' },
  { name: 'STAR Academy', logo: '/assets/star.png' },
  { name: 'Uber', logo: '/assets/uber.png' },
  { name: 'AI Alliance Network', logo: '/assets/ai_alliance.png' },
  { name: 'SRM University AP', logo: '/assets/srm.png' },
  { name: 'ICT Academy', logo: '/assets/ict.png' },
];

export default function PartnerMarquee() {
  return (
    <section className="w-full bg-white py-14 overflow-hidden border-t border-gray-100 flex flex-col space-y-12 select-none relative z-10 font-heading">
      
      {/* Section Typography Title */}
      <div className="text-center space-y-2 pb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25] font-heading">Trusted Network</span>
        <h2 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight font-heading">
          Backed by Leading Industry & Ecosystem Partners
        </h2>
      </div>

      {/* Infinite Slider Wrapper Layout */}
      <div className="flex flex-col space-y-10 relative w-full">
        
        {/* Left & Right Ultra-Smooth Edge Fades */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

        {/* ================= ROW 1: ULTRA-WIDE MARQUEE TRACK ================= */}
        <div className="flex overflow-hidden w-full group">
          {[...Array(2)].map((_, i) => (
            <div 
              key={i} 
              className="flex shrink-0 gap-10 px-5 justify-around min-w-full animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]"
            >
              {row1Partners.map((partner, idx) => (
                <div 
                  key={`${i}-${idx}`} 
                  className="flex flex-col items-center justify-center bg-white border border-gray-100 rounded-2xl px-8 py-5 h-32 w-80 shadow-xs hover:shadow-md hover:border-[#EE1C25] transition-all duration-300 gap-3 group/card cursor-pointer"
                >
                  <div className="h-14 w-full flex items-center justify-center">
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="max-h-14 max-w-[90%] object-contain transition-all duration-300"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 group-hover/card:text-[#EE1C25] font-sans uppercase text-center truncate w-full px-2 transition-colors">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ================= ROW 2: ULTRA-WIDE MARQUEE TRACK ================= */}
        <div className="flex overflow-hidden w-full group">
          {[...Array(2)].map((_, i) => (
            <div 
              key={i} 
              className="flex shrink-0 gap-10 px-5 justify-around min-w-full animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]"
              style={{ animationDirection: 'reverse' }}
            >
              {row2Partners.map((partner, idx) => (
                <div 
                  key={`${i}-${idx}`} 
                  className="flex flex-col items-center justify-center bg-white border border-gray-100 rounded-2xl px-8 py-5 h-32 w-80 shadow-xs hover:shadow-md hover:border-[#EE1C25] transition-all duration-300 gap-3 group/card cursor-pointer"
                >
                  <div className="h-14 w-full flex items-center justify-center">
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="max-h-14 max-w-[90%] object-contain transition-all duration-300"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 group-hover/card:text-[#EE1C25] font-sans uppercase text-center truncate w-full px-2 transition-colors">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
