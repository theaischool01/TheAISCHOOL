"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface RegionInfo {
  code: "ph" | "us" | "in";
  name: string;
  flagUrl: string;
  basePath: string;
}

export const REGIONS: Record<string, RegionInfo> = {
  ph: {
    code: "ph",
    name: "Philippines",
    flagUrl: "https://flagcdn.com/w40/ph.png",
    basePath: "/ph",
  },
  us: {
    code: "us",
    name: "United States",
    flagUrl: "https://flagcdn.com/w40/us.png",
    basePath: "/us",
  },
  in: {
    code: "in",
    name: "India",
    flagUrl: "https://flagcdn.com/w40/in.png",
    basePath: "/in",
  },
};

export default function RegionFlagSwitcher() {
  const pathname = usePathname();

  // Detect current active region prefix
  let currentRegionCode = "ph";
  if (pathname.startsWith("/us")) {
    currentRegionCode = "us";
  } else if (pathname.startsWith("/in")) {
    currentRegionCode = "in";
  } else if (pathname.startsWith("/ph")) {
    currentRegionCode = "ph";
  }

  const regionList: RegionInfo[] = [REGIONS.ph, REGIONS.us, REGIONS.in];

  return (
    <div className="flex items-center gap-2">
      {regionList.map((region, idx) => {
        const isActive = currentRegionCode === region.code;

        return (
          <React.Fragment key={region.code}>
            {idx > 0 && <span className="w-[1px] h-4 bg-neutral-200" />}

            <Link
              href={region.basePath}
              onClick={() => {
                document.cookie = `NEXT_REGION=${region.code}; path=/; max-age=31536000; SameSite=Lax`;
              }}
              title={`${region.name} (${region.code.toUpperCase()})`}
              className={`w-7 h-5 relative rounded overflow-hidden shadow-xs hover:scale-110 transition-transform cursor-pointer ${
                isActive
                  ? "opacity-100 ring-[#C1121C] ring-2"
                  : "opacity-75 hover:opacity-100"
              }`}
            >
              <img
                src={region.flagUrl}
                alt={`${region.name} Flag`}
                className="w-full h-full object-cover"
              />
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
}
