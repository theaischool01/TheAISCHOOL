import React, { ComponentProps } from "react";
import Link from "next/link";

export type RegionPrefix = "in" | "us" | "ph";

/**
 * Normalizes an internal path by prepending the country prefix (/in, /us, /ph).
 * External URLs (http, https, mailto, tel), anchor hashes (#...), and already prefixed paths are preserved.
 */
export function getLocalizedPath(path: string, region: RegionPrefix | string): string {
  if (!path) return "/";

  // External links, mailto, tel, protocol-relative
  if (/^(https?:|mailto:|tel:|\/\/)/.test(path)) {
    return path;
  }

  // Pure anchor fragments (e.g., "#courses", "#register")
  if (path.startsWith("#")) {
    return path;
  }

  // Ensure path starts with slash
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  // If path already starts with /in/, /us/, /ph/ or is exactly /in, /us, /ph
  if (/^\/(in|us|ph)(\/|$)/.test(cleanPath)) {
    return cleanPath;
  }

  // Determine region code
  let regionCode = "in";
  if (region) {
    if (region === "us" || region.startsWith("/us")) regionCode = "us";
    else if (region === "ph" || region.startsWith("/ph")) regionCode = "ph";
    else if (region === "in" || region.startsWith("/in")) regionCode = "in";
    else {
      const firstSegment = region.replace(/^\//, "").split("/")[0];
      if (firstSegment === "ph" || firstSegment === "us" || firstSegment === "in") {
        regionCode = firstSegment;
      }
    }
  }

  return `/${regionCode}${cleanPath}`;
}

export type SiteLinkProps = ComponentProps<typeof Link> & {
  region: RegionPrefix | string;
};

export function SiteLink({ href, region, children, className, ...props }: SiteLinkProps) {
  const targetHref = typeof href === "string" ? href : href.toString();
  const localizedHref = getLocalizedPath(targetHref, region);
  return (
    <Link href={localizedHref} className={className} {...props}>
      {children}
    </Link>
  );
}
