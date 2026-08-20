"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

interface UnfinishedLoopLogoProps {
  containerRef?: React.RefObject<HTMLElement | null>;
}

export default function UnfinishedLoopLogo({ containerRef }: UnfinishedLoopLogoProps) {
  const logoRef = useRef<HTMLDivElement>(null);
  const [isSnapped, setIsSnapped] = useState(false);
  const [showSpark, setShowSpark] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Proximity & Gap Configuration
  const defaultGap = 20; // total px separation at rest (~10px left, ~10px right)
  const proximityRadius = 240; // px distance to trigger magnetic pull
  const snapThreshold = 45; // px distance to trigger snap moment

  // Motion value for gap distance
  const gapMotion = useMotionValue(defaultGap);
  const springGap = useSpring(gapMotion, {
    stiffness: 160,
    damping: 18,
    mass: 0.7,
  });

  // Scale pulse for the snap pop
  const logoScale = useMotionValue(1);
  const springScale = useSpring(logoScale, {
    stiffness: 380,
    damping: 22,
  });

  // Idle breathing drift (±2px, 4s ease loop)
  const driftMotion = useMotionValue(0);

  // Detect prefers-reduced-motion and touch device
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleMediaChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", handleMediaChange);

      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);

      return () => mediaQuery.removeEventListener("change", handleMediaChange);
    }
  }, []);

  // Idle breathing animation for resting state
  useEffect(() => {
    if (prefersReducedMotion) return;

    let startTime = performance.now();
    let animationFrameId: number;

    const animateDrift = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      // 4-second sine wave breathing loop (±2px)
      const value = Math.sin((elapsed * Math.PI * 2) / 4) * 2;
      driftMotion.set(value);
      animationFrameId = requestAnimationFrame(animateDrift);
    };

    animationFrameId = requestAnimationFrame(animateDrift);
    return () => cancelAnimationFrame(animationFrameId);
  }, [driftMotion, prefersReducedMotion]);

  // Trigger seam spark (soft radial white glow burst + scale pop)
  const triggerSnapSpark = useCallback(() => {
    setShowSpark(true);
    logoScale.set(1.035);
    setTimeout(() => logoScale.set(1), 120);
    setTimeout(() => setShowSpark(false), 280);
  }, [logoScale]);

  // Mobile / Auto-demonstration sequence on mount
  useEffect(() => {
    if (prefersReducedMotion) return;

    const timer = setTimeout(() => {
      gapMotion.set(0);
      setIsSnapped(true);
      triggerSnapSpark();

      // Release back gracefully after 1.4s
      setTimeout(() => {
        gapMotion.set(defaultGap);
        setIsSnapped(false);
      }, 1400);
    }, 1200);

    return () => clearTimeout(timer);
  }, [gapMotion, triggerSnapSpark, prefersReducedMotion, defaultGap]);

  // Cursor proximity tracking
  useEffect(() => {
    if (prefersReducedMotion) return;

    const parentElem = containerRef?.current || logoRef.current?.parentElement;
    if (!parentElem) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!logoRef.current) return;

      const rect = logoRef.current.getBoundingClientRect();
      // Center crossing point of logo (X ~49.8%, Y ~48.2%)
      const logoCenterX = rect.left + rect.width * 0.498;
      const logoCenterY = rect.top + rect.height * 0.482;

      const dx = e.clientX - logoCenterX;
      const dy = e.clientY - logoCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < snapThreshold) {
        if (!isSnapped) {
          setIsSnapped(true);
          triggerSnapSpark();
        }
        gapMotion.set(0);
      } else if (distance < proximityRadius) {
        setIsSnapped(false);
        // Critically damped spring interpolation
        const norm = (distance - snapThreshold) / (proximityRadius - snapThreshold);
        const interpolatedGap = norm * defaultGap;
        gapMotion.set(interpolatedGap);
      } else {
        if (isSnapped) setIsSnapped(false);
        gapMotion.set(defaultGap);
      }
    };

    const handleMouseLeave = () => {
      setIsSnapped(false);
      gapMotion.set(defaultGap);
    };

    parentElem.addEventListener("mousemove", handleMouseMove);
    parentElem.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parentElem.removeEventListener("mousemove", handleMouseMove);
      parentElem.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef, defaultGap, gapMotion, isSnapped, prefersReducedMotion, triggerSnapSpark]);

  // Touch tap handler for mobile
  const handleTouchTap = () => {
    if (prefersReducedMotion) return;
    if (isSnapped) {
      gapMotion.set(defaultGap);
      setIsSnapped(false);
    } else {
      gapMotion.set(0);
      setIsSnapped(true);
      triggerSnapSpark();
    }
  };

  // Convert spring gap value to horizontal translateX for Left and Right loops
  const leftX = useTransform(springGap, (g) => (prefersReducedMotion ? 0 : -g / 2));
  const rightX = useTransform(springGap, (g) => (prefersReducedMotion ? 0 : g / 2));

  // Independent counter-phase vertical idle drift
  const leftYFloat = useTransform(driftMotion, (d) => (prefersReducedMotion || isSnapped ? 0 : d));
  const rightYFloat = useTransform(driftMotion, (d) => (prefersReducedMotion || isSnapped ? 0 : -d));

  return (
    <motion.div
      ref={logoRef}
      style={{ scale: springScale }}
      onClick={isTouchDevice ? handleTouchTap : undefined}
      className="relative w-full max-w-[380px] sm:max-w-[440px] aspect-[1024/682] mx-auto flex items-center justify-center cursor-pointer select-none"
    >
      {/* Soft Ambient Radial Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/8 via-transparent to-red-600/8 rounded-full blur-3xl pointer-events-none" />

      {/* Snap Moment Soft Radial White Glow Burst */}
      {showSpark && (
        <motion.div
          initial={{ scale: 0.3, opacity: 0.8 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="absolute top-[48.2%] left-[49.8%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-radial from-white via-white/80 to-transparent shadow-[0_0_50px_rgba(255,255,255,1)] z-30 pointer-events-none"
        />
      )}

      {/* 
        LEFT LOOP LAYER
        Displays the left lobe of the source logo with exact original colors, gradients & gloss
      */}
      <motion.div
        style={{
          x: leftX,
          y: leftYFloat,
          clipPath: "polygon(0% 0%, 50.05% 0%, 50.05% 100%, 0% 100%)",
        }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <img
          src="/ph/ph-infinity-logo.png"
          alt="The AI School PH Infinity Logo Left Loop"
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* 
        RIGHT LOOP LAYER
        Displays the right lobe of the source logo with exact original colors, gradients & gloss
      */}
      <motion.div
        style={{
          x: rightX,
          y: rightYFloat,
          clipPath: "polygon(49.95% 0%, 100% 0%, 100% 100%, 49.95% 100%)",
        }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <img
          src="/ph/ph-infinity-logo.png"
          alt="The AI School PH Infinity Logo Right Loop"
          className="w-full h-full object-contain"
        />
      </motion.div>
    </motion.div>
  );
}
