"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

export type AlertVariant = "error" | "warning" | "success" | "info";

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: AlertVariant;
  title?: ReactNode;
}

const variantClasses: Record<AlertVariant, string> = {
  error: "border-danger bg-danger-100 text-danger-700",
  warning: "border-warning bg-warning-100 text-warning-700",
  success: "border-success bg-success-100 text-success-700",
  info: "border-info bg-info-100 text-info-700",
};

const roleByVariant: Record<AlertVariant, "alert" | "status"> = {
  error: "alert",
  warning: "alert",
  success: "status",
  info: "status",
};

export function Alert({
  variant = "error",
  title,
  role,
  className,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      role={role ?? roleByVariant[variant]}
      className={cn(
        "rounded-md border p-4",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {title ? <p className="text-sm font-semibold">{title}</p> : null}
      {children ? <div className="mt-1 text-sm">{children}</div> : null}
    </div>
  );
}
