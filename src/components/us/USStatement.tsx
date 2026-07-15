"use client";

import React from "react";

export default function USStatement() {
  return (
    <section className="w-full bg-neutral-950 text-white py-20 px-6 md:px-12 relative overflow-hidden z-10 font-heading">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#EE1C25]/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black leading-tight tracking-tight uppercase">
          USA's Only School To Learn <span className="text-[#EE1C25]">AI Skills</span> From Tech Startup <span className="text-[#EE1C25]">Founders & Leaders</span>.
        </h2>
      </div>
    </section>
  );
}
