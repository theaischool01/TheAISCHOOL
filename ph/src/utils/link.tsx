import React, { ComponentProps } from "react";
import Link from "next/link";
import { getLocalizedPath } from "@/utils/localizedLink";

export function phPath(path: string): string {
  return getLocalizedPath(path, "ph");
}

export type PhLinkProps = ComponentProps<typeof Link>;

export function PhLink({ href, children, className, ...props }: PhLinkProps) {
  const targetHref = typeof href === "string" ? href : href.toString();
  const localizedHref = phPath(targetHref);
  return (
    <Link href={localizedHref} className={className} {...props}>
      {children}
    </Link>
  );
}
