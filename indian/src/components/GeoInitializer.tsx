"use client";

import { useEffect } from "react";
import { handleGeoRedirection } from "@in/utils/geoRedirection";

interface GeoInitializerProps {
  currentRegion?: "us" | "in" | "ph";
}

export default function GeoInitializer({ currentRegion = "in" }: GeoInitializerProps) {
  useEffect(() => {
    handleGeoRedirection(currentRegion);
  }, [currentRegion]);

  return null;
}
