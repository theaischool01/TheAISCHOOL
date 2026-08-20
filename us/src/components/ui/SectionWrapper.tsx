import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  tone?: "white" | "tinted" | "dark" | "gradient";
  className?: string;
  containerClassName?: string;
}

export function SectionWrapper({
  children,
  id,
  tone = "white",
  className = "",
  containerClassName = "",
}: SectionWrapperProps) {
  let bgClasses = "bg-white text-slate-900";

  if (tone === "tinted") {
    bgClasses = "bg-slate-50/80 text-slate-900 border-y border-slate-100";
  } else if (tone === "dark") {
    bgClasses = "bg-slate-950 text-white";
  } else if (tone === "gradient") {
    bgClasses = "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white";
  }

  return (
    <section id={id} className={`relative w-full py-16 md:py-24 overflow-hidden ${bgClasses} ${className}`}>
      {/* Background Engineering Grid Texture for non-dark tones */}
      {tone !== "dark" && tone !== "gradient" && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035] z-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.6) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      )}

      {/* Grid Texture for Dark tones */}
      {(tone === "dark" || tone === "gradient") && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06] z-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      )}

      <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}
