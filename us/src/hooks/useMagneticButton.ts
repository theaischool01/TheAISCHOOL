"use client";

import { useState, useEffect, RefObject } from "react";
import { useReducedMotion } from "framer-motion";

interface MagneticOptions {
  maxDisplacement?: number;
  proximity?: number;
  lerpFactor?: number;
}

export function useMagneticButton(
  ref: RefObject<HTMLElement | null>,
  options: MagneticOptions = {}
) {
  const { maxDisplacement = 12, proximity = 90, lerpFactor = 0.15 } = options;
  const shouldReduceMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (shouldReduceMotion) return;
    const element = ref.current;
    if (!element) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const updatePosition = () => {
      // Linear interpolation (lerp) for smooth magnetic pull & release
      currentX += (targetX - currentX) * lerpFactor;
      currentY += (targetY - currentY) * lerpFactor;

      if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
        setPosition({ x: currentX, y: currentY });
        animationFrameId = requestAnimationFrame(updatePosition);
      } else {
        setPosition({ x: targetX, y: targetY });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return; // Disable magnetic pull on mobile
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance < proximity) {
        const pull = (1 - distance / proximity) * maxDisplacement;
        targetX = (dx / distance) * pull;
        targetY = (dy / distance) * pull;
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(updatePosition);
      } else if (targetX !== 0 || targetY !== 0) {
        targetX = 0;
        targetY = 0;
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [ref, maxDisplacement, proximity, lerpFactor, shouldReduceMotion]);

  return position;
}

export function triggerRipple(e: React.MouseEvent<HTMLElement>) {
  const button = e.currentTarget;
  const rect = button.getBoundingClientRect();
  const circle = document.createElement("span");
  const diameter = Math.max(rect.width, rect.height);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - rect.left - radius}px`;
  circle.style.top = `${e.clientY - rect.top - radius}px`;
  circle.classList.add(
    "absolute",
    "rounded-full",
    "bg-white/30",
    "pointer-events-none",
    "animate-ripple"
  );

  const existingRipple = button.getElementsByClassName("animate-ripple")[0];
  if (existingRipple) {
    existingRipple.remove();
  }

  button.appendChild(circle);
  setTimeout(() => circle.remove(), 450);
}
