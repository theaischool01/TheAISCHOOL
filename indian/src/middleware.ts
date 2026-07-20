import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Resolve supported regions and default region from env dynamically
  const supportedEnv = process.env.NEXT_PUBLIC_SUPPORTED_REGIONS || "in";
  const supportedRegions = supportedEnv.split(",").map((s) => s.trim().toLowerCase());
  const defaultRegion = (process.env.NEXT_PUBLIC_DEFAULT_REGION || "in").toLowerCase();

  // 1. Guard check: Redirect us/ph routes to the absolute production sites
  const firstSegment = pathname.split("/")[1]?.toLowerCase();
  if (["us", "ph"].includes(firstSegment)) {
    return NextResponse.redirect(`https://theaischool.co/${firstSegment}/`);
  }

  // 2. Only run geo-redirect logic for the root path exactly
  if (pathname !== "/") {
    return NextResponse.next();
  }

  // 3. Resolve preferred region
  // Priority: 1. Cookie, 2. GeoIP headers, 3. Browser language, 4. Default
  let detectedRegion = "";

  // A. Check preferred_region cookie
  const cookieRegion = request.cookies.get("preferred_region")?.value?.toLowerCase();
  if (cookieRegion && supportedRegions.includes(cookieRegion)) {
    detectedRegion = cookieRegion;
  }

  // B. Check Cloudflare or Hostinger proxy country headers
  if (!detectedRegion) {
    const cfCountry = request.headers.get("cf-ipcountry");
    const xCountry = request.headers.get("x-country-code") || request.headers.get("x-vercel-ip-country");
    const country = (cfCountry || xCountry || "").toLowerCase();

    if (supportedRegions.includes(country)) {
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
  if (!detectedRegion || !supportedRegions.includes(detectedRegion)) {
    detectedRegion = defaultRegion;
  }

  // 4. Perform redirect if the detected region is supported and not India (served at "/")
  if (detectedRegion !== "in" && supportedRegions.includes(detectedRegion)) {
    return NextResponse.redirect(`https://theaischool.co/${detectedRegion}/`);
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
