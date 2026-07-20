"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TileProps {
  imageSrc: string;
  backColor: "red" | "white";
}

export default function Tile({ imageSrc, backColor }: TileProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [randomDelay, setRandomDelay] = useState(0);
  const [randomDuration, setRandomDuration] = useState(4);

  // Set up randomized timers for flips and ambient sways on mount
  useEffect(() => {
    // Randomize idle float variables
    setRandomDelay(Math.random() * 2);
    setRandomDuration(4 + Math.random() * 2);

    // Auto-flip loop with random interval (every 4 to 8 seconds)
    const triggerFlipLoop = () => {
      const nextTimeout = 4000 + Math.random() * 4000;
      return setTimeout(() => {
        setIsFlipped((prev) => !prev);
        timeoutId = triggerFlipLoop();
      }, nextTimeout);
    };

    let timeoutId = triggerFlipLoop();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <motion.div
      // Ambient floating/swaying animation
      animate={{
        y: [0, -6, 0],
        rotate: [-1, 1, -1],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="perspective-1000 w-full h-full will-change-transform drop-shadow-lg"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="w-full h-full relative transform-style-3d cursor-pointer"
        onClick={() => setIsFlipped((prev) => !prev)}
      >
        {/* Front Side (Opaque Image) */}
        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-md">
          <img
            src={imageSrc}
            alt="Student/Leader"
            className="w-full h-full object-cover select-none"
            loading="lazy"
          />
        </div>

        {/* Back Side (Solid color with brand colors - Red or White) */}
        <div
          className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl flex items-center justify-center border shadow-md ${backColor === "red"
              ? "bg-[#EE1C25] border-[#EE1C25]"
              : "bg-white border-neutral-200"
            }`}
        />
      </motion.div>
    </motion.div>
  );
}
