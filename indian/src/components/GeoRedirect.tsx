"use client";
import { useEffect } from "react";
export default function GeoRedirect() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const pathname = window.location.pathname;
    if (pathname !== "/" && pathname !== "/index.html" && pathname !== "") {
      return;
    }
    const userAgent = (navigator.userAgent || "").toLowerCase();
    const botPatterns = ["googlebot", "bingbot", "bot", "crawl", "spider"];
    const isBot = botPatterns.some((pattern) => userAgent.includes(pattern));
    if (isBot) return;
    fetch("https://ipapi.co/json/")
      .then((res) => {
        if (!res.ok) throw new Error("Geo API request failed");
        return res.json();
      })
      .then((data) => {
        const countryCode = (data && data.country_code ? data.country_code : "").toUpperCase();
        if (countryCode === "US") {
          window.location.replace("/us");
        } else if (countryCode === "PH") {
          window.location.replace("/ph");
        }
      })
      .catch((err) => {
        console.warn("[GeoRedirect] Lookup skipped or failed:", err);
      });
  }, []);
  return null;
}
