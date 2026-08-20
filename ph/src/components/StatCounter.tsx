"use client";

import React, { useEffect, useState } from "react";

interface StatCounterProps {
  value: string;
}

export default function StatCounter({ value }: StatCounterProps) {
  // Extract number part vs suffix (e.g., "100s+" -> num: 100, suffix: "s+")
  const match = value.match(/^(\d+)(.*)$/);
  const targetNum = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!targetNum) return;
    let start = 0;
    const duration = 1600; // ms
    const stepTime = 20; // ms
    const steps = duration / stepTime;
    const increment = targetNum / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNum) {
        setCount(targetNum);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [targetNum]);

  if (!targetNum) return <span>{value}</span>;

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}
