"use client";

import React from "react";

const defaultProgramPartners = [
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

const defaultEcosystemPartners = [
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

interface LogoColumnProps {
  items: { name: string; logo: string }[];
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
            className="flex items-center justify-center bg-white border border-neutral-100 rounded-2xl p-4 h-20 shadow-xs"
          >
            <img
              src={partner.logo}
              alt={`${partner.name} logo`}
              className="max-h-10 max-w-[85%] object-contain"
              onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface PartnersSectionProps {
  programPartners?: typeof defaultProgramPartners;
  ecosystemPartners?: typeof defaultEcosystemPartners;
  programSectionTitle?: string;
  programSectionDesc?: string;
  ecosystemTitle?: string;
}

export default function PartnersSection({
  programPartners = defaultProgramPartners,
  ecosystemPartners = defaultEcosystemPartners,
  programSectionTitle = "Program Partners",
  programSectionDesc = "Strategic organizations supporting innovation, research, and AI education initiatives.",
  ecosystemTitle = "Our Eco System Partners",
}: PartnersSectionProps) {
  // Dynamically split ecosystem partners list into 3 columns
  const columnCount = 3;
  const col1: typeof defaultEcosystemPartners = [];
  const col2: typeof defaultEcosystemPartners = [];
  const col3: typeof defaultEcosystemPartners = [];

  ecosystemPartners.forEach((partner, idx) => {
    if (idx % columnCount === 0) col1.push(partner);
    else if (idx % columnCount === 1) col2.push(partner);
    else col3.push(partner);
  });

  return (
    <section className="w-full bg-transparent py-14 lg:py-16 px-6 md:px-12 relative z-10 font-heading">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* ================= SECTION 1: PROGRAM PARTNERS ================= */}
        <div className="border-t border-neutral-200/80 border-b border-neutral-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Text & CTA */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05] uppercase">
                <span className="text-gray-950 block">PROGRAM</span>
                <span className="text-[#EF232A] block">PARTNERS</span>
              </h3>
              <p className="text-sm font-semibold text-slate-600 max-w-sm leading-relaxed">
                Strategic organizations driving innovation, AI education and research initiatives across India.
              </p>
              <a 
                href="/partners" 
                className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#EF232A] hover:underline pt-2 group"
              >
                <span>View All Partners</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>

            {/* Right Column: Grid of Cards */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                {programPartners.map((partner) => (
                  <div
                    key={partner.name}
                    className="group bg-white border border-neutral-200/80 rounded-2xl p-6 flex flex-col items-center justify-center h-28 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-[#EF232A] transition-all duration-300"
                  >
                    <div className="flex items-center justify-center w-full h-full">
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="max-h-11 max-w-[90%] object-contain"
                        onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ================= SECTION 2: ECOSYSTEM PARTNERS (HACKCULTURE STYLE) ================= */}
        <div className="bg-neutral-50/50 rounded-[2.5rem] border border-neutral-200/60 p-8 md:p-12 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 relative min-h-[480px]">

          {/* Left Text Box */}
          <div className="lg:w-1/2 space-y-1 text-center lg:text-left relative z-20">
            <h3 className="text-4xl md:text-5xl font-black tracking-tight uppercase leading-none">
              {ecosystemTitle.split(" ").map((word, idx) => (
                <span
                  key={idx}
                  className={idx === ecosystemTitle.split(" ").length - 1 ? "text-[#EE1C25]" : "text-gray-950"}
                >
                  {word}{" "}
                </span>
              ))}
            </h3>
          </div>

          {/* Right Scrolling Wall Box */}
          <div className="lg:w-1/2 w-full h-[400px] overflow-hidden relative flex gap-4 select-none">
            {/* Top and Bottom Fades for smooth blend */}
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-neutral-50/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-neutral-50/80 to-transparent z-10 pointer-events-none" />

            {/* Vertical scrolling logo columns */}
            {col1.length > 0 && <LogoColumn items={col1} direction="up" speedClass="30s" />}
            {col2.length > 0 && <LogoColumn items={col2} direction="down" speedClass="25s" />}
            {col3.length > 0 && <LogoColumn items={col3} direction="up" speedClass="28s" />}
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
