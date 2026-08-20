import React, { ComponentProps } from "react";
import Link from "next/link";
import { getLocalizedPath } from "@/utils/localizedLink";

export function inPath(path: string): string {
  return getLocalizedPath(path, "in");
}

export type InLinkProps = ComponentProps<typeof Link>;

export function InLink({ href, children, className, ...props }: InLinkProps) {
  const targetHref = typeof href === "string" ? href : href.toString();
  const localizedHref = inPath(targetHref);
  return (
    <Link href={localizedHref} className={className} {...props}>
      {children}
    </Link>
  );
}
