"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { useLocale, useTranslations } from "@/components/locale/LocaleProvider";
import { cn } from "@/components/ui/cn";

const shortLabels: Record<Locale, string> = {
  id: "ID",
  en: "EN",
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale } = useLocale();
  const t = useTranslations();
  const pathname = usePathname();

  const localizedPath = (next: Locale) =>
    pathname.replace(/^\/(id|en)/, `/${next}`);

  return (
    <div
      role="group"
      aria-label={t.languageSwitcher.label}
      className={cn("inline-flex items-center gap-0.5", className)}
    >
      {locales.map((item) => {
        const active = locale === item;
        return (
          <Link
            key={item}
            href={localizedPath(item)}
            aria-current={active ? "true" : undefined}
            className={cn(
              "inline-flex h-8 items-center rounded-md px-2.5 text-sm font-medium transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2",
              active
                ? "bg-primary-100 text-primary-on-tint"
                : "text-muted hover:bg-background-subtle hover:text-foreground",
            )}
          >
            {shortLabels[item]}
          </Link>
        );
      })}
    </div>
  );
}
