"use client";

import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "./cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

const baseClasses =
  "flex h-10 w-full rounded-md border border-strong bg-surface px-3 py-2 text-sm text-foreground placeholder:text-subtle transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50";
const errorClasses = "border-danger focus-visible:ring-danger";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    hint,
    error,
    className,
    id,
    required,
    disabled,
    ...props
  },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const describedBy =
    [error ? errorId : null, hint && !error ? hintId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
          {required ? <span className="text-danger-700"> *</span> : null}
        </label>
      ) : null}
      <input
        ref={ref}
        id={inputId}
        required={required}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(baseClasses, error && errorClasses, className)}
        {...props}
      />
      {error ? (
        <p id={errorId} role="alert" className="text-xs text-danger-700">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
