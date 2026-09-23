"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, X, Sparkles } from "lucide-react";

export const UPSHIFT_URL =
  process.env.NEXT_PUBLIC_UPSHIFT_URL || "https://upshift.theaischool.co";

interface UpshiftFloatingPromptProps {
  activeHeroSlide?: 0 | 1;
  onOpenChange?: (open: boolean) => void;
}

export default function UpshiftFloatingPrompt({
  activeHeroSlide = 0,
  onOpenChange,
}: UpshiftFloatingPromptProps) {
  // Always open on initial visit until dismissed by clicking cross
  const [isOpen, setIsOpen] = useState(true);
  const activeHeroSlideRef = useRef(activeHeroSlide);

  // Notify parent of open state to control hero slide carousel pause
  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  // Sync activeHeroSlide
  useEffect(() => {
    activeHeroSlideRef.current = activeHeroSlide;
    if (activeHeroSlide === 1) {
      setIsOpen(false);
    }
  }, [activeHeroSlide]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpenManually = () => {
    setIsOpen(true);
  };

  return (
    <>
      {/* Centered Modal with Backdrop Overlay (Appears on site visit, pauses slide until closed) */}
      {isOpen && activeHeroSlide === 0 && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Ready to Level Up with UpShift"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 select-none"
          onClick={handleClose}
        >
          {/* Modal Container */}
          <div
            className="relative w-full max-w-[530px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-zinc-200/80 animate-in zoom-in-95 duration-250 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Brand Header Bar (Red Theme with Title & Close Button) */}
            <div className="bg-[#EE1C25] text-white px-5 sm:px-6 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-white">
                  READY TO LEVEL UP?
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close modal"
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition-all active:scale-95 focus:outline-none cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 bg-white">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                {/* Mascot / Avatar Badge */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-2xl bg-red-50/80 border border-red-100 p-2 flex items-center justify-center shadow-inner">
                  <Image
                    src="/mascot-hero.png"
                    alt="UpShift Mascot"
                    width={80}
                    height={80}
                    className="object-contain w-full h-full"
                    priority
                  />
                </div>

                {/* Text Content */}
                <div className="flex-1 text-center sm:text-left">
                  <span className="inline-block text-[#EE1C25] text-[10.5px] sm:text-[11px] font-black uppercase tracking-wider mb-1">
                    READY TO LEVEL UP?
                  </span>

                  <h4 className="text-xl sm:text-2xl font-black text-zinc-900 leading-snug tracking-tight">
                    You Know AI. Now Make It Work For You.
                  </h4>

                  <p className="text-xs sm:text-[13px] text-zinc-600 mt-2 leading-relaxed">
                    Build practical AI skills, create real proof of work, and unlock new earning opportunities through <span className="font-bold text-zinc-900">UpShift</span>.
                  </p>
                </div>
              </div>

              {/* Highlights Pill Row */}
              <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-zinc-100">
                <div className="bg-red-50/70 border border-red-100 rounded-xl py-2 px-1 text-center">
                  <span className="block text-[10px] sm:text-[11px] font-black text-[#EE1C25] tracking-tight">
                    PRACTICAL AI
                  </span>
                </div>
                <div className="bg-red-50/70 border border-red-100 rounded-xl py-2 px-1 text-center">
                  <span className="block text-[10px] sm:text-[11px] font-black text-[#EE1C25] tracking-tight">
                    PROOF OF WORK
                  </span>
                </div>
                <div className="bg-red-50/70 border border-red-100 rounded-xl py-2 px-1 text-center">
                  <span className="block text-[10px] sm:text-[11px] font-black text-[#EE1C25] tracking-tight">
                    EARNING OPPORTUNITIES
                  </span>
                </div>
              </div>

              {/* Action CTA Button */}
              <div className="mt-6 flex justify-end">
                <a
                  href={UPSHIFT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 bg-[#EE1C25] hover:bg-[#D3131B] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-[0_4px_16px_rgba(238,28,37,0.35)] hover:shadow-[0_6px_22px_rgba(238,28,37,0.5)] transition-all active:scale-95 cursor-pointer text-center"
                >
                  <span>GET STARTED</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Mascot Launcher Button (Available on Slide 0 when popup is closed) */}
      <div
        aria-hidden={activeHeroSlide === 1}
        className={`fixed bottom-[104px] right-8 z-[990] select-none pointer-events-auto max-sm:bottom-[98px] max-sm:right-5 transition-all duration-300 ${
          activeHeroSlide === 1
            ? "opacity-0 invisible pointer-events-none"
            : "opacity-100 visible"
        }`}
      >
        <button
          type="button"
          onClick={handleOpenManually}
          aria-label="Open UpShift Announcement"
          className="group relative w-14 h-14 max-sm:w-12 max-sm:h-12 bg-white rounded-full flex items-center justify-center border-2 border-red-500/30 hover:border-[#EE1C25] shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_32px_rgba(238,28,37,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#EE1C25] focus:ring-offset-2 overflow-visible cursor-pointer"
        >
          {!isOpen && (
            <span className="absolute -inset-1 rounded-full bg-red-500/15 animate-ping pointer-events-none opacity-40 duration-1000" />
          )}

          <div className="relative w-9 h-9 max-sm:w-8 max-sm:h-8 flex items-center justify-center rounded-full overflow-hidden">
            <Image
              src="/mascot-hero.png"
              alt="AI School Mascot Launcher"
              width={36}
              height={36}
              className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#EE1C25] border-2 border-white rounded-full shadow-sm" />
        </button>
      </div>
    </>
  );
}
