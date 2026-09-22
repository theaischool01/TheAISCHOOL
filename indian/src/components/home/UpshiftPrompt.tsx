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
      {/* 2. Pure Cloud Thought Bubble (No rectangular card) */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Upskill with UpShift"
          className="absolute bottom-[68px] right-0 sm:right-1 w-[345px] sm:w-[385px] max-w-[calc(100vw-36px)] z-[995] animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-350 ease-out"
        >
          {/* Main Thought Bubble Body (Pure Cloud Silhouette) */}
          <div className="relative w-full min-h-[215px] sm:min-h-[225px] flex flex-col justify-between px-7 py-5 sm:px-8 sm:py-6">
            {/* SVG Organic Cloud Silhouette Background */}
            <svg
              viewBox="0 0 380 230"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full -z-10 drop-shadow-[0_16px_36px_rgba(0,0,0,0.12)] drop-shadow-[0_0_24px_rgba(238,28,37,0.06)]"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="thoughtCloudGrad" x1="190" y1="0" x2="190" y2="230" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#fffdfd" />
                </linearGradient>
              </defs>
              <path
                d="M 68 54 
                   C 50 32, 95 10, 138 20 
                   C 168 6, 218 5, 254 18 
                   C 288 8, 335 22, 342 54 
                   C 372 70, 378 118, 358 150 
                   C 372 182, 332 216, 294 210 
                   C 264 224, 208 226, 170 212 
                   C 132 224, 76 212, 64 180 
                   C 32 172, 18 124, 38 92 
                   C 26 70, 50 50, 68 54 Z"
                fill="url(#thoughtCloudGrad)"
                stroke="#EDEDF0"
                strokeWidth="1.5"
              />
            </svg>

            {/* Close Button (×) positioned in the upper right cloud lobe */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close thought bubble"
              className="absolute top-4 right-5 sm:top-5 sm:right-6 w-6 h-6 flex items-center justify-center rounded-full text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100/80 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/40 z-20"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Content Inside Thought Bubble */}
            <div>
              {/* Header: Mascot + Eyebrow + Title */}
              <div className="flex items-center gap-3 pr-5">
                {/* Integrated Mascot Avatar */}
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 bg-red-50/70 rounded-full overflow-hidden border border-red-100/80 p-0.5 flex items-center justify-center shadow-sm">
                  <Image
                    src="/mascot-hero.png"
                    alt="UpShift Mascot"
                    width={42}
                    height={42}
                    className="object-contain w-full h-full"
                  />
                </div>

                {/* Eyebrow & Title */}
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] sm:text-[10.5px] font-black uppercase tracking-wider text-[#EE1C25]">
                    READY TO LEVEL UP?
                  </span>
                  <h4 className="text-[14.5px] sm:text-[15.5px] font-extrabold text-zinc-900 leading-tight mt-0.5">
                    Wanna upskill yourself?
                  </h4>
                </div>
              </div>

              {/* Body Text */}
              <p className="text-[11.5px] sm:text-[12px] text-zinc-600 leading-relaxed mt-2.5 max-w-[95%]">
                Turn your AI knowledge into practical skills, real projects, and new opportunities with <span className="font-semibold text-zinc-900">UpShift</span>.
              </p>
            </div>

            {/* Bottom CTA Action */}
            <div className="mt-3 pt-2 flex items-center justify-end">
              <button
                type="button"
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-4.5 py-1.5 sm:py-2 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-[11px] sm:text-[11.5px] font-black uppercase tracking-wider rounded-full shadow-[0_4px_12px_rgba(238,28,37,0.3)] hover:shadow-[0_6px_18px_rgba(238,28,37,0.4)] transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
              >
                <span>GET STARTED</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 3 Descending Thought Circles (Connecting main cloud to launcher) */}
          <div className="relative w-full h-9 pointer-events-none overflow-visible">
            {/* Circle 1 (Top) */}
            <span className="absolute right-12 top-0 w-[15px] h-[15px] rounded-full bg-white border border-[#EDEDF0] shadow-[0_4px_8px_rgba(0,0,0,0.06)]" />
            {/* Circle 2 (Middle) */}
            <span className="absolute right-8 top-3 w-[11px] h-[11px] rounded-full bg-white border border-[#EDEDF0] shadow-[0_3px_6px_rgba(0,0,0,0.05)]" />
            {/* Circle 3 (Bottom near launcher) */}
            <span className="absolute right-5 top-6 w-[7px] h-[7px] rounded-full bg-white border border-[#EDEDF0] shadow-[0_2px_4px_rgba(0,0,0,0.04)]" />
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
