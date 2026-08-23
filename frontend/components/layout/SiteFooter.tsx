"use client";

import Link from "next/link";
import { useLocale } from "@/components/locale/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Text";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type FooterLink = {
  href: string;
  label: (t: Dictionary) => string;
};

type FooterColumn = {
  titleKey: "platformTitle" | "learningTitle" | "projectTitle" | "legalTitle";
  links: FooterLink[];
};

const columns: FooterColumn[] = [
  {
    titleKey: "platformTitle",
    links: [
      { href: "/", label: (t) => t.footer.platform.home },
      { href: "/learning-path", label: (t) => t.footer.platform.learningPath },
      { href: "/vision", label: (t) => t.footer.platform.vision },
    ],
  },
  {
    titleKey: "learningTitle",
    links: [
      { href: "/learning-path/stage-0", label: (t) => t.footer.learning.stage0 },
      {
        href: "/learning-path/assessment/1",
        label: (t) => t.footer.learning.demoAssessment,
      },
    ],
  },
  {
    titleKey: "projectTitle",
    links: [{ href: "/contact", label: (t) => t.footer.project.contact }],
  },
  {
    titleKey: "legalTitle",
    links: [
      { href: "/privacy", label: (t) => t.footer.legal.privacy },
      { href: "/terms", label: (t) => t.footer.legal.terms },
    ],
  },
];

const linkClasses =
  "rounded-md text-sm text-muted transition-colors duration-fast hover:text-foreground focus-visible:outline-none focus-visible:ring-2";

export function SiteFooter() {
  const { locale, dictionary: t } = useLocale();
  const year = new Date().getFullYear();

  const localizeHref = (href: string) => `/${locale}${href}`;

  return (
    <footer className="border-t border-border bg-background-muted">
      <Container>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col gap-3">
            <span className="flex items-center gap-2 font-semibold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary-600 text-sm font-bold text-white">
                B
              </span>
              <span className="text-base">{t.brand.name}</span>
            </span>
            <Text muted size="sm" className="max-w-xs">
              {t.footer.tagline}
            </Text>
          </div>

          {columns.map((column) => (
            <nav
              key={column.titleKey}
              aria-label={t.footer[column.titleKey]}
              className="flex flex-col gap-3"
            >
              <Text size="sm" className="font-semibold">
                {t.footer[column.titleKey]}
              </Text>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={localizeHref(link.href)} className={linkClasses}>
                      {link.label(t)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
          <Text size="sm" subtle>
            {t.footer.prototypeNote}
          </Text>
          <Text size="sm" subtle>
            © {year} {t.brand.name}. {t.footer.rights}
          </Text>
        </div>
      </Container>
    </footer>
  );
}
