"use client";

import React from 'react';

const reviews = [
  {
    quote: "Learning directly from an active startup founder completely changed my perspective on engineering. The 80% practical timeline prepared me for production code far better than college labs.",
    author: "Saanvi K.",
    badge: "GenAI Advanced Graduate"
  },
  {
    quote: "Building 7 real enterprise projects allowed me to secure an elite internship immediately. The ecosystem connection at T-Hub is completely unmatched.",
    author: "Rahul M.",
    badge: "Intermediate Cohort Alumnus"
  }
];

export default function Testimonials() {
  return (
    <section className="w-full bg-white py-12 px-6 md:px-12 border-t border-gray-100 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25] font-heading">Alumni Success</span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight font-heading">Validated by Achievers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((rev, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between relative group hover:border-gray-300 transition-all"
            >
              {/* Quote SVG Icon */}
              <svg className="w-10 h-10 text-red-500/10 absolute top-6 right-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              
              <div className="space-y-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-base leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 font-heading">{rev.author}</h4>
                  <span className="text-xs text-[#EE1C25] font-semibold">{rev.badge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
