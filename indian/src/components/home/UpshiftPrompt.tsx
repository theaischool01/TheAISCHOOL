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
      // Fallback if sessionStorage is disabled/restricted
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
      {/* 2. Premium Thought Bubble Popup */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Upskill with UpShift"
          className="absolute bottom-[72px] right-0 sm:right-2 w-[340px] sm:w-[370px] max-w-[calc(100vw-36px)] z-[995] animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-350 ease-out"
        >
          {/* Main Thought Bubble Container */}
          <div className="relative bg-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 border border-zinc-200/90 shadow-[0_16px_45px_rgba(0,0,0,0.13)] transition-all">
            {/* Soft decorative cloud lobes for organic thought bubble silhouette */}
            <div className="absolute -top-3.5 left-10 w-14 h-8 bg-white rounded-full border-t border-zinc-200/70 pointer-events-none -z-10 shadow-[-2px_-4px_8px_rgba(0,0,0,0.02)]" />
            <div className="absolute -top-4 right-14 w-18 h-9 bg-white rounded-full border-t border-zinc-200/70 pointer-events-none -z-10 shadow-[2px_-4px_8px_rgba(0,0,0,0.02)]" />
            <div className="absolute -left-3 top-8 w-8 h-14 bg-white rounded-full border-l border-zinc-200/70 pointer-events-none -z-10" />
            <div className="absolute -right-3 top-10 w-8 h-14 bg-white rounded-full border-r border-zinc-200/70 pointer-events-none -z-10" />

            {/* Close Button (×) */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close thought bubble"
              className="absolute top-3.5 right-3.5 w-7 h-7 flex items-center justify-center rounded-full text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/40 z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Top Row: Mascot + Header */}
            <div className="flex items-start gap-3.5 pr-6">
              {/* Mascot Thumbnail */}
              <div className="relative w-12 h-12 flex-shrink-0 bg-red-50/80 rounded-2xl overflow-hidden border border-red-100 p-1 flex items-center justify-center shadow-inner">
                <Image
                  src="/mascot-hero.png"
                  alt="UpShift Mascot"
                  width={44}
                  height={44}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Eyebrow + Main Heading */}
              <div className="flex-1 min-w-0 pt-0.5">
                <span className="inline-block text-[10.5px] font-black uppercase tracking-wider text-[#EE1C25]">
                  READY TO LEVEL UP?
                </span>
                <h4 className="text-[15px] sm:text-[16px] font-extrabold text-zinc-900 leading-snug mt-0.5">
                  Wanna upskill yourself?
                </h4>
              </div>
            </div>

            {/* Supporting Body Text */}
            <p className="text-[12px] sm:text-[12.5px] text-zinc-600 leading-relaxed mt-2.5">
              Turn your AI knowledge into practical skills, real projects, and new opportunities with <span className="font-semibold text-zinc-900">UpShift</span>.
            </p>

            {/* CTA Button */}
            <div className="mt-3.5 pt-2.5 border-t border-zinc-100/90 flex items-center justify-end">
              <button
                type="button"
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-[11.5px] sm:text-xs font-black uppercase tracking-wider rounded-full shadow-[0_4px_14px_rgba(238,28,37,0.3)] hover:shadow-[0_6px_20px_rgba(238,28,37,0.4)] transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <span>GET STARTED</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 4. Descending Connected Thought Bubbles (3 circular nodes connecting to launcher) */}
          <div className="relative w-full h-10 pointer-events-none overflow-visible">
            {/* Thought Node 1 (Upper) */}
            <span className="absolute right-12 top-0.5 w-[16px] h-[16px] rounded-full bg-white border border-zinc-200/90 shadow-[0_4px_8px_rgba(0,0,0,0.08)]" />
            {/* Thought Node 2 (Middle) */}
            <span className="absolute right-8 top-3.5 w-[12px] h-[12px] rounded-full bg-white border border-zinc-200/90 shadow-[0_3px_6px_rgba(0,0,0,0.07)]" />
            {/* Thought Node 3 (Lower, near launcher) */}
            <span className="absolute right-5 top-7 w-[8px] h-[8px] rounded-full bg-white border border-zinc-200/90 shadow-[0_2px_4px_rgba(0,0,0,0.06)]" />
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
