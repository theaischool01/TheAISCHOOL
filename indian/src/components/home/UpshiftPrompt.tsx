"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import { UPSHIFT_URL } from "@in/components/home/UpshiftHeroSlide";

const SEEN_STORAGE_KEY = "aischool_upshift_popup_seen";

export default function UpshiftPrompt() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoOpenTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. First-visit auto-open after 2.5s (only once per device/browser via localStorage)
  useEffect(() => {
    try {
      const alreadySeen = localStorage.getItem(SEEN_STORAGE_KEY);
      if (!alreadySeen) {
        autoOpenTimerRef.current = setTimeout(() => {
          setIsOpen(true);
          try {
            localStorage.setItem(SEEN_STORAGE_KEY, "true");
          } catch {
            // ignore localStorage quota/restriction errors
          }
        }, 2500);
      }
    } catch {
      // If localStorage is unavailable, fallback to session-like timeout
      autoOpenTimerRef.current = setTimeout(() => {
        setIsOpen(true);
      }, 2500);
    }

    return () => {
      if (autoOpenTimerRef.current) {
        clearTimeout(autoOpenTimerRef.current);
      }
    };
  }, []);

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

  return (
    <div
      ref={containerRef}
      className="fixed bottom-[100px] right-8 z-[990] select-none pointer-events-auto max-sm:bottom-[96px] max-sm:right-5"
    >
      {/* Compact Utility Announcement Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="UpShift Announcement"
          className="absolute bottom-[58px] right-0 w-[310px] sm:w-[335px] max-w-[calc(100vw-32px)] bg-white rounded-xl border border-zinc-200/90 shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-4 z-[995] animate-in fade-in zoom-in-[0.97] slide-in-from-bottom-2 duration-200 ease-out"
        >
          {/* Header Row: [Mascot Icon + Eyebrow] ... [X Button] */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {/* Mascot Icon */}
              <div className="relative w-6 h-6 flex-shrink-0 bg-red-50 rounded-md overflow-hidden border border-red-100 p-0.5 flex items-center justify-center">
                <Image
                  src="/mascot-hero.png"
                  alt="UpShift Mascot"
                  width={22}
                  height={22}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#EE1C25] truncate">
                READY TO LEVEL UP?
              </span>
            </div>

            {/* Accessible Close Button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close announcement"
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/40 flex-shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Headline */}
          <h4 className="text-[14px] sm:text-[14.5px] font-bold text-zinc-900 leading-snug mt-2 tracking-tight">
            Wanna upskill yourself?
          </h4>

          {/* Body Copy */}
          <p className="text-[11.5px] text-zinc-600 leading-relaxed mt-1">
            Turn your AI knowledge into practical skills, real projects, and new opportunities with <span className="font-semibold text-zinc-900">UpShift</span>.
          </p>

          {/* Footer CTA Button */}
          <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-end">
            <button
              type="button"
              onClick={handleGetStarted}
              className="inline-flex items-center justify-center gap-1 px-3.5 py-1.5 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-[11px] font-bold uppercase tracking-wider rounded-lg shadow-sm hover:shadow transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
            >
              <span>GET STARTED</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Mascot Trigger Button */}
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isOpen ? "Close UpShift announcement" : "Open UpShift announcement"}
        className="group relative w-12 h-12 sm:w-13 sm:h-13 bg-white rounded-full flex items-center justify-center border-2 border-red-500/30 hover:border-[#EE1C25] shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#EE1C25] focus:ring-offset-2 overflow-visible"
      >
        {/* Mascot Avatar inside launcher */}
        <div className="relative w-8 h-8 sm:w-8.5 sm:h-8.5 flex items-center justify-center rounded-full overflow-hidden">
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
