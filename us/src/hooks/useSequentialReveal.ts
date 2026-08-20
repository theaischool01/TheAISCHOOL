"use client";

import { useState, useEffect, RefObject } from "react";
import { useReducedMotion } from "framer-motion";

export function useSequentialReveal(
  containerRef: RefObject<HTMLElement | null>,
  itemCount: number,
  options: { staggerMs?: number; threshold?: number } = {}
) {
  const { staggerMs = 140, threshold = 0.25 } = options;
  const shouldReduceMotion = useReducedMotion();
  const [visibleIndices, setVisibleIndices] = useState<boolean[]>(
    Array(itemCount).fill(shouldReduceMotion ? true : false)
  );

  useEffect(() => {
    if (shouldReduceMotion) {
      setVisibleIndices(Array(itemCount).fill(true));
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Stagger reveal of each item index left to right
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleIndices((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * staggerMs);
          }
          observer.unobserve(container);
        }
      },
      { threshold }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [containerRef, itemCount, staggerMs, threshold, shouldReduceMotion]);

  return visibleIndices;
}
