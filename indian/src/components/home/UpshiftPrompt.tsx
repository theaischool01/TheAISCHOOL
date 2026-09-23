"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import { UPSHIFT_URL } from "@in/components/home/UpshiftHeroSlide";

const SEEN_STORAGE_KEY = "aischool_upshift_popup_seen";

export default function UpshiftPrompt() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoOpenTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Mount safety
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 1. First-visit auto-open after ~2.5s (only once per device via localStorage)
  useEffect(() => {
    if (!isMounted) return;

    try {
      const alreadySeen = localStorage.getItem(SEEN_STORAGE_KEY);
      if (!alreadySeen) {
        autoOpenTimerRef.current = setTimeout(() => {
          setIsOpen(true);
          try {
            localStorage.setItem(SEEN_STORAGE_KEY, "true");
          } catch {
            // ignore localStorage quota errors
          }
        }, 2500);
      }
    } catch {
      // Fallback if localStorage is restricted
      autoOpenTimerRef.current = setTimeout(() => {
        setIsOpen(true);
      }, 2500);
    }

    return () => {
      if (autoOpenTimerRef.current) {
        clearTimeout(autoOpenTimerRef.current);
      }
    };
  }, [isMounted]);

  // 2. Close when clicking outside
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

  // 3. Close on Escape key press
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

  const handleToggle = () => {
    if (autoOpenTimerRef.current) {
      clearTimeout(autoOpenTimerRef.current);
    }
    setIsOpen((prev) => !prev);
  };

  const handleGetStarted = () => {
    setIsOpen(false);
    window.open(UPSHIFT_URL, "_blank", "noopener,noreferrer");
  };

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-[100px] right-8 z-[990] select-none pointer-events-auto max-sm:bottom-[96px] max-sm:right-5"
    >
      {/* 2. Speech/Cloud-Style Promotional Announcement Bubble */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="UpShift Announcement"
          className="absolute bottom-[66px] right-0 sm:right-1 w-[335px] sm:w-[365px] max-w-[calc(100vw-36px)] z-[995] animate-in fade-in zoom-in-[0.96] slide-in-from-bottom-3 duration-250 ease-out"
        >
          {/* Main Speech/Cloud Bubble Body */}
          <div className="relative bg-white rounded-[26px] sm:rounded-[30px] border border-zinc-200/90 shadow-[0_16px_40px_rgba(0,0,0,0.12)] p-5 sm:p-6 flex flex-col justify-between min-h-[210px] sm:min-h-[220px]">
            
            {/* Close Button (×) */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close announcement"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-6 h-6 flex items-center justify-center rounded-full text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/40 z-20"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Top Section: Mascot + Heading */}
            <div>
              <div className="flex items-center gap-3 pr-6">
                {/* 100% Inside Mascot Avatar Badge */}
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 bg-red-50/90 rounded-full overflow-hidden border border-red-100 p-1 flex items-center justify-center shadow-sm">
                  <Image
                    src="/mascot-hero.png"
                    alt="UpShift Mascot"
                    width={40}
                    height={40}
                    className="object-contain w-full h-full"
                  />
                </div>

                {/* Eyebrow & Display Heading */}
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] sm:text-[10.5px] font-black uppercase tracking-wider text-[#EE1C25]">
                    READY TO LEVEL UP?
                  </span>
                  <h4 className="text-[14.5px] sm:text-[15.5px] font-extrabold text-zinc-900 leading-snug mt-0.5 tracking-tight">
                    Wanna upskill yourself?
                  </h4>
                </div>
              </div>

              {/* Body Text */}
              <p className="text-[11.5px] sm:text-[12px] text-zinc-600 leading-relaxed mt-2.5 max-w-[96%]">
                Turn your AI knowledge into practical skills, real projects, and new opportunities with <span className="font-semibold text-zinc-900">UpShift</span>.
              </p>
            </div>

            {/* Bottom CTA Button */}
            <div className="mt-3.5 pt-1.5 flex items-center justify-end">
              <button
                type="button"
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-4.5 py-1.5 sm:py-2 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-[11px] sm:text-[11.5px] font-bold uppercase tracking-wider rounded-full shadow-sm hover:shadow-md transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
              >
                <span>GET STARTED</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Descending Speech/Thought Nodes connecting bubble to launcher */}
          <div className="relative w-full h-8 pointer-events-none overflow-visible">
            <span className="absolute right-12 top-0.5 w-[14px] h-[14px] rounded-full bg-white border border-zinc-200/90 shadow-[0_3px_6px_rgba(0,0,0,0.06)]" />
            <span className="absolute right-8 top-3 w-[10px] h-[10px] rounded-full bg-white border border-zinc-200/90 shadow-[0_2px_4px_rgba(0,0,0,0.05)]" />
            <span className="absolute right-5 top-5.5 w-[6px] h-[6px] rounded-full bg-white border border-zinc-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)]" />
          </div>
        </div>
      )}

      {/* 1. Floating Mascot Trigger Button */}
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isOpen ? "Close UpShift announcement" : "Open UpShift announcement"}
        className="group relative w-13 h-13 max-sm:w-12 max-sm:h-12 bg-white rounded-full flex items-center justify-center border-2 border-red-500/30 hover:border-[#EE1C25] shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#EE1C25] focus:ring-offset-2 overflow-visible"
      >
        {/* Mascot Avatar inside launcher */}
        <div className="relative w-8.5 h-8.5 max-sm:w-8 max-sm:h-8 flex items-center justify-center rounded-full overflow-hidden">
          <Image
            src="/mascot-hero.png"
            alt="UpShift Mascot"
            width={34}
            height={34}
            className="object-contain w-full h-full transition-transform duration-200 group-hover:scale-110"
          />
        </div>

        {/* Small Red Accent Indicator Dot */}
        <span className="absolute top-0 right-0 w-3 h-3 bg-[#EE1C25] border-2 border-white rounded-full shadow-sm" />
      </button>
    </div>
  );
}
