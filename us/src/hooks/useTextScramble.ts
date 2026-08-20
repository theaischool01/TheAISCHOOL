"use client";

import { useState, useEffect, useRef, RefObject } from "react";
import { useReducedMotion } from "framer-motion";

const CHAR_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$@&*";

export function useTextScramble(
  targetText: string,
  elementRef: RefObject<HTMLElement | null>,
  options: { duration?: number; speed?: number; threshold?: number } = {}
) {
  const { duration = 1000, speed = 35, threshold = 0.3 } = options;
  const shouldReduceMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState(targetText);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(targetText);
      return;
    }

    const element = elementRef.current;
    if (!element || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let frame = 0;
          const totalFrames = Math.floor(duration / speed);
          const chars = targetText.split("");

          const interval = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const revealedLength = Math.floor(progress * chars.length);

            const scrambled = chars
              .map((char, idx) => {
                if (char === " " || char === "\n") return char;
                if (idx < revealedLength) return char;
                return CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)];
              })
              .join("");

            setDisplayText(scrambled);

            if (frame >= totalFrames) {
              clearInterval(interval);
              setDisplayText(targetText);
            }
          }, speed);

          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [targetText, elementRef, duration, speed, threshold, shouldReduceMotion, hasAnimated]);

  return displayText;
}
