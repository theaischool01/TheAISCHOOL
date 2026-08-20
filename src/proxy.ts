import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_REGION,
  COOKIE_NAME,
  COOKIE_MAX_AGE,
  SUPPORTED_REGIONS,
  COUNTRY_MAP,
} from "@/config/siteConfig";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check if user is navigating directly to a region site (/in, /us, /ph or deep links under them)
  const regionMatch = pathname.match(/^\/(in|us|ph)(\/.*)?$/);
  if (regionMatch) {
    const region = regionMatch[1];
    const response = NextResponse.next();

    // Store or update the user's region preference cookie when they visit a regional page
    response.cookies.set(COOKIE_NAME, region, {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
    });

    return response;
  }

  // 2. Only perform geolocation redirection when hitting the root path "/"
  if (pathname === "/") {
    // Check for existing manual override cookie
    const cookieValue = request.cookies.get(COOKIE_NAME)?.value;
    if (cookieValue && (SUPPORTED_REGIONS as readonly string[]).includes(cookieValue)) {
      return NextResponse.redirect(new URL(`/${cookieValue}`, request.url));
    }

    // Geolocation detection via platform request headers / geo object
    const detectedCountry = (
      request.headers.get("x-vercel-ip-country") ||
      request.headers.get("cf-ipcountry") ||
      request.headers.get("cloudfront-viewer-country") ||
      request.headers.get("x-country-code") ||
      request.headers.get("x-geo-country") ||
      (request as any).geo?.country ||
      ""
    ).toUpperCase();

    const targetRegion = COUNTRY_MAP[detectedCountry] || DEFAULT_REGION;
    return NextResponse.redirect(new URL(`/${targetRegion}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files & Next.js internals
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
