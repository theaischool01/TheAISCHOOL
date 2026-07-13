"use client";

import React from 'react';

const journeys = [
  {
    name: "Anshuman Tiwari",
    course: "Backend Engineering Alumnus",
    text: "The curriculum is deeply technical and focuses on high-level system design and scalability that you just don't find in standard tutorials. Thanks to the network here, I successfully landed a new role!",
    from: "Dozee",
    fromLogo: "DZ",
    to: "Hero Vired",
    toLogo: "HV"
  },
  {
    name: "Aditya Deshmukh",
    course: "GenAI Advanced Graduate",
    text: "I was under-confident whether I would be able to cope with the curriculum—especially DSA and System Design—but the trainers were extremely knowledgeable. Additionally, we get mentor connect anytime we want from the dashboard.",
    from: "Newton School",
    fromLogo: "NS",
    to: "Dentira",
    toLogo: "DT"
  }
];

export default function PlacementJourney() {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 border-t border-gray-100 relative z-10 font-heading">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25] font-heading">Career Transformations</span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight font-heading">
            Inspiring Journeys & Wins!
          </h2>
        </div>

        {/* Journey Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {journeys.map((j, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Header Information */}
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-50 rounded-xl text-gray-700 border border-gray-100">
                    <svg className="w-5 h-5 text-[#EE1C25]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-900 leading-tight font-heading">{j.name}</h4>
                    <span className="text-xs font-medium text-gray-400">{j.course}</span>
                  </div>
                </div>

                {/* Main Review Quote */}
                <div className="relative">
                  {/* Quote SVG */}
                  <svg className="w-8 h-8 text-red-500/5 absolute -top-2 -left-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-600 text-sm leading-relaxed relative z-10 pl-4 border-l-2 border-red-100 italic">
                    "{j.text}"
                  </p>
                </div>
              </div>

              {/* Transition Mapping Widget */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 bg-gray-900 text-white font-mono text-xs font-black rounded-lg flex items-center justify-center shrink-0">
                    {j.fromLogo}
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Previous</div>
                    <div className="text-xs font-extrabold text-gray-700 truncate max-w-[100px]">{j.from}</div>
                  </div>
                </div>

                {/* ArrowRightLeft SVG */}
                <svg className="w-4 h-4 text-[#EE1C25] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m16 3 4 4-4 4" />
                  <path d="M20 7H4" />
                  <path d="m8 21-4-4 4-4" />
                  <path d="M4 17h16" />
                </svg>

                <div className="flex items-center space-x-2.5 text-right">
                  <div className="truncate">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-[#EE1C25]">Placed At</div>
                    <div className="text-xs font-extrabold text-gray-900 truncate max-w-[100px]">{j.to}</div>
                  </div>
                  <div className="w-8 h-8 bg-[#EE1C25] text-white font-mono text-xs font-black rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                    {j.toLogo}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
