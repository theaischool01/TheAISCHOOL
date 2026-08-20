"use client";

import { useEffect } from "react";
import { handleGeoRedirection } from "@us/utils/geoRedirection";

interface GeoInitializerProps {
  currentRegion?: "us" | "in" | "ph";
}

export default function GeoInitializer({ currentRegion = "us" }: GeoInitializerProps) {
  useEffect(() => {
    handleGeoRedirection(currentRegion);
  }, [currentRegion]);

  return null;
}
