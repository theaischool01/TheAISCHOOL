import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  const country = (
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("cloudfront-viewer-country") ||
    request.headers.get("x-country-code") ||
    ""
  ).toUpperCase();

  if (country) {
    response.cookies.set("detected_country", country, { path: "/", maxAge: 86400, sameSite: "lax" });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico).*)",
  ],
};
