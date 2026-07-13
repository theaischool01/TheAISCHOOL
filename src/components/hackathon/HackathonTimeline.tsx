"use client";

import React from "react";

const timelineSteps = [
  { stage: "Registrations", desc: "3500+ Teams Registered" },
  { stage: "Completed Applications", desc: "839 Applications Submitted" },
  { stage: "Initial Screening", desc: "598 Applications after TEC Evaluation" },
  { stage: "Shortlisted for Hackathon", desc: "115 Teams Qualified" },
  { stage: "Active Participation", desc: "72 Teams Competed in Hackathon" },
  { stage: "Mentor Selection", desc: "41 Teams Shortlisted After Mentor Evaluation" },
  { stage: "Jury Shortlist", desc: "19 Finalists Evaluated by Grand Jury" },
  { stage: "Final Selection", desc: "Top 15 Winners Selected by TCOE India & DoT Expert Committee" }
];

export default function HackathonTimeline() {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 border-t border-gray-100 relative z-10 font-heading">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EE1C25]">
            Structure & Flow
          </span>
          <h3 className="text-3xl font-black text-gray-950 uppercase">
            The Hackathon Cycle
          </h3>
        </div>

        <div className="relative w-full overflow-hidden py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {timelineSteps.map((step, idx) => (
              <div 
                key={idx}
                className="bg-white border border-gray-200/80 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all duration-300 relative group flex flex-col justify-between min-h-[140px]"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-neutral-300 group-hover:text-[#EE1C25] transition-colors uppercase tracking-widest block">
                    STAGE 0{idx + 1}
                  </span>
                  <h4 className="text-sm font-extrabold text-gray-950 leading-tight">
                    {step.stage}
                  </h4>
                </div>
                <p className="text-[11px] font-semibold text-neutral-400 leading-normal mt-2">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
