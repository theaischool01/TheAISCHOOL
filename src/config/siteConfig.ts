// Central Site & Regional Multi-Country Configuration
// DEFAULT_REGION specifies which country site renders at the root '/' route.

export const DEFAULT_REGION: "ph" | "us" | "in" = "ph";
export const COOKIE_NAME = "NEXT_REGION";
export const COOKIE_MAX_AGE = 31536000; // 1 year in seconds
export const SUPPORTED_REGIONS = ["in", "us", "ph"] as const;
export const COUNTRY_MAP: Record<string, "ph" | "us" | "in"> = {
  IN: "in",
  US: "us",
  PH: "ph",
};

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
