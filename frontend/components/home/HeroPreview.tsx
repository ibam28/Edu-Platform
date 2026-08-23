"use client";

import { Badge } from "@/components/ui/Badge";
import type { HomeCopy } from "@/lib/i18n/dictionaries";

export interface HeroPreviewProps {
  copy: HomeCopy["heroVisual"];
}

export function HeroPreview({ copy }: HeroPreviewProps) {
  return (
    <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
      {/* Soft glow behind the composition */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-primary-100 via-background-muted to-accent-100/40 blur-2xl"
      />

      {/* Original illustration: layered learning-platform dashboard */}
      <img
        src="/assets/illustrations/hero/hero-learning-platform.svg"
        alt=""
        aria-hidden="true"
        width={720}
        height={560}
        loading="eager"
        className="animate-float h-auto w-full drop-shadow-xl"
        draggable={false}
      />

      {/* Floating accent chips */}
      <div className="animate-float absolute -left-2 -top-5 hidden sm:block">
        <Badge variant="accent" className="shadow-lg">
          {copy.verifiedBadge}
        </Badge>
      </div>
      <div className="animate-float-delayed absolute -bottom-4 -right-2 hidden sm:block">
        <Badge variant="primary" className="shadow-lg">
          {copy.assessmentValue}
        </Badge>
      </div>
    </div>
  );
}
