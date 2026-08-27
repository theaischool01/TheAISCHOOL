import React from "react";
import Link from "next/link";
import { getLocalizedPath } from "@/utils/localizedLink";

export function inPath(path: string): string {
  return getLocalizedPath(path, "in");
}

export type InLinkProps = any;

export function InLink( { href, children, className, ...props }: any) {
  const targetHref = typeof href === "string" ? href : (href?.toString() || "");
  const localizedHref = inPath(targetHref);
  return (
    <Link href={localizedHref as any} className={className} {...(props as any)}>
      {children}
    </Link>
  );
}
