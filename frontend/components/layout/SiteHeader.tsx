"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/locale/LocaleProvider";
import { useAuth } from "@/components/auth/AuthProvider";
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

const accountMenuItems = [
  { href: "/dashboard", key: "dashboard" as const },
  { href: "/settings", key: "settings" as const },
];

export function SiteHeader() {
  const { locale, dictionary: t } = useLocale();
  const { status, user, logout } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  const authenticated = status === "authenticated";

  const path = pathname.replace(/^\/(id|en)(?=\/|$)/, "") || "/";

  const localizeHref = (href: string) =>
    href === "/" ? `/${locale}` : `/${locale}${href}`;

  const isActive = (href: string) => path === href;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setAccountOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

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

  const displayName =
    user?.display_name?.trim() || (user?.email?.split("@")[0] ?? t.nav.accountMenu);

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
            {authenticated ? (
              <Link
                href={localizeHref("/dashboard")}
                aria-current={isActive("/dashboard") ? "page" : undefined}
                className={linkClasses(isActive("/dashboard"))}
              >
                {t.nav.dashboard}
              </Link>
            ) : null}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <span aria-hidden="true" className="h-5 w-px bg-border" />
            {authenticated ? (
              <div className="relative" ref={accountRef}>
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={accountOpen}
                  onClick={() => setAccountOpen((open) => !open)}
                  className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium text-foreground transition-colors duration-fast hover:bg-background-subtle focus-visible:outline-none focus-visible:ring-2"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white"
                  >
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                  <span className="max-w-40 truncate">{displayName}</span>
                  <svg
                    aria-hidden="true"
                    className={cn(
                      "h-4 w-4 text-muted transition-transform duration-fast",
                      accountOpen && "rotate-180",
                    )}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {accountOpen ? (
                  <div
                    role="menu"
                    className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-lg border border-border bg-surface shadow-lg"
                  >
                    <div className="flex flex-col gap-0.5 border-b border-border px-4 py-3">
                      <span className="truncate text-sm font-medium text-foreground">
                        {displayName}
                      </span>
                      <span className="truncate text-xs text-muted">{user?.email}</span>
                    </div>
                    {accountMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={localizeHref(item.href)}
                        role="menuitem"
                        onClick={() => setAccountOpen(false)}
                        className="block px-4 py-2.5 text-sm text-muted transition-colors duration-fast hover:bg-background-subtle hover:text-foreground focus-visible:outline-none focus-visible:ring-2"
                      >
                        {t.nav[item.key]}
                      </Link>
                    ))}
                    <button
                      type="button"
                      role="menuitem"
                      onClick={logout}
                      className="block w-full px-4 py-2.5 text-left text-sm text-danger-700 transition-colors duration-fast hover:bg-danger-100 focus-visible:outline-none focus-visible:ring-2"
                    >
                      {t.nav.logout}
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
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
            )}
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
              {authenticated ? (
                <>
                  <Link
                    href={localizeHref("/dashboard")}
                    aria-current={isActive("/dashboard") ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={linkClasses(isActive("/dashboard"))}
                  >
                    {t.nav.dashboard}
                  </Link>
                  <Link
                    href={localizeHref("/settings")}
                    aria-current={isActive("/settings") ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={linkClasses(isActive("/settings"))}
                  >
                    {t.nav.settings}
                  </Link>
                </>
              ) : null}
            </nav>
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
              {authenticated ? (
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="inline-flex h-10 items-center justify-center rounded-md border border-strong bg-transparent px-4 text-sm font-medium text-foreground transition-colors duration-fast hover:bg-background-subtle focus-visible:outline-none focus-visible:ring-2"
                >
                  {t.nav.logout}
                </button>
              ) : (
                authItems.map((item) => (
                  <Link
                    key={item.href}
                    href={localizeHref(item.href)}
                    onClick={() => setMenuOpen(false)}
                    className={cn(authLinkClasses(item.variant), "justify-center")}
                  >
                    {t.nav[item.key]}
                  </Link>
                ))
              )}
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
