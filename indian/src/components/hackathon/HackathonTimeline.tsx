"use client";

import React from "react";
import { 
  UserPlus, 
  FileText, 
  Filter, 
  CheckCircle2, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Trophy 
} from "lucide-react";

const timelineSteps = [
  { 
    stage: "Registrations", 
    desc: "Initial open call across universities & tech hubs",
    stat: "3500+ Teams",
    icon: UserPlus,
    accent: "text-blue-600 bg-blue-50 border-blue-200/60",
  },
  { 
    stage: "Completed Applications", 
    desc: "Full architectural proposals & team profiles submitted",
    stat: "839 Submitted",
    icon: FileText,
    accent: "text-cyan-600 bg-cyan-50 border-cyan-200/60",
  },
  { 
    stage: "Initial Screening", 
    desc: "Feasibility & technical evaluation by TEC",
    stat: "598 Evaluated",
    icon: Filter,
    accent: "text-purple-600 bg-purple-50 border-purple-200/60",
  },
  { 
    stage: "Shortlisted Teams", 
    desc: "Qualified builders invited to live hackathon stage",
    stat: "115 Qualified",
    icon: CheckCircle2,
    accent: "text-emerald-600 bg-emerald-50 border-emerald-200/60",
  },
  { 
    stage: "Active Participation", 
    desc: "48-hour continuous coding & prototype building",
    stat: "72 Competitors",
    icon: Users,
    accent: "text-amber-600 bg-amber-50 border-amber-200/60",
  },
  { 
    stage: "Mentor Selection", 
    desc: "1-on-1 architecture review with industry mentors",
    stat: "41 Shortlisted",
    icon: ShieldCheck,
    accent: "text-rose-600 bg-rose-50 border-rose-200/60",
  },
  { 
    stage: "Jury Shortlist", 
    desc: "Live demo pitches to Grand Jury & VC investors",
    stat: "19 Finalists",
    icon: Sparkles,
    accent: "text-violet-600 bg-violet-50 border-violet-200/60",
  },
  { 
    stage: "Final Selection", 
    desc: "Grand Winners selected by TCOE India & DoT Experts",
    stat: "Top 15 Winners",
    icon: Trophy,
    isWinner: true,
    accent: "text-[#EE1C25] bg-red-50 border-red-200",
  }
];

export default function HackathonTimeline() {
  return (
    <section className="w-full bg-transparent py-16 px-6 md:px-12 relative z-10 font-heading">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-50 border border-red-100 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#EE1C25] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#EE1C25]">
              STRUCTURE & FLOW
            </span>
          </div>
          <h3 className="text-3xl md:text-5xl font-black text-gray-950 uppercase tracking-tight">
            The Hackathon Cycle
          </h3>
          <p className="text-sm font-semibold text-slate-500 max-w-xl mx-auto">
            From nationwide registrations to final government & VC board evaluations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {timelineSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className={`group relative rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between min-h-[220px] ${
                  step.isWinner 
                    ? "bg-gradient-to-br from-[#171717] to-black text-white border-2 border-[#EE1C25] shadow-xl shadow-red-500/10 hover:-translate-y-2" 
                    : "bg-white border border-gray-200/80 hover:border-red-500/40 hover:shadow-xl hover:-translate-y-2"
                }`}
              >
                <div className="space-y-4">
                  {/* Top Bar: Stage Pill & Icon */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full tracking-wider ${
                      step.isWinner 
                        ? "bg-[#EE1C25] text-white" 
                        : "bg-slate-100 text-slate-700 group-hover:bg-[#EE1C25] group-hover:text-white transition-colors"
                    }`}>
                      STAGE 0{idx + 1}
                    </span>
                    <div className={`p-2.5 rounded-2xl border ${
                      step.isWinner 
                        ? "bg-[#EE1C25] text-white border-red-400" 
                        : `${step.accent} group-hover:scale-110 transition-transform`
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Stage Title */}
                  <div>
                    <h4 className={`text-base font-black uppercase leading-snug ${
                      step.isWinner ? "text-white" : "text-gray-950"
                    }`}>
                      {step.stage}
                    </h4>
                    <p className={`text-xs font-semibold mt-1.5 leading-relaxed ${
                      step.isWinner ? "text-gray-300" : "text-slate-500"
                    }`}>
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Stat Badge */}
                <div className="mt-5 pt-3.5 border-t border-gray-100/20 flex items-center justify-between">
                  <span className={`text-[11px] font-extrabold uppercase px-3 py-1 rounded-xl ${
                    step.isWinner 
                      ? "bg-white/10 text-red-200 border border-white/10" 
                      : "bg-slate-50 text-slate-700 font-bold border border-slate-100"
                  }`}>
                    {step.stat}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
