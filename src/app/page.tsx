"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    let redirected = false;

    const doRedirect = (target: string) => {
      if (!redirected) {
        redirected = true;
        router.replace(target);
      }
    };

    // Hard maximum 2-second timeout for the entire detection process
    const timeoutId = setTimeout(() => {
      doRedirect("/in/");
    }, 2000);

    async function detectAndRedirect() {
      let countryCode = "";

      // 1. Primary Geo API: ipapi.co
      try {
        const controller = new AbortController();
        const primaryTimeout = setTimeout(() => controller.abort(), 1500);
        const res = await fetch("https://ipapi.co/json/", {
          signal: controller.signal,
          cache: "no-store",
        });
        clearTimeout(primaryTimeout);

        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.country_code === "string") {
            countryCode = data.country_code.toUpperCase();
          }
        }
      } catch {
        // Primary failed or timed out, proceed to fallback
      }

      // 2. Fallback Geo API: db-ip.com
      if (!countryCode) {
        try {
          const controller = new AbortController();
          const fallbackTimeout = setTimeout(() => controller.abort(), 1000);
          const res2 = await fetch("https://api.db-ip.com/v2/free/self", {
            signal: controller.signal,
            cache: "no-store",
          });
          clearTimeout(fallbackTimeout);

          if (res2.ok) {
            const data2 = await res2.json();
            if (data2 && typeof data2.countryCode === "string") {
              countryCode = data2.countryCode.toUpperCase();
            }
          }
        } catch {
          // Fallback failed
        }
      }

      clearTimeout(timeoutId);

      // 3. Map country code to region (IN -> /in/, US -> /us/, PH -> /ph/, all others/errors -> /in/)
      if (countryCode === "US") {
        doRedirect("/us/");
      } else if (countryCode === "PH") {
        doRedirect("/ph/");
      } else {
        doRedirect("/in/");
      }
    }

    detectAndRedirect();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      <p>Redirecting...</p>
    </div>
  );
}

