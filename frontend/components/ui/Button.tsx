"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "./cn";
import { Spinner } from "./Spinner";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const baseClasses =
  "inline-flex select-none items-center justify-center gap-2 rounded-md font-medium transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary-600 text-white hover:bg-primary-700",
  secondary: "bg-primary-100 text-primary-on-tint hover:bg-primary-50",
  outline:
    "border border-strong bg-transparent text-foreground hover:bg-background-subtle",
  ghost: "bg-transparent text-foreground hover:bg-background-subtle",
  danger: "bg-danger text-white hover:opacity-90",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      className,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      >
        {loading ? <Spinner className="h-4 w-4" /> : null}
        {children}
      </button>
    );
  },
);
