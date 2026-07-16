import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_REGIONS = ["in", "us", "ph"];
const DEFAULT_REGION = "in";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // 1. Only run redirect logic for the root path exactly
  if (pathname !== "/") {
    return NextResponse.next();
  }

  // 2. Resolve preferred region
  // Priority: 1. Cookie, 2. GeoIP headers, 3. Browser language, 4. Default India
  let detectedRegion = "";

  // A. Check preferred_region cookie
  const cookieRegion = request.cookies.get("preferred_region")?.value;
  if (cookieRegion && SUPPORTED_REGIONS.includes(cookieRegion.toLowerCase())) {
    detectedRegion = cookieRegion.toLowerCase();
  }

  // B. Check Cloudflare or Hostinger proxy country headers
  if (!detectedRegion) {
    const cfCountry = request.headers.get("cf-ipcountry");
    const xCountry = request.headers.get("x-country-code") || request.headers.get("x-vercel-ip-country");
    const country = (cfCountry || xCountry || "").toLowerCase();

    if (SUPPORTED_REGIONS.includes(country)) {
      detectedRegion = country;
    }
  }

  // C. Check browser Accept-Language header
  if (!detectedRegion) {
    const acceptLanguage = request.headers.get("accept-language") || "";
    if (acceptLanguage.includes("en-US") || acceptLanguage.includes("en-us")) {
      detectedRegion = "us";
    } else if (acceptLanguage.includes("en-PH") || acceptLanguage.includes("en-ph")) {
      detectedRegion = "ph";
    }
  }

  // D. Fallback to default
  if (!detectedRegion) {
    detectedRegion = DEFAULT_REGION;
  }

  // 3. Perform redirect if the detected region is not India (since India is served at "/")
  if (detectedRegion !== "in") {
    url.pathname = `/${detectedRegion}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Exclude _next/ (Next.js internals), static assets (images, fonts), favicon, sitemaps, robots, and API routes
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - assets (public asset files)
     * - images (public image files)
     * - mentors (public mentor images)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - sitemap.xml (sitemap file)
     */
    "/((?!api|_next/static|_next/image|assets|images|mentors|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
