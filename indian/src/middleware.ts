import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Guard check: Redirect /us or /ph routes to absolute production URLs
  const firstSegment = pathname.split("/")[1]?.toLowerCase();
  if (["us", "ph"].includes(firstSegment)) {
    return NextResponse.redirect(`https://theaischool.co/${firstSegment}/`);
  }

  // 2. Handle /in prefix routes: internal rewrite to underlying App Router routes
  if (pathname === "/in" || pathname === "/in/") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.rewrite(url);
  }

  if (pathname.startsWith("/in/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/in/, "");
    return NextResponse.rewrite(url);
  }

  // 3. Redirect root or un-prefixed routes to /in
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = `/in${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  // Exclude _next/ (Next.js internals), static assets (images, fonts), favicon, sitemaps, robots, and API routes
  matcher: [
    "/((?!api|_next/static|_next/image|assets|images|mentors|favicon.ico|icon.svg|robots.txt|sitemap.xml).*)",
  ],
};
