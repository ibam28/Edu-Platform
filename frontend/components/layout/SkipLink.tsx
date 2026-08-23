"use client";

import { useTranslations } from "@/components/locale/LocaleProvider";

export function SkipLink() {
  const t = useTranslations();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
    >
      {t.skipLink}
    </a>
  );
}
