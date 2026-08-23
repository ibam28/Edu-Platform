"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Spinner } from "@/components/ui/Spinner";
import { Text } from "@/components/ui/Text";
import { clearSession, getSession } from "@/lib/auth/session";
import type { AdminDashboardCopy } from "@/lib/i18n/dictionaries";

const primaryLinkClasses =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary-600 px-6 text-base font-medium text-white transition-colors duration-fast hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const cardLinkClasses =
  "inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export interface AdminDashboardClientProps {
  copy: AdminDashboardCopy;
  locale: string;
}

interface AdminStats {
  users?: number;
  stage0_participants?: number;
  assessment_attempts?: number;
}

type AuthState =
  | { status: "loading" }
  | { status: "unauthorized" }
  | { status: "error" }
  | { status: "authenticated"; email: string };

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function AdminDashboardClient({
  copy,
  locale,
}: AdminDashboardClientProps) {
  const [auth, setAuth] = useState<AuthState>({ status: "loading" });
  const [stats, setStats] = useState<AdminStats | null>(null);

  const base = `/${locale}`;
  const loginHref = `${base}/login`;

  useEffect(() => {
    const session = getSession();
    if (!session) {
      setAuth({ status: "unauthorized" });
      return;
    }
    let cancelled = false;
    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${session.token}` },
    })
      .then(async (response) => {
        if (cancelled) {
          return;
        }
        if (response.ok) {
          const data = (await response.json()) as { email: string; role: string };
          if (data.role !== "admin") {
            setAuth({ status: "unauthorized" });
            return;
          }
          setAuth({ status: "authenticated", email: data.email });
          fetch("/api/admin/overview", {
            headers: { Authorization: `Bearer ${session.token}` },
          })
            .then(async (overviewResponse) => {
              if (!cancelled && overviewResponse.ok) {
                setStats((await overviewResponse.json()) as AdminStats);
              }
            })
            .catch(() => {
              if (!cancelled) {
                setStats(null);
              }
            });
        } else if (response.status === 401) {
          clearSession();
          setAuth({ status: "unauthorized" });
        } else {
          setAuth({ status: "error" });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAuth({ status: "error" });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogout = () => {
    clearSession();
    window.location.assign(loginHref);
  };

  const statCards = [
    {
      key: "users" as const,
      value: stats?.users,
    },
    {
      key: "stage0" as const,
      value: stats?.stage0_participants,
    },
    {
      key: "attempts" as const,
      value: stats?.assessment_attempts,
    },
  ];

  return (
    <div className="flex flex-col">
      <section aria-labelledby="admin-hero-heading">
        <Container className="flex max-w-3xl flex-col items-start gap-5 py-12 sm:py-20">
          <Badge variant="accent">{copy.hero.eyebrow}</Badge>
          {auth.status === "loading" ? (
            <div className="flex items-center gap-3" role="status">
              <Spinner className="h-5 w-5 text-primary-600" />
              <Text muted>{copy.auth.loading}</Text>
            </div>
          ) : (
            <>
              <Heading level={1} id="admin-hero-heading">
                {copy.hero.title}
              </Heading>
              {auth.status === "authenticated" ? (
                <div className="flex flex-wrap items-center gap-2">
                  <Text className="font-medium text-foreground">{auth.email}</Text>
                  <Badge variant="primary">{copy.hero.adminRole}</Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                  >
                    {copy.hero.logoutLabel}
                  </Button>
                </div>
              ) : null}
              <Text size="lg" muted>
                {copy.hero.description}
              </Text>
              {auth.status === "unauthorized" ? (
                <>
                  <Alert variant="warning" title={copy.auth.unauthorizedTitle}>
                    {copy.auth.unauthorizedDescription}
                  </Alert>
                  <Link href={loginHref} className={primaryLinkClasses}>
                    {copy.auth.loginLabel}
                  </Link>
                </>
              ) : null}
              {auth.status === "error" ? (
                <Alert variant="error" title={copy.auth.errorTitle}>
                  {copy.auth.errorDescription}
                </Alert>
              ) : null}
            </>
          )}
        </Container>
      </section>

      <section
        aria-labelledby="admin-stats-heading"
        className="bg-background-muted"
      >
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="flex max-w-3xl flex-col gap-3">
            <Heading level={2} id="admin-stats-heading">
              {copy.stats.title}
            </Heading>
            <Text muted>{copy.stats.description}</Text>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {statCards.map((card) => (
              <Card key={card.key} className="flex flex-col gap-2">
                <Text size="sm" className="font-semibold text-primary-on-tint">
                  {
                    {
                      users: copy.stats.users.label,
                      stage0: copy.stats.stage0Participants.label,
                      attempts: copy.stats.assessmentAttempts.label,
                    }[card.key]
                  }
                </Text>
                <Text className="text-3xl font-bold tracking-tight">
                  {card.value === undefined ? copy.stats.emptyValue : card.value}
                </Text>
                <Text size="sm" muted>
                  {
                    {
                      users: copy.stats.users.description,
                      stage0: copy.stats.stage0Participants.description,
                      attempts: copy.stats.assessmentAttempts.description,
                    }[card.key]
                  }
                </Text>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="admin-sections-heading">
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="flex max-w-3xl flex-col gap-3">
            <Heading level={2} id="admin-sections-heading">
              {copy.sections.title}
            </Heading>
            <Text muted>{copy.sections.description}</Text>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                href: `${base}/admin/users`,
                title: copy.sections.users.title,
                description: copy.sections.users.description,
                openLabel: copy.sections.users.openLabel,
              },
              {
                href: `${base}/admin/courses`,
                title: copy.sections.courses.title,
                description: copy.sections.courses.description,
                openLabel: copy.sections.courses.openLabel,
              },
              {
                href: `${base}/admin/assessments`,
                title: copy.sections.assessments.title,
                description: copy.sections.assessments.description,
                openLabel: copy.sections.assessments.openLabel,
              },
            ].map((section) => (
              <li key={section.href}>
                <Card className="flex h-full flex-col gap-3">
                  <Heading level={3}>{section.title}</Heading>
                  <Text size="sm" muted>
                    {section.description}
                  </Text>
                  <Link
                    href={section.href}
                    className={`${cardLinkClasses} mt-auto pt-1`}
                  >
                    {section.openLabel}
                    <ArrowIcon />
                  </Link>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  );
}
