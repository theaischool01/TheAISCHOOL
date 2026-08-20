import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import {
  DEFAULT_REGION,
  COOKIE_NAME,
  SUPPORTED_REGIONS,
  COUNTRY_MAP,
} from "@/config/siteConfig";

export default async function RootPage() {
  const cookieStore = await cookies();
  const savedRegion = cookieStore.get(COOKIE_NAME)?.value;

  if (savedRegion && (SUPPORTED_REGIONS as readonly string[]).includes(savedRegion)) {
    redirect(`/${savedRegion}`);
  }

  const reqHeaders = await headers();
  const countryHeader = (
    reqHeaders.get("x-vercel-ip-country") ||
    reqHeaders.get("cf-ipcountry") ||
    reqHeaders.get("x-country-code") ||
    reqHeaders.get("x-geo-country") ||
    ""
  ).toUpperCase();

  const targetRegion = COUNTRY_MAP[countryHeader] || DEFAULT_REGION;
  redirect(`/${targetRegion}`);
}
