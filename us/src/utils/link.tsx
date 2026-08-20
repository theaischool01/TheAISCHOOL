import React, { ComponentProps } from "react";
import Link from "next/link";
import { getLocalizedPath } from "@/utils/localizedLink";

export function usPath(path: string): string {
  return getLocalizedPath(path, "us");
}

export type UsLinkProps = ComponentProps<typeof Link>;

export function UsLink({ href, children, className, ...props }: UsLinkProps) {
  const targetHref = typeof href === "string" ? href : href.toString();
  const localizedHref = usPath(targetHref);
  return (
    <Link href={localizedHref} className={className} {...props}>
      {children}
    </Link>
  );
}
