"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/locale/LocaleProvider";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Container } from "@/components/ui/Container";
import { cn } from "@/components/ui/cn";

const navItems = [
  { href: "/", key: "home" as const },
  { href: "/learning-path", key: "learningPath" as const },
  { href: "/vision", key: "vision" as const },
];

const authItems = [
  { href: "/login", key: "login" as const, variant: "outline" as const },
  { href: "/register", key: "register" as const, variant: "primary" as const },
];

export function SiteHeader() {
  const { locale, dictionary: t } = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const path = pathname.replace(/^\/(id|en)(?=\/|$)/, "") || "/";

  const localizeHref = (href: string) =>
    href === "/" ? `/${locale}` : `/${locale}${href}`;

  const isActive = (href: string) => path === href;

  const linkClasses = (active: boolean) =>
    cn(
      "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2",
      active
        ? "text-foreground"
        : "text-muted hover:bg-background-subtle hover:text-foreground",
    );

  const authLinkClasses = (variant: "outline" | "primary") =>
    cn(
      "inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2",
      variant === "primary"
        ? "bg-primary-600 text-white hover:bg-primary-700"
        : "border border-strong bg-transparent text-foreground hover:bg-background-subtle",
    );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href={localizeHref("/")}
            className="flex items-center gap-2 rounded-md font-semibold focus-visible:outline-none focus-visible:ring-2"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary-600 text-sm font-bold text-white">
              B
            </span>
            <span className="hidden text-base sm:inline">{t.brand.name}</span>
          </Link>

          <nav
            aria-label={t.navAccessibility.primaryLabel}
            className="hidden items-center gap-1 md:flex"
          >
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={localizeHref(item.href)}
                  aria-current={active ? "page" : undefined}
                  className={linkClasses(active)}
                >
                  {t.nav[item.key]}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <span aria-hidden="true" className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2">
              {authItems.map((item) => (
                <Link
                  key={item.href}
                  href={localizeHref(item.href)}
                  className={authLinkClasses(item.variant)}
                >
                  {t.nav[item.key]}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors duration-fast hover:bg-background-subtle focus-visible:outline-none focus-visible:ring-2"
            >
              <span className="sr-only">
                {menuOpen ? t.navAccessibility.closeMenu : t.navAccessibility.openMenu}
              </span>
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {menuOpen ? (
                  <path d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {menuOpen ? (
        <div id="mobile-nav" className="border-t border-border bg-background md:hidden">
          <Container className="flex flex-col gap-1 py-3">
            <nav aria-label={t.navAccessibility.mobileLabel} className="flex flex-col gap-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={localizeHref(item.href)}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={linkClasses(active)}
                  >
                    {t.nav[item.key]}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
              {authItems.map((item) => (
                <Link
                  key={item.href}
                  href={localizeHref(item.href)}
                  onClick={() => setMenuOpen(false)}
                  className={cn(authLinkClasses(item.variant), "justify-center")}
                >
                  {t.nav[item.key]}
                </Link>
              ))}
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
