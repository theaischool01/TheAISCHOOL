"use client";

import React from "react";

const programPartners = [
  {
    name: "T-Hub",
    desc: "India's pioneering innovation ecosystem, driving startup growth and technology integration.",
    logo: "/assets/t-hub.png"
  },
  {
    name: "MATH",
    desc: "Machine Learning and Artificial Intelligence Technology Hub, fostering deep-tech excellence.",
    logo: "/assets/math.png"
  },
  {
    name: "Department of Science & Technology",
    desc: "DST, Government of India, promoting scientific research and technological initiatives.",
    logo: "/assets/dst.png"
  }
];

const ecosystemPartners = [
  { name: "Uber", logo: "/assets/uber.png" },
  { name: "TASK Telangana", logo: "/assets/task.png" },
  { name: "Bharat Dynamics Limited", logo: "/assets/bdl.png" },
  { name: "AI Alliance Network", logo: "/assets/ai_alliance.png" },
  { name: "SRM University AP", logo: "/assets/srm.png" },
  { name: "ICT Academy", logo: "/assets/ict.png" },
  { name: "BSNL Academy", logo: "/assets/bsnl.png" },
  { name: "Rava AI", logo: "/assets/rava.png" },
  { name: "HyperLeap", logo: "/assets/hyperleap.png" },
  { name: "AgentAnalytics AI", logo: "/assets/agent_analytics.png" },
  { name: "Jaipuria Group", logo: "/assets/jaipuria.png" },
  { name: "TCOE", logo: "/assets/tcoe.png" },
  { name: "AVPL", logo: "/assets/avpl.png" },
  { name: "Mapua University", logo: "/assets/mapua.png" },
  { name: "DOT India", logo: "/assets/dot.png" },
  { name: "ITU WTSA", logo: "/assets/itu.png" },
  { name: "STAR Academy", logo: "/assets/star.png" },
  { name: "Computer Society of India", logo: "/assets/csi.png" },
  { name: "Area 51", logo: "/assets/area51.png" },
  { name: "RFgen", logo: "/assets/rfgen.png" },
  { name: "Acharya Nagarjuna University", logo: "/assets/anu.png" }
];

// Split ecosystem partners into 3 columns
const col1 = [
  ecosystemPartners[0],
  ecosystemPartners[3],
  ecosystemPartners[6],
  ecosystemPartners[9],
  ecosystemPartners[12],
  ecosystemPartners[15],
  ecosystemPartners[18],
];

const col2 = [
  ecosystemPartners[1],
  ecosystemPartners[4],
  ecosystemPartners[7],
  ecosystemPartners[10],
  ecosystemPartners[13],
  ecosystemPartners[16],
  ecosystemPartners[19],
];

const col3 = [
  ecosystemPartners[2],
  ecosystemPartners[5],
  ecosystemPartners[8],
  ecosystemPartners[11],
  ecosystemPartners[14],
  ecosystemPartners[17],
  ecosystemPartners[20],
];

interface LogoColumnProps {
  items: typeof col1;
  direction: "up" | "down";
  speedClass: string;
}

function LogoColumn({ items, direction, speedClass }: LogoColumnProps) {
  // Triple the items to ensure seamless infinite looping
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <div
        className={`flex flex-col gap-3 absolute w-full ${direction === "up" ? "animate-scroll-up" : "animate-scroll-down"
          }`}
        style={{
          animationDuration: speedClass,
        }}
      >
        {duplicatedItems.map((partner, idx) => (
          <div
            key={`${partner.name}-${idx}`}
            className="flex flex-col items-center justify-center bg-white border border-neutral-100 rounded-2xl p-4 h-24 shadow-xs"
          >
            <img
              src={partner.logo}
              alt={`${partner.name} logo`}
              className="max-h-8 max-w-[85%] object-contain"
              onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
            />
            <span className="text-[8px] font-bold tracking-wider text-neutral-400 font-sans uppercase text-center truncate w-full mt-2">
              {partner.name === "Bharat Dynamics Limited" ? "BDL" : partner.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PartnersSection() {
  return (
    <section className="w-full bg-white py-14 px-6 md:px-12 relative border-t border-gray-100 z-10 font-heading">
      <div className="max-w-7xl mx-auto space-y-16">



        {/* ================= SECTION 1: PROGRAM PARTNERS ================= */}
        <div className="border-t border-neutral-200/80 pt-12 pb-12 border-b border-neutral-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Cards Column */}
            <div className="lg:col-span-8 flex flex-col sm:flex-row gap-6 justify-start items-stretch">
              {programPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="group bg-white border border-neutral-200/80 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-[#EE1C25] transition-all duration-300 w-full sm:w-48"
                >
                  {/* Top: Logo */}
                  <div className="p-6 flex items-center justify-center h-28 bg-white">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="max-h-12 object-contain"
                      onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
                    />
                  </div>

                  {/* Bottom Band label */}
                  <div className="bg-red-50/50 py-3 text-center text-xs font-bold tracking-wider text-[#EE1C25] border-t border-red-100/50 group-hover:bg-[#EE1C25] group-hover:text-white transition-all duration-300">
                    {partner.name === "Department of Science & Technology" ? "DST" : partner.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Title Column */}
            <div className="lg:col-span-4 space-y-3">
              <h3 className="text-3xl font-black text-gray-950 tracking-tight leading-tight">
                Program Partners
              </h3>
              <p className="text-sm font-semibold text-slate-700 max-w-sm">
                Strategic organizations supporting innovation, research, and AI education initiatives.
              </p>
            </div>

          </div>
        </div>

        {/* ================= SECTION 2: ECOSYSTEM PARTNERS (HACKCULTURE STYLE) ================= */}
        <div className="bg-neutral-50/50 rounded-[2.5rem] border border-neutral-200/60 p-8 md:p-12 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 relative min-h-[480px]">

          {/* Left Text Box */}
          <div className="lg:w-1/2 space-y-1 text-center lg:text-left relative z-20">
            <h3 className="text-4xl md:text-5xl font-black tracking-tight uppercase leading-none">
              <span className="text-gray-950">Our </span>
              <span className="text-[#EE1C25]">Eco System Partners</span>
            </h3>
          </div>

          {/* Right Scrolling Wall Box */}
          <div className="lg:w-1/2 w-full h-[400px] overflow-hidden relative flex gap-4 select-none">
            {/* Top and Bottom Fades for smooth blend */}
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-neutral-50/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-neutral-50/80 to-transparent z-10 pointer-events-none" />

            {/* Vertical scrolling logo columns */}
            <LogoColumn items={col1} direction="up" speedClass="30s" />
            <LogoColumn items={col2} direction="down" speedClass="25s" />
            <LogoColumn items={col3} direction="up" speedClass="28s" />
          </div>

        </div>

      </div>

      {/* Global CSS animations for HackCulture scrolling columns */}
      <style jsx global>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-33.33%);
          }
        }
        @keyframes scrollDown {
          0% {
            transform: translateY(-33.33%);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-scroll-up {
          animation-name: scrollUp;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        .animate-scroll-down {
          animation-name: scrollDown;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-up,
          .animate-scroll-down {
            animation: none !important;
            position: relative !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
