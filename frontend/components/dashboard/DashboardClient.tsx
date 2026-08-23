"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Alert } from "@/components/ui/Alert";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Spinner } from "@/components/ui/Spinner";
import { Text } from "@/components/ui/Text";
import {
  readStage0CompletedLessonIds,
} from "@/components/lesson/LessonProgress";
import { clearSession, getSession } from "@/lib/auth/session";
import type {
  DashboardCopy,
  LearningPathStageCopy,
  Stage0LessonCopy,
  StageStatus,
} from "@/lib/i18n/dictionaries";

const primaryLinkClasses =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary-600 px-6 text-base font-medium text-white transition-colors duration-fast hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const secondaryLinkClasses =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md border border-strong bg-transparent px-6 text-base font-medium text-foreground transition-colors duration-fast hover:bg-background-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const cardLinkClasses =
  "inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const stageBadgeVariant: Record<StageStatus, BadgeVariant> = {
  free: "success",
  demo: "primary",
  paid: "warning",
  comingSoon: "neutral",
};

export interface DashboardClientProps {
  copy: DashboardCopy;
  stageStatusLabels: Record<StageStatus, string>;
  stageItems: LearningPathStageCopy[];
  lockedLabel: string;
  lessonItems: Stage0LessonCopy[];
  locale: string;
}

type AuthState =
  | { status: "loading" }
  | { status: "unauthenticated" }
  | { status: "error" }
  | { status: "authenticated"; email: string; role: string };

