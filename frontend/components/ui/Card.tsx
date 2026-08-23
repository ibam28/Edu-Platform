"use client";

import type { HTMLAttributes } from "react";
import { cn } from "./cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  interactive?: boolean;
  padded?: boolean;
}

export function Card({
  elevated = false,
  interactive = false,
  padded = true,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface",
        padded && "p-6",
        elevated && "shadow-md",
        interactive && "transition-shadow duration-base hover:shadow-lg",
        className,
      )}
      {...props}
    />
  );
}
