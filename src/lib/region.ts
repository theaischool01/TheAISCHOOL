import { REGIONS, RegionConfig } from "@/config/regions";

const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "in";

export function getSupportedRegions(): string[] {
  const envVal = process.env.NEXT_PUBLIC_SUPPORTED_REGIONS;
  if (envVal) {
    return envVal.split(",").map((s) => s.trim().toLowerCase());
  }
  return ["in", "us", "ph"];
}

export function getRegionConfig(code?: string): RegionConfig {
  const targetCode = code?.toLowerCase() || DEFAULT_REGION;
  return REGIONS[targetCode] || REGIONS[DEFAULT_REGION];
}

export function getCurrentCurrency(code?: string): string {
  return getRegionConfig(code).currency;
}

export function getCurrentPhone(code?: string): string {
  return getRegionConfig(code).phone;
}

export function getCurrentEmail(code?: string): string {
  return getRegionConfig(code).email;
}

export function isIndia(code?: string): boolean {
  const c = code?.toLowerCase() || DEFAULT_REGION;
  return c === "in";
}

export function isUS(code?: string): boolean {
  const c = code?.toLowerCase() || DEFAULT_REGION;
  return c === "us";
}

export function isPH(code?: string): boolean {
  const c = code?.toLowerCase() || DEFAULT_REGION;
  return c === "ph";
}
