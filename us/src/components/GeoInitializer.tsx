"use client";

interface GeoInitializerProps {
  currentRegion?: "us" | "in" | "ph";
}

/**
 * GeoInitializer is retained for regional layouts but automatic secondary IP redirection
 * has been disabled to ensure routing decisions happen solely at the root `/` page.
 */
export default function GeoInitializer({ currentRegion = "us" }: GeoInitializerProps) {
  return null;
}

