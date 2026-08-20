// Comprehensive list of North, Central, South America & LATAM / Caribbean country codes
export const AMERICAS_LATAM_COUNTRIES = new Set([
  // North America
  "US", // United States
  "CA", // Canada
  "MX", // Mexico

  // Central America
  "BZ", // Belize
  "CR", // Costa Rica
  "SV", // El Salvador
  "GT", // Guatemala
  "HN", // Honduras
  "NI", // Nicaragua
  "PA", // Panama

  // Caribbean
  "AG", // Antigua and Barbuda
  "BS", // Bahamas
  "BB", // Barbados
  "CU", // Cuba
  "DM", // Dominica
  "DO", // Dominican Republic
  "GD", // Grenada
  "HT", // Haiti
  "JM", // Jamaica
  "KN", // Saint Kitts and Nevis
  "LC", // Saint Lucia
  "VC", // Saint Vincent and the Grenadines
  "TT", // Trinidad and Tobago
  "PR", // Puerto Rico
  "AW", // Aruba
  "CW", // Curaçao
  "SX", // Sint Maarten
  "AI", // Anguilla
  "BM", // Bermuda
  "VG", // British Virgin Islands
  "VI", // US Virgin Islands
  "KY", // Cayman Islands
  "TC", // Turks and Caicos Islands
  "GP", // Guadeloupe
  "MQ", // Martinique

  // South America
  "AR", // Argentina
  "BO", // Bolivia
  "BR", // Brazil
  "CL", // Chile
  "CO", // Colombia
  "EC", // Ecuador
  "GY", // Guyana
  "PY", // Paraguay
  "PE", // Peru
  "SR", // Suriname
  "UY", // Uruguay
  "VE", // Venezuela
  "GF", // French Guiana
  "FK", // Falkland Islands
]);

export const OVERRIDE_COOKIE_NAMES = ["preferred_region", "user_selected_region"];
export const DETECTED_COUNTRY_COOKIE = "detected_country";

/**
 * Check if current execution environment is localhost, 127.0.0.1, or non-production dev server
 */
export function isLocalOrDevEnvironment(): boolean {
  if (typeof window === "undefined") return false;

  const hostname = window.location.hostname;
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal") ||
    process.env.NODE_ENV === "development"
  );
}

/**
 * Check URL query parameters for dev testing simulation (e.g., ?region=us or ?region=in or ?region=ph)
 */
export function checkUrlRegionOverride(): string | null {
  if (typeof window === "undefined") return null;

  try {
    const params = new URLSearchParams(window.location.search);
    const regionParam = params.get("region") || params.get("geo");
    if (regionParam) {
      const normalized = regionParam.toLowerCase();
      if (normalized === "us" || normalized === "in" || normalized === "ph") {
        setManualRegionPreference(normalized as "us" | "in" | "ph");
        return normalized;
      }
    }
  } catch (e) {
    // Ignore URL parsing errors
  }

  return null;
}

/**
 * Save user's manual region selection preference across cookies & localStorage
 */
export function setManualRegionPreference(regionCode: "us" | "in" | "ph") {
  if (typeof window === "undefined") return;

  const maxAge = 2592000; // 30 days
  OVERRIDE_COOKIE_NAMES.forEach((name) => {
    document.cookie = `${name}=${regionCode}; path=/; max-age=${maxAge}; SameSite=Lax`;
  });

  try {
    localStorage.setItem("user_selected_region", regionCode);
    localStorage.setItem("preferred_region", regionCode);
  } catch (e) {
    // Ignore storage restrictions
  }
}

/**
 * Get manual override preference if saved by user
 */
export function getManualRegionPreference(): string | null {
  if (typeof window === "undefined") return null;

  // 1. Check cookies
  for (const name of OVERRIDE_COOKIE_NAMES) {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    if (match && match[1]) {
      return match[1].toLowerCase();
    }
  }

  // 2. Check localStorage
  try {
    const localPref = localStorage.getItem("user_selected_region") || localStorage.getItem("preferred_region");
    if (localPref) return localPref.toLowerCase();
  } catch (e) {
    // Ignore storage restrictions
  }

  return null;
}

/**
 * Map country code to site region code ("us" | "in" | "ph")
 */
export function getRegionForCountry(countryCode: string): "us" | "in" | "ph" {
  const code = (countryCode || "").toUpperCase();

  if (code === "IN") {
    return "in";
  }
  if (code === "PH") {
    return "ph";
  }
  if (AMERICAS_LATAM_COUNTRIES.has(code) || code === "US") {
    return "us";
  }

  // Fallback behavior: Default to US version for all unmapped countries
  return "us";
}

/**
 * Detect visitor country from cookie header or client-side IP Geolocation API
 */
export async function detectVisitorCountry(): Promise<string> {
  if (typeof window === "undefined") return "US";

  // Check detected_country cookie from CDN/middleware
  const match = document.cookie.match(new RegExp(`(?:^|; )${DETECTED_COUNTRY_COOKIE}=([^;]*)`));
  if (match && match[1]) {
    return match[1].toUpperCase();
  }

  // Client-side IP Geolocation API
  try {
    const res = await fetch("https://ipapi.co/json/", { cache: "force-cache" });
    if (res.ok) {
      const data = await res.json();
      if (data && data.country_code) {
        return data.country_code.toUpperCase();
      }
    }
  } catch (err) {
    try {
      const res2 = await fetch("https://api.db-ip.com/v2/free/self", { cache: "force-cache" });
      if (res2.ok) {
        const data2 = await res2.json();
        if (data2 && data2.countryCode) {
          return data2.countryCode.toUpperCase();
        }
      }
    } catch (err2) {
      // Ignore
    }
  }

  // Default fallback if detection fails
  return "US";
}

/**
 * Execute automatic geo-redirection logic
 */
export async function handleGeoRedirection(currentRegion: "us" | "in" | "ph" = "us") {
  if (typeof window === "undefined") return;

  // 1. Check for URL query parameter override (?region=us or ?region=in or ?region=ph)
  const urlOverride = checkUrlRegionOverride();
  if (urlOverride) {
    // Manual testing override set - do not auto-redirect
    return;
  }

  // 2. DISABLE auto-redirect entirely when running on localhost / local dev environment!
  if (isLocalOrDevEnvironment()) {
    return;
  }

  // 3. Only run domain redirect logic on the live production domain
  const isProductionDomain = window.location.hostname.endsWith("theaischool.co");
  if (!isProductionDomain) {
    return;
  }

  // 4. Check if user has an explicit manual region override
  const manualPref = getManualRegionPreference();
  if (manualPref) {
    // Respect manual choice - do not auto-redirect
    return;
  }

  // 5. Detect country code
  const countryCode = await detectVisitorCountry();

  // 6. Determine target region code
  const targetRegion = getRegionForCountry(countryCode);

  // 7. Redirect if visitor is on the wrong regional version in production
  if (targetRegion !== currentRegion) {
    if (targetRegion === "us" && currentRegion !== "us") {
      window.location.href = "https://theaischool.co/us/";
    } else if (targetRegion === "in" && currentRegion !== "in") {
      window.location.href = "https://theaischool.co/in/";
    } else if (targetRegion === "ph" && currentRegion !== "ph") {
      window.location.href = "https://theaischool.co/ph/";
    }
  }
}
