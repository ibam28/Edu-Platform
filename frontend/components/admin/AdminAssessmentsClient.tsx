"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Heading } from "@/components/ui/Heading";
import { Spinner } from "@/components/ui/Spinner";
import { Text } from "@/components/ui/Text";
import { getSession } from "@/lib/auth/session";
import { useAdminAuth } from "@/components/admin/useAdminAuth";
import type { AdminAssessmentsCopy } from "@/lib/i18n/dictionaries";

const primaryLinkClasses =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary-600 px-6 text-base font-medium text-white transition-colors duration-fast hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const cardLinkClasses =
  "inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export interface AdminAssessmentsClientProps {
  copy: AdminAssessmentsCopy;
  locale: string;
}

interface AssessmentRow {
  id: number;
  stage: string;
  is_demo: boolean;
  demo_label: string;
  question_count: number;
}

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

export function AdminAssessmentsClient({
  copy,
  locale,
}: AdminAssessmentsClientProps) {
  const authStatus = useAdminAuth();
  const [assessments, setAssessments] = useState<AssessmentRow[] | null>(null);

  const base = `/${locale}`;
  const loginHref = `${base}/login`;

  useEffect(() => {
    if (authStatus !== "authenticated") {
      return;
    }
    const session = getSession();
    if (!session) {
      return;
    }
    let cancelled = false;
    fetch("/api/admin/assessments", {
      headers: { Authorization: `Bearer ${session.token}` },
    })
      .then(async (response) => {
        if (cancelled) {
          return;
        }
        if (response.ok) {
          const data = (await response.json()) as {
            assessments: AssessmentRow[];
          };
          setAssessments(data.assessments);
        } else {
          setAssessments([]);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAssessments([]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [authStatus]);

  return (
    <div className="flex flex-col">
      <section aria-labelledby="admin-assessments-hero-heading">
        <Container className="flex max-w-3xl flex-col items-start gap-5 py-12 sm:py-20">
          <Badge variant="accent">{copy.hero.eyebrow}</Badge>
          <Heading level={1} id="admin-assessments-hero-heading">
            {copy.hero.title}
          </Heading>
          <Text size="lg" muted>
            {copy.hero.description}
          </Text>
          {authStatus === "unauthorized" ? (
            <>
              <Alert variant="warning" title={copy.unauthorizedTitle}>
                {copy.unauthorizedDescription}
              </Alert>
              <Link href={loginHref} className={primaryLinkClasses}>
                {copy.loginLabel}
              </Link>
            </>
          ) : null}
          {authStatus === "error" ? (
            <Alert variant="error" title={copy.errorTitle}>
              {copy.errorDescription}
            </Alert>
          ) : null}
        </Container>
      </section>

      <section
        aria-labelledby="admin-assessments-list-heading"
        className="bg-background-muted"
      >
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="flex max-w-3xl flex-col gap-3">
            <Heading level={2} id="admin-assessments-list-heading">
              {copy.list.title}
            </Heading>
            <Text muted>{copy.list.description}</Text>
          </div>

          {authStatus === "loading" ||
          (authStatus === "authenticated" && assessments === null) ? (
            <div className="flex items-center gap-3" role="status">
              <Spinner className="h-5 w-5 text-primary-600" />
              <Text muted>{copy.loading}</Text>
            </div>
          ) : null}

          {authStatus === "authenticated" && assessments !== null ? (
            assessments.length === 0 ? (
              <EmptyState
                title={copy.list.emptyTitle}
                description={copy.list.emptyDescription}
              />
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {assessments.map((assessment) => (
                  <li key={assessment.id}>
                    <Card className="flex h-full flex-col gap-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Badge variant="accent">{assessment.stage}</Badge>
                        <Badge variant="warning">{assessment.demo_label}</Badge>
                      </div>
                      <Text size="sm" className="font-medium text-foreground">
                        {copy.table.questions}: {assessment.question_count}
                      </Text>
                      <Link
                        href={`${base}/admin/assessments/${assessment.id}`}
                        className={`${cardLinkClasses} mt-auto pt-1`}
                      >
                        {copy.table.openLabel}
                        <ArrowIcon />
                      </Link>
                    </Card>
                  </li>
                ))}
              </ul>
            )
          ) : null}
        </Container>
      </section>
    </div>
  );
}
