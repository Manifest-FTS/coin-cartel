import { cloneElement, isValidElement } from "react";

import { cn } from "@/lib/cn";

/**
 * Minimal `asChild` slot: merges the component's props onto its single child
 * instead of rendering a wrapper element. Keeps the Button dependency-free.
 */
export function Slot({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) {
  if (!isValidElement(children)) return null;

  const child = children as React.ReactElement<Record<string, unknown>>;

  return cloneElement(child, {
    ...props,
    ...child.props,
    className: cn(
      props.className as string | undefined,
      child.props.className as string | undefined,
    ),
  });
}
