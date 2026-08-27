import React from "react";
import Link from "next/link";
import { getLocalizedPath } from "@/utils/localizedLink";

export function phPath(path: string): string {
  return getLocalizedPath(path, "ph");
}

export type PhLinkProps = any;

export function PhLink( { href, children, className, ...props }: any) {
  const targetHref = typeof href === "string" ? href : (href?.toString() || "");
  const localizedHref = phPath(targetHref);
  return (
    <Link href={localizedHref as any} className={className} {...(props as any)}>
      {children}
    </Link>
  );
}

export const InLink = PhLink;
export const inPath = phPath;
