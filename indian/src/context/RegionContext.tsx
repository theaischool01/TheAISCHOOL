"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { RegionConfig } from "@/config/regions";
import { HomeSection, HOME_LAYOUTS } from "@/config/homeLayouts";
import { getRegionConfig } from "@/lib/region";

interface RegionContextType {
  currentRegion: string;
  regionConfig: RegionConfig;
  layoutConfig: HomeSection[];
  setRegion: (region: string) => void;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export function RegionProvider({
  children,
  initialRegion = "in",
}: {
  children: React.ReactNode;
  initialRegion?: string;
}) {
  const [currentRegion, setCurrentRegionState] = useState(initialRegion);
  const [regionConfig, setRegionConfig] = useState<RegionConfig>(getRegionConfig(initialRegion));
  const [layoutConfig, setLayoutConfig] = useState<HomeSection[]>(HOME_LAYOUTS[initialRegion] || HOME_LAYOUTS.in);

  const setRegion = (region: string) => {
    const code = region.toLowerCase();
    setCurrentRegionState(code);
    setRegionConfig(getRegionConfig(code));
    setLayoutConfig(HOME_LAYOUTS[code] || HOME_LAYOUTS.in);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (path.startsWith("/us")) {
        setRegion("us");
      } else if (path.startsWith("/ph")) {
        setRegion("ph");
      }
    }
  }, []);

  return (
    <RegionContext.Provider value={{ currentRegion, regionConfig, layoutConfig, setRegion }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return context;
}
