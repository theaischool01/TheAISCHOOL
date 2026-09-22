"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import { UPSHIFT_URL } from "@in/components/home/UpshiftHeroSlide";

const AUTO_OPEN_STORAGE_KEY = "aischool_upshift_popup_auto_opened";

export default function UpshiftPrompt() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoOpenTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-open after ~3 seconds once per session
  useEffect(() => {
    try {
      const alreadyAutoOpened = sessionStorage.getItem(AUTO_OPEN_STORAGE_KEY);
      if (!alreadyAutoOpened) {
        autoOpenTimerRef.current = setTimeout(() => {
          setIsOpen(true);
          sessionStorage.setItem(AUTO_OPEN_STORAGE_KEY, "true");
        }, 3000);
      }
    } catch {
      // Fallback if sessionStorage is unavailable
      autoOpenTimerRef.current = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
    }

    return () => {
      if (autoOpenTimerRef.current) {
        clearTimeout(autoOpenTimerRef.current);
      }
    };
  }, []);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (autoOpenTimerRef.current) {
      clearTimeout(autoOpenTimerRef.current);
    }
    setIsOpen(false);
  };

  const handleGetStarted = () => {
    setIsOpen(false);
    window.open(UPSHIFT_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-[104px] right-8 z-[990] select-none pointer-events-auto max-sm:bottom-[98px] max-sm:right-5"
    >
      {/* 2. Pure Cloud Thought Bubble Container (Core + Outward Lobes Architecture) */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Upskill with UpShift"
          className="absolute bottom-[68px] right-0 sm:right-1 w-[355px] sm:w-[395px] max-w-[calc(100vw-36px)] z-[995] animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-350 ease-out"
        >
          {/* Main Bubble Shell: Unified drop shadow covering the solid core and all outer lobes */}
          <div className="relative filter drop-shadow-[0_16px_36px_rgba(0,0,0,0.11)] drop-shadow-[0_0_20px_rgba(238,28,37,0.05)]">
            
            {/* Outward Expanding Organic Cloud Lobes (Rendered seamlessly around the core) */}
            {/* Top-Left Lobe (Behind/Around the Mascot Pocket) */}
            <div className="absolute -top-3.5 left-5 w-18 h-12 bg-white rounded-full border-t border-l border-[#EDEDF0]" />
            {/* Top-Center Lobe */}
            <div className="absolute -top-4 left-24 w-24 h-12 bg-white rounded-full border-t border-[#EDEDF0]" />
            {/* Top-Right Lobe (Behind the Close Button) */}
            <div className="absolute -top-3.5 right-6 w-20 h-12 bg-white rounded-full border-t border-r border-[#EDEDF0]" />
            {/* Left Edge Upper Lobe */}
            <div className="absolute -left-3.5 top-6 w-12 h-20 bg-white rounded-full border-l border-[#EDEDF0]" />
            {/* Left Edge Lower Lobe */}
            <div className="absolute -left-3 bottom-6 w-11 h-18 bg-white rounded-full border-l border-[#EDEDF0]" />
            {/* Right Edge Upper Lobe */}
            <div className="absolute -right-3 top-8 w-11 h-20 bg-white rounded-full border-r border-[#EDEDF0]" />
            {/* Right Edge Lower Lobe */}
            <div className="absolute -right-3.5 bottom-8 w-12 h-18 bg-white rounded-full border-r border-[#EDEDF0]" />
            {/* Bottom-Left Lobe */}
            <div className="absolute -bottom-3 left-8 w-20 h-10 bg-white rounded-full border-b border-l border-[#EDEDF0]" />
            {/* Bottom-Center Lobe */}
            <div className="absolute -bottom-3.5 left-32 w-22 h-11 bg-white rounded-full border-b border-[#EDEDF0]" />
            {/* Bottom-Right Lobe (Connecting to Trail) */}
            <div className="absolute -bottom-3 right-8 w-20 h-10 bg-white rounded-full border-b border-r border-[#EDEDF0]" />

            {/* 1. Solid Interior Core: Guaranteed 100% white background behind ALL content */}
            <div className="relative z-10 bg-white rounded-[28px] sm:rounded-[32px] border border-[#EDEDF0] p-6 sm:p-7 flex flex-col justify-between min-h-[225px] sm:min-h-[235px]">
              
              {/* Close Button (×) positioned safely in the top-right interior */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close thought bubble"
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-6 h-6 flex items-center justify-center rounded-full text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/40 z-20"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Top Section: Mascot + Heading Group */}
              <div>
                <div className="flex items-center gap-3.5 pr-6">
                  {/* Dedicated Mascot Pocket (100% Inside with breathing room) */}
                  <div className="relative w-12 h-12 sm:w-13 sm:h-13 flex-shrink-0 bg-red-50/80 rounded-full overflow-hidden border border-red-100/90 p-1 flex items-center justify-center shadow-sm">
                    <Image
                      src="/mascot-hero.png"
                      alt="UpShift Mascot"
                      width={44}
                      height={44}
                      className="object-contain w-full h-full"
                    />
                  </div>

                  {/* Eyebrow & Display Title */}
                  <div className="flex-1 min-w-0">
                    <span className="block text-[10.5px] sm:text-[11px] font-black uppercase tracking-wider text-[#EE1C25]">
                      READY TO LEVEL UP?
                    </span>
                    <h4 className="text-[15px] sm:text-[16px] font-black text-zinc-900 leading-tight mt-0.5 tracking-tight">
                      Wanna upskill yourself?
                    </h4>
                  </div>
                </div>

                {/* Body Paragraph (Centered comfortably inside safe zone) */}
                <p className="text-[12px] sm:text-[12.5px] text-zinc-600 leading-relaxed mt-3 max-w-[96%]">
                  Turn your AI knowledge into practical skills, real projects, and new opportunities with <span className="font-semibold text-zinc-900">UpShift</span>.
                </p>
              </div>

              {/* Bottom CTA Action Button */}
              <div className="mt-4 pt-1 flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleGetStarted}
                  className="inline-flex items-center justify-center gap-1.5 px-4.5 sm:px-5 py-2 sm:py-2.5 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-[11px] sm:text-xs font-black uppercase tracking-wider rounded-full shadow-[0_4px_14px_rgba(238,28,37,0.3)] hover:shadow-[0_6px_20px_rgba(238,28,37,0.45)] transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                >
                  <span>GET STARTED</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* 6. Descending Connected Thought Trail (4 progressively smaller circular nodes) */}
          <div className="relative w-full h-10 pointer-events-none overflow-visible">
            {/* Circle 1 (16px) */}
            <span className="absolute right-14 top-1 w-[16px] h-[16px] rounded-full bg-white border border-[#EDEDF0] shadow-[0_4px_8px_rgba(0,0,0,0.06)]" />
            {/* Circle 2 (12px) */}
            <span className="absolute right-10 top-3.5 w-[12px] h-[12px] rounded-full bg-white border border-[#EDEDF0] shadow-[0_3px_6px_rgba(0,0,0,0.05)]" />
            {/* Circle 3 (8px) */}
            <span className="absolute right-6.5 top-6.5 w-[8px] h-[8px] rounded-full bg-white border border-[#EDEDF0] shadow-[0_2px_4px_rgba(0,0,0,0.04)]" />
            {/* Circle 4 (5px) */}
            <span className="absolute right-4 top-8.5 w-[5px] h-[5px] rounded-full bg-white border border-[#EDEDF0] shadow-[0_1px_3px_rgba(0,0,0,0.03)]" />
          </div>
        </div>
      )}

      {/* 1. Floating Mascot Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close UpShift thought bubble" : "Open UpShift thought bubble"}
        className="group relative w-14 h-14 max-sm:w-12 max-sm:h-12 bg-white rounded-full flex items-center justify-center border-2 border-red-500/30 hover:border-[#EE1C25] shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_32px_rgba(238,28,37,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#EE1C25] focus:ring-offset-2 overflow-visible"
      >
        {/* Subtle pulsing ring effect when closed */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-red-500/15 animate-ping pointer-events-none opacity-40 duration-1000" />
        )}

        {/* Mascot inside launcher */}
        <div className="relative w-9 h-9 max-sm:w-8 max-sm:h-8 flex items-center justify-center rounded-full overflow-hidden">
          <Image
            src="/mascot-hero.png"
            alt="UpShift Mascot Launcher"
            width={36}
            height={36}
            className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Small Red Accent Indicator Dot */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#EE1C25] border-2 border-white rounded-full shadow-sm" />
      </button>
    </div>
  );
}
