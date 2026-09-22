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
      {/* 2. Pure Spacious Cloud Thought Bubble */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Upskill with UpShift"
          className="absolute bottom-[72px] right-0 sm:right-1 w-[370px] sm:w-[415px] max-w-[calc(100vw-36px)] z-[995] animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-350 ease-out"
        >
          {/* Main Thought Bubble Body (Spacious Cloud Silhouette with ample padding) */}
          <div className="relative w-full min-h-[245px] sm:min-h-[258px] flex flex-col justify-between px-8 pt-7 pb-6 sm:px-9 sm:pt-8 sm:pb-7">
            {/* SVG Organic Cloud Silhouette Background */}
            <svg
              viewBox="0 0 420 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full -z-10 drop-shadow-[0_18px_40px_rgba(0,0,0,0.12)] drop-shadow-[0_0_26px_rgba(238,28,37,0.06)]"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="spaciousThoughtCloudGrad" x1="210" y1="0" x2="210" y2="260" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#fffdfd" />
                </linearGradient>
              </defs>
              <path
                d="M 60 55 
                   C 90 12, 125 15, 155 25 
                   C 185 5, 255 5, 285 25 
                   C 315 12, 355 20, 380 60 
                   C 418 95, 418 125, 395 155 
                   C 418 185, 410 220, 370 238 
                   C 335 260, 300 252, 270 245 
                   C 240 262, 180 262, 150 245 
                   C 120 260, 80 255, 55 230 
                   C 12 210, 10 170, 28 145 
                   C 8 115, 12 80, 60 55 Z"
                fill="url(#spaciousThoughtCloudGrad)"
                stroke="#EDEDF0"
                strokeWidth="1.5"
              />
            </svg>

            {/* Close Button (×) positioned safely inside the upper right cloud lobe */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close thought bubble"
              className="absolute top-5 right-6 sm:top-6 sm:right-7 w-6 h-6 flex items-center justify-center rounded-full text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100/80 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/40 z-20"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Content Group Inside Cloud */}
            <div>
              {/* Header: Mascot + Eyebrow + Heading - ALL 100% inside */}
              <div className="flex items-center gap-3.5 pr-6">
                {/* 100% Inside Mascot Avatar */}
                <div className="relative w-12 h-12 sm:w-13 sm:h-13 flex-shrink-0 bg-red-50/80 rounded-full overflow-hidden border border-red-100 p-1 flex items-center justify-center shadow-sm">
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
                  <h4 className="text-[15px] sm:text-[16.5px] font-black text-zinc-900 leading-tight mt-0.5 tracking-tight">
                    Wanna upskill yourself?
                  </h4>
                </div>
              </div>

              {/* Body Text with generous breathing room and no edge collision */}
              <p className="text-[12px] sm:text-[12.5px] text-zinc-600 leading-relaxed mt-3 max-w-[92%]">
                Turn your AI knowledge into practical skills, real projects, and new opportunities with <span className="font-semibold text-zinc-900">UpShift</span>.
              </p>
            </div>

            {/* Bottom CTA Action - safely inside cloud boundary */}
            <div className="mt-3.5 pt-1.5 flex items-center justify-end pr-1 sm:pr-2">
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

          {/* 4 Descending Connected Thought Circles */}
          <div className="relative w-full h-10 pointer-events-none overflow-visible">
            {/* Circle 1 (Top) */}
            <span className="absolute right-14 top-0.5 w-[16px] h-[16px] rounded-full bg-white border border-[#EDEDF0] shadow-[0_4px_8px_rgba(0,0,0,0.06)]" />
            {/* Circle 2 */}
            <span className="absolute right-10 top-3.5 w-[12px] h-[12px] rounded-full bg-white border border-[#EDEDF0] shadow-[0_3px_6px_rgba(0,0,0,0.05)]" />
            {/* Circle 3 */}
            <span className="absolute right-6.5 top-6.5 w-[8px] h-[8px] rounded-full bg-white border border-[#EDEDF0] shadow-[0_2px_4px_rgba(0,0,0,0.04)]" />
            {/* Circle 4 (Bottom near launcher) */}
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
