"use client";

import React from "react";
import { RegionProvider } from "@in/context/RegionContext";

export default function IndianLayout({ children }: { children: React.ReactNode }) {
  return (
    <RegionProvider initialRegion="in">
      {children}
    </RegionProvider>
  );
}
