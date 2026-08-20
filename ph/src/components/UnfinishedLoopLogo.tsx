"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface UnfinishedLoopLogoProps {
  containerRef?: React.RefObject<HTMLElement | null>;
}

export default function UnfinishedLoopLogo({ containerRef }: UnfinishedLoopLogoProps) {
  const logoRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [sweepKey, setSweepKey] = useState<number | null>(null);
  const [isEntranceDone, setIsEntranceDone] = useState(false);

  // Raw motion values for 3D cursor tilt
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawTranslateZ = useMotionValue(0);

  // Smooth physics-based spring interpolation
  const springConfig = { stiffness: 120, damping: 18, mass: 0.6 };
  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);
  const translateZ = useSpring(rawTranslateZ, springConfig);

  // Detect environment and reduced-motion preferences
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleMediaChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", handleMediaChange);

      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);

      // Complete entrance reveal phase after ~1050ms
      const timer = setTimeout(() => {
        setIsEntranceDone(true);
      }, 1050);

      return () => {
        mediaQuery.removeEventListener("change", handleMediaChange);
        clearTimeout(timer);
      };
    }
  }, []);

  // Handle cursor 3D perspective tilt
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion || isTouchDevice || !logoRef.current) return;

      const rect = logoRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized coordinates from -1 to 1
      const normalizedX = (e.clientX - centerX) / (rect.width / 2);
      const normalizedY = (e.clientY - centerY) / (rect.height / 2);

      const clampedX = Math.max(-1, Math.min(1, normalizedX));
      const clampedY = Math.max(-1, Math.min(1, normalizedY));

      // Maximum rotation: rotateX ±4deg, rotateY ±5deg
      rawRotateX.set(-clampedY * 4);
      rawRotateY.set(clampedX * 5);
      rawTranslateZ.set((1 - Math.hypot(clampedX, clampedY)) * 6);
    },
    [prefersReducedMotion, isTouchDevice, rawRotateX, rawRotateY, rawTranslateZ]
  );

  // Mouse leave handler - smooth spring back to neutral
  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion || isTouchDevice) return;
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawTranslateZ.set(0);
  }, [prefersReducedMotion, isTouchDevice, rawRotateX, rawRotateY, rawTranslateZ]);

  // Mouse enter handler - trigger light sweep ONCE per hover
  const handleMouseEnter = useCallback(() => {
    if (prefersReducedMotion || isTouchDevice) return;
    setSweepKey(Date.now());
  }, [prefersReducedMotion, isTouchDevice]);

  // Event listener binding to container or logo element
  useEffect(() => {
    if (prefersReducedMotion || isTouchDevice) return;

    const parentElem = containerRef?.current || logoRef.current;
    if (!parentElem) return;

    const onMove = (e: MouseEvent) => handleMouseMove(e);
    const onLeave = () => handleMouseLeave();
    const onEnter = () => handleMouseEnter();

    parentElem.addEventListener("mousemove", onMove);
    parentElem.addEventListener("mouseleave", onLeave);
    parentElem.addEventListener("mouseenter", onEnter);

    return () => {
      parentElem.removeEventListener("mousemove", onMove);
      parentElem.removeEventListener("mouseleave", onLeave);
      parentElem.removeEventListener("mouseenter", onEnter);
    };
  }, [containerRef, handleMouseMove, handleMouseLeave, handleMouseEnter, prefersReducedMotion, isTouchDevice]);

  return (
    <div
      ref={logoRef}
      className="relative w-full max-w-[380px] sm:max-w-[440px] aspect-[1024/682] mx-auto flex items-center justify-center select-none"
      style={{ perspective: 1000 }}
    >
      {/* Soft Ambient Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/8 via-transparent to-red-600/8 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Intact Logo 3D Container with Idle Float & Cursor Tilt */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center pointer-events-auto"
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          z: prefersReducedMotion ? 0 : translateZ,
          transformStyle: "preserve-3d",
        }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: [-3.5, 3.5, -3.5],
                rotate: [-0.5, 0.5, -0.5],
              }
        }
        transition={{
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <div className="relative w-full h-full overflow-hidden">
          {!prefersReducedMotion ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              {/* SVG Image with Path-Tracing Entrance Mask */}
              <svg
                viewBox="0 0 1024 682"
                className="w-full h-full object-contain pointer-events-none"
              >
                <defs>
                  <mask id="ph-infinity-entrance-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="682">
                    <rect width="1024" height="682" fill="black" />
                    {/* Infinity Path Stroke Reveal */}
                    <motion.path
                      d="M 512 341 C 412 180, 200 180, 200 341 C 200 502, 412 502, 512 341 C 612 180, 824 180, 824 341 C 824 502, 612 502, 512 341 Z"
                      fill="none"
                      stroke="white"
                      strokeWidth="260"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 1.0,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    />
                  </mask>
                </defs>

                <image
                  href="/ph/ph-infinity-logo.png"
                  width="1024"
                  height="682"
                  mask={isEntranceDone ? undefined : "url(#ph-infinity-entrance-mask)"}
                />
              </svg>

              {/* Philippine Sun Detail - Ambient subtle pulse */}
              <motion.div
                className="absolute top-[36%] left-[30%] w-[24%] h-[32%] rounded-full pointer-events-none z-10"
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: [1, 1.03, 1],
                        opacity: [0.85, 1, 0.85],
                        filter: ["brightness(1)", "brightness(1.04)", "brightness(1)"],
                      }
                }
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background: "radial-gradient(circle, rgba(255,215,0,0.06) 0%, transparent 70%)",
                  mixBlendMode: "soft-light",
                }}
              />

              {/* Hover Light Sweep - Diagonal glossy highlight (Runs ONCE per hover) */}
              {sweepKey !== null && !prefersReducedMotion && (
                <motion.div
                  key={sweepKey}
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "150%", opacity: [0, 0.5, 0.5, 0] }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.03) 40%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.03) 60%, transparent 75%)",
                    mixBlendMode: "overlay",
                  }}
                />
              )}
            </motion.div>
          ) : (
            /* Reduced Motion Fallback: Full Intact Static Logo */
            <img
              src="/ph/ph-infinity-logo.png"
              alt="The AI School PH Infinity Logo"
              className="w-full h-full object-contain pointer-events-none"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}

