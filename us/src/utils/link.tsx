import React from "react";
import Link from "next/link";
import { getLocalizedPath } from "@/utils/localizedLink";

export function usPath(path: string): string {
  return getLocalizedPath(path, "us");
}

export type UsLinkProps = any;

export function UsLink( { href, children, className, ...props }: any) {
  const targetHref = typeof href === "string" ? href : (href?.toString() || "");
  const localizedHref = usPath(targetHref);
  return (
    <Link href={localizedHref as any} className={className} {...(props as any)}>
      {children}
    </Link>
  );
}

export const InLink = UsLink;
export const inPath = usPath;
