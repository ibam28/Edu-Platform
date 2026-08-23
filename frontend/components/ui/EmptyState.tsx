"use client";

import type { ReactNode } from "react";
import { cn } from "./cn";
import { Heading } from "./Heading";
import { Text } from "./Text";

export interface EmptyStateProps {
  className?: string;
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({
  className,
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-strong bg-background-muted px-6 py-12 text-center",
        className,
      )}
    >
      {icon ? <div className="mb-1 text-subtle">{icon}</div> : null}
      <Heading level={3}>{title}</Heading>
      {description ? (
        <Text muted size="sm" className="max-w-md">
          {description}
        </Text>
      ) : null}
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
}
