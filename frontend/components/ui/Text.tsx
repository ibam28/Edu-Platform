import type { ElementType, HTMLAttributes } from "react";
import { cn } from "./cn";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: "xs" | "sm" | "base" | "lg";
  muted?: boolean;
  subtle?: boolean;
  mono?: boolean;
}

const sizeClasses: Record<NonNullable<TextProps["size"]>, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
};

export function Text({
  as: Tag = "p",
  size = "base",
  muted,
  subtle,
  mono,
  className,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cn(
        sizeClasses[size],
        muted && "text-muted",
        subtle && "text-subtle",
        mono && "font-mono",
        className,
      )}
      {...props}
    />
  );
}