function LockIcon() {
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
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
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

export function DashboardClient({
  copy,
  stageStatusLabels,
  stageItems,
  lockedLabel,
  lessonItems,
  locale,
}: DashboardClientProps) {
  const [auth, setAuth] = useState<AuthState>({ status: "loading" });
  const [serverLessonIds, setServerLessonIds] = useState<string[]>([]);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      setAuth({ status: "unauthenticated" });
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
          const data = (await response.json()) as {
            email: string;
            role: string;
          };
          setAuth({ status: "authenticated", email: data.email, role: data.role });
        } else if (response.status === 401) {
          clearSession();
          setAuth({ status: "unauthenticated" });
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

  useEffect(() => {
    if (auth.status !== "authenticated") {
      return;
    }
    const session = getSession();
    if (!session) {
      return;
    }
    let cancelled = false;
    fetch("/api/progress", {
      headers: { Authorization: `Bearer ${session.token}` },
    })
      .then(async (response) => {
        if (cancelled) {
          return;
        }
        if (response.ok) {
          const data = (await response.json()) as { lesson_ids: string[] };
          setServerLessonIds(data.lesson_ids);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setServerLessonIds([]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [auth.status]);

  const base = `/${locale}`;
  const stage0Href = `${base}/learning-path/stage-0`;
  const learningPathHref = `${base}/learning-path`;
  const loginHref = `${base}/login`;
  const registerHref = `${base}/register`;

  const lessonIds = useMemo(
    () => lessonItems.map((_, index) => String(index + 1).padStart(2, "0")),
    [lessonItems],
  );
  const completedIds = useMemo(
    () => [...new Set([...readStage0CompletedLessonIds(), ...serverLessonIds])],
    [serverLessonIds],
  );
  const completedCount = lessonIds.filter((id) =>
    completedIds.includes(id),
  ).length;
  const currentIndex = lessonIds.findIndex((id) => !completedIds.includes(id));
  const currentLesson = currentIndex === -1 ? null : lessonItems[currentIndex];
  const currentLessonId = currentIndex === -1 ? null : lessonIds[currentIndex];
  const continueHref = currentLessonId
    ? `${stage0Href}/${currentLessonId}`
    : stage0Href;
  const progressLabel = copy.progress.lessonsCompleted
    .replace("{completed}", String(completedCount))
    .replace("{total}", String(lessonIds.length));

  const handleLogout = () => {
    clearSession();
    window.location.assign(loginHref);
  };

  const heroCta =
    auth.status === "authenticated" ? (
      <>
        <Link href={continueHref} className={primaryLinkClasses}>
          {copy.cta.primaryCta}
        </Link>
        <Link href={learningPathHref} className={secondaryLinkClasses}>
          {copy.cta.secondaryCta}
        </Link>
      </>
    ) : (
      <>
        <Link href={loginHref} className={primaryLinkClasses}>
          {copy.auth.loginLabel}
        </Link>
        <Link href={registerHref} className={secondaryLinkClasses}>
          {copy.auth.registerLabel}
        </Link>
      </>
    );

  return (
    <div className="flex flex-col">
      <section aria-labelledby="dashboard-hero-heading">
        <Container className="flex max-w-3xl flex-col items-start gap-5 py-12 sm:py-20">
          <Badge variant="accent">{copy.hero.eyebrow}</Badge>
          <Heading level={1} id="dashboard-hero-heading">
            {auth.status === "authenticated"
              ? copy.hero.welcomeTitle
              : copy.hero.guestTitle}
          </Heading>
          {auth.status === "loading" ? (
            <div className="flex items-center gap-3" role="status">
              <Spinner className="h-5 w-5 text-primary-600" />
              <Text muted>{copy.auth.loading}</Text>
            </div>
          ) : (
            <>
              {auth.status === "authenticated" ? (
                <div className="flex flex-wrap items-center gap-2">
                  <Text className="font-medium text-foreground">{auth.email}</Text>
                  <Badge variant="primary">{copy.auth.studentRole}</Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                  >
                    {copy.auth.logoutLabel}
                  </Button>
                </div>
              ) : null}
              <Text size="lg" muted>
                {copy.hero.description}
              </Text>
              {auth.status === "error" ? (
                <Alert variant="error" title={copy.auth.errorTitle}>
                  {copy.auth.errorDescription}
                </Alert>
              ) : null}
              <div className="flex flex-wrap gap-3">{heroCta}</div>
            </>
          )}
        </Container>
      </section>

      <section
        aria-labelledby="dashboard-course-heading"
        className="bg-background-muted"
      >
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="flex max-w-3xl flex-col gap-3">
            <Heading level={2} id="dashboard-course-heading">
              {copy.currentCourse.title}
            </Heading>
            <Text muted>{copy.currentCourse.description}</Text>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="success">{copy.currentCourse.freeBadge}</Badge>
              </div>
              <Heading level={3}>{copy.currentCourse.courseTitle}</Heading>
              <Text size="sm" muted>
                {copy.currentCourse.courseDescription}
              </Text>
              <Link
                href={stage0Href}
                className={`${cardLinkClasses} mt-auto pt-1`}
              >
                {copy.currentCourse.openLabel}
                <ArrowIcon />
              </Link>
            </Card>

            <Card className="flex flex-col gap-3">
              <Heading level={3}>{copy.progress.title}</Heading>
              <Text size="sm" muted>
                {copy.progress.description}
              </Text>
              {completedCount === 0 ? (
                <div className="flex flex-col gap-1.5 pt-1">
                  <Text size="sm" className="font-medium text-foreground">
                    {copy.progress.emptyTitle}
                  </Text>
                  <Text size="sm" muted>
                    {copy.progress.emptyDescription}
                  </Text>
                </div>
              ) : (
                <div className="flex flex-col gap-1.5 pt-1">
                  <Text size="sm" className="font-medium text-foreground">
                    {progressLabel}
                  </Text>
                  {currentLesson ? (
                    <Text size="sm" muted>
                      {currentLesson.title}
                    </Text>
                  ) : (
                    <Badge variant="success" className="self-start">
                      {copy.progress.completedNote}
                    </Badge>
                  )}
                </div>
              )}
              <Link
                href={continueHref}
                className={`${cardLinkClasses} mt-auto pt-1`}
              >
                {completedCount === 0
                  ? copy.progress.startLabel
                  : copy.progress.continueLabel}
                <ArrowIcon />
              </Link>
            </Card>
          </div>
        </Container>
      </section>

      <section aria-labelledby="dashboard-stages-heading">
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="flex max-w-3xl flex-col gap-3">
            <Heading level={2} id="dashboard-stages-heading">
              {copy.stages.title}
            </Heading>
            <Text muted>{copy.stages.description}</Text>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stageItems.map((stage) => (
              <li key={stage.title}>
                <Card className="flex h-full flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {stage.statuses.map((s) => (
                      <Badge key={s} variant={stageBadgeVariant[s]}>
                        {stageStatusLabels[s]}
                      </Badge>
                    ))}
                    {stage.locked ? (
                      <Badge variant="neutral">{lockedLabel}</Badge>
                    ) : null}
                  </div>
                  <Heading level={3}>{stage.title}</Heading>
                  <Text size="sm" muted>
                    {stage.description}
                  </Text>
                  <div className="mt-auto pt-1">
                    {stage.cta ? (
                      <Link
                        href={
                          stage.cta.href.startsWith("http")
                            ? stage.cta.href
                            : `${base}${stage.cta.href}`
                        }
                        {...(stage.cta.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className={cardLinkClasses}
                      >
                        {stage.cta.label}
                      </Link>
                    ) : stage.locked ? (
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-subtle">
                        <LockIcon />
                        {lockedLabel}
                      </span>
                    ) : null}
                  </div>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section
        aria-labelledby="dashboard-cta-heading"
        className="bg-background-muted"
      >
        <Container className="flex max-w-3xl flex-col items-start gap-4 py-12 sm:py-16">
          <Heading level={2} id="dashboard-cta-heading">
            {copy.cta.title}
          </Heading>
          <Text muted>{copy.cta.description}</Text>
          <div className="flex flex-wrap gap-3 pt-1">{heroCta}</div>
        </Container>
      </section>
    </div>
  );
}
