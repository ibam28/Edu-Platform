import type { ElementType, HTMLAttributes } from "react";
import { cn } from "./cn";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends HTMLAttributes<HTMLElement> {
  level?: HeadingLevel;
  as?: ElementType;
}

const levelClasses: Record<HeadingLevel, string> = {
  1: "text-4xl font-bold tracking-tight sm:text-5xl",
  2: "text-3xl font-bold tracking-tight sm:text-4xl",
  3: "text-2xl font-semibold tracking-tight",
  4: "text-xl font-semibold",
  5: "text-lg font-semibold",
  6: "text-base font-semibold",
};

export function Heading({ level = 2, as, className, ...props }: HeadingProps) {
  const Tag = (as ?? `h${level}`) as ElementType;
  return <Tag className={cn(levelClasses[level], className)} {...props} />;
}
