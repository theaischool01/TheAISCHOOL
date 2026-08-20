"use client";

import React from "react";
import { US_DATA } from "@us/config/usData";
import { useReducedMotion } from "framer-motion";

export default function USPartnersGrid() {
  const { partnersGrid } = US_DATA;
  const shouldReduceMotion = useReducedMotion();

  // Dynamically split ecosystem partners list into 3 horizontal marquee rows
  const rowCount = 3;
  const row1: typeof partnersGrid = [];
  const row2: typeof partnersGrid = [];
  const row3: typeof partnersGrid = [];

  partnersGrid.forEach((partner, idx) => {
    if (idx % rowCount === 0) row1.push(partner);
    else if (idx % rowCount === 1) row2.push(partner);
    else row3.push(partner);
  });

  const renderMarqueeRow = (
    items: typeof partnersGrid,
    direction: "left" | "right",
    speed: string
  ) => {
    // TASK 2: Seam-avoidance logic - duplicate row logo set 4x for seamless infinite marquee loop.
    // Quadrupling items guarantees the track width exceeds viewport on all screens,
    // allowing translateX from 0% to -50% to loop infinitely with zero visual jump or seam.
    const duplicated = [...items, ...items, ...items, ...items];
    const animClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

    // TASK 2: Respect prefers-reduced-motion -> render static flex wrap grid if reduced motion is enabled
    if (shouldReduceMotion) {
      return (
        <div className="flex flex-wrap justify-center gap-4 py-2">
          {items.map((partner, idx) => (
            <div
              key={`${partner.name}-static-${idx}`}
              className="flex items-center justify-center bg-white border border-neutral-200/80 rounded-2xl p-4 h-20 w-44 shadow-xs cursor-pointer group/logo transition-all duration-50 hover:shadow-md hover:border-[#EE1C25]/40 hover:scale-105 active:scale-105"
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="max-h-10 max-w-[85%] object-contain filter grayscale-[75%] opacity-65 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 transition-all duration-50 ease-out"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="relative w-full overflow-hidden py-1 group/row">
        {/* TASK 2: Auto-scrolls infinitely & pauses only the hovered row */}
        <div
          className={`flex gap-4 w-max ${animClass} group-hover/row:[animation-play-state:paused]`}
          style={{ animationDuration: speed }}
        >
          {duplicated.map((partner, idx) => (
            <div
              key={`${partner.name}-${idx}`}
              className="flex items-center justify-center bg-white border border-neutral-200/80 rounded-2xl p-4 h-20 w-44 shadow-xs shrink-0 cursor-pointer group/logo transition-all duration-300 hover:shadow-md hover:border-[#EE1C25]/40 hover:scale-105 active:scale-105"
            >
              {/* TASK 2: Grayscale (75%) & Opacity (0.65) default -> Color (100%), Scale (1.05) on hover/tap */}
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="max-h-10 max-w-[85%] object-contain filter grayscale-[75%] opacity-65 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 transition-all duration-300 ease-out pointer-events-none"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="partners" className="w-full bg-white py-14 lg:py-20 px-6 md:px-12 relative z-10 font-heading">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#FFF8F8] rounded-[2.5rem] border border-red-100/60 p-8 md:p-12 overflow-hidden flex flex-col items-center justify-between gap-8 relative min-h-[480px]">
          {/* Top Section Headline */}
          <div className="w-full text-center space-y-2 relative z-20">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.05]">
              OUR ECO SYSTEM <span className="text-[#EE1C25]">PARTNERS</span>
            </h3>
            <p className="text-xs font-semibold text-slate-600 max-w-md mx-auto">
              Collaborating with leading technology companies and research institutions globally.
            </p>
          </div>

          {/* TASK 2: Horizontal Infinite Marquee Rows with Edge Gradient Fades */}
          <div
            className="w-full relative space-y-4 select-none"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            {row1.length > 0 && renderMarqueeRow(row1, "left", "50s")}
            {row2.length > 0 && renderMarqueeRow(row2, "right", "42s")}
            {row3.length > 0 && renderMarqueeRow(row3, "left", "54s")}
          </div>
        </div>
      </div>
    </section>
  );
}
