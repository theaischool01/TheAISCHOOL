import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Guard check: Redirect /us or /ph routes to absolute production URLs
  const firstSegment = pathname.split("/")[1]?.toLowerCase();
  if (["us", "ph"].includes(firstSegment)) {
    return NextResponse.redirect(`https://theaischool.co/${firstSegment}/`);
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
