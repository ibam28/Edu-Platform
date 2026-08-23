"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Spinner } from "@/components/ui/Spinner";
import { Text } from "@/components/ui/Text";
import { useAuth } from "@/components/auth/AuthProvider";
import { readStage0CompletedLessonIds } from "@/components/lesson/LessonProgress";
import { getSession } from "@/lib/auth/session";
import type { DashboardCopy, Stage0LessonCopy } from "@/lib/i18n/dictionaries";

const primaryLinkClasses =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary-600 px-6 text-base font-medium text-white transition-all duration-fast hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const secondaryLinkClasses =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md border border-strong bg-transparent px-6 text-base font-medium text-foreground transition-all duration-fast hover:-translate-y-0.5 hover:bg-background-subtle hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const cardLinkClasses =
  "inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export interface DashboardClientProps {
  copy: DashboardCopy;
  lessonItems: Stage0LessonCopy[];
  locale: string;
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

function formatDate(iso: string, locale: string): string {
  try {
    return new Date(iso).toLocaleDateString(locale === "en" ? "en-US" : "id-ID");
  } catch {
    return iso;
  }
}

export function DashboardClient({
  copy,
  lessonItems,
  locale,
}: DashboardClientProps) {
  const { status: authStatus, user } = useAuth();
  const [serverLessonIds, setServerLessonIds] = useState<string[]>([]);

  useEffect(() => {
    if (authStatus !== "authenticated") {
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
        if (cancelled || !response.ok) {
          return;
        }
        const data = (await response.json()) as { lesson_ids: string[] };
        setServerLessonIds(data.lesson_ids);
      })
      .catch(() => {
        if (!cancelled) {
          setServerLessonIds([]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [authStatus]);

  const lessonIds = useMemo(
    () => lessonItems.map((_, index) => String(index + 1).padStart(2, "0")),
    [lessonItems],
  );
  const completedIds = useMemo(
    () => [...new Set([...readStage0CompletedLessonIds(), ...serverLessonIds])],
    [serverLessonIds],
  );
  const completedCount = lessonIds.filter((id) => completedIds.includes(id)).length;
  const currentIndex = lessonIds.findIndex((id) => !completedIds.includes(id));
  const currentLesson = currentIndex === -1 ? null : lessonItems[currentIndex];
  const currentLessonId = currentIndex === -1 ? null : lessonIds[currentIndex];
  const continueHref = currentLessonId
    ? `/${locale}/learning-path/stage-0/${currentLessonId}`
    : `/${locale}/learning-path/stage-0`;

  const base = `/${locale}`;
  const displayName =
    user?.display_name?.trim() || (user?.email?.split("@")[0] ?? "");
  const greeting = copy.welcome.greeting.replace("{name}", displayName);
  const progressPercent = lessonIds.length
    ? Math.round((completedCount / lessonIds.length) * 100)
    : 0;

  if (authStatus === "loading") {
    return (
      <Container className="flex min-h-[40vh] items-center justify-center py-16">
        <div className="flex items-center gap-3" role="status">
          <Spinner className="h-5 w-5 text-primary-600" />
          <Text muted>{copy.auth.loading}</Text>
        </div>
      </Container>
    );
  }

  if (authStatus === "unauthenticated") {
    return (
      <Container className="flex flex-col items-start gap-5 py-12 sm:py-20">
        <Badge variant="accent">{copy.hero.eyebrow}</Badge>
        <Heading level={1}>{copy.hero.guestTitle}</Heading>
        <Text size="lg" muted>
          {copy.hero.description}
        </Text>
        <div className="flex flex-wrap gap-3">
          <Link href={`${base}/login`} className={primaryLinkClasses}>
            {copy.auth.loginLabel}
          </Link>
          <Link href={`${base}/register`} className={secondaryLinkClasses}>
            {copy.auth.registerLabel}
          </Link>
        </div>
      </Container>
    );
  }

  if (authStatus === "error") {
    return (
      <Container className="flex flex-col items-start gap-5 py-12 sm:py-20">
        <Alert variant="error" title={copy.auth.errorTitle}>
          {copy.auth.errorDescription}
        </Alert>
      </Container>
    );
  }

  return (
    <div className="flex flex-col">
      {/* ============ WELCOME HERO ============ */}
      <section aria-labelledby="dashboard-welcome-heading" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-50 via-background to-accent-50"
        />
        <Container className="flex flex-col gap-6 py-12 sm:py-16 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex flex-1 flex-col items-start gap-4">
            <Heading level={1} id="dashboard-welcome-heading">
              {greeting}
            </Heading>
            <Text size="lg" muted className="max-w-2xl">
              {copy.welcome.continuePrompt}
            </Text>
            <div className="flex flex-wrap gap-3">
              <Link href={continueHref} className={primaryLinkClasses}>
                {completedCount === 0
                  ? copy.continueLearning.startLabel
                  : copy.continueLearning.continueLabel}
                <ArrowIcon />
              </Link>
              <Link href={`${base}/learning-path`} className={secondaryLinkClasses}>
                {copy.pathSnapshot.viewPath}
              </Link>
            </div>
          </div>
          <div className="flex shrink-0 items-center justify-center">
            <img
              src="/assets/illustrations/platform/platform-dashboard.svg"
              alt=""
              aria-hidden="true"
              width={120}
              height={120}
              className="h-28 w-28 lg:h-40 lg:w-40"
              draggable={false}
            />
          </div>
        </Container>
      </section>

      {/* ============ PROFILE + CONTINUE LEARNING ============ */}
      <section aria-labelledby="dashboard-personal-heading" className="bg-background-muted">
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <Heading level={2} id="dashboard-personal-heading" className="sr-only">
            {copy.profileCard.title}
          </Heading>
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Profile summary */}
            <Card className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-lg font-bold text-white"
                >
                  {displayName.charAt(0).toUpperCase()}
                </span>
                <Heading level={3}>{copy.profileCard.title}</Heading>
              </div>
              <div className="flex flex-col gap-1.5">
                <Text size="sm" className="font-medium text-foreground">
                  {displayName}
                </Text>
                <Text size="sm" muted>
                  {user?.email}
                </Text>
                <Text size="sm" muted>
                  {copy.profileCard.role}: {copy.welcome.studentLabel}
                </Text>
                {user?.created_at ? (
                  <Text size="sm" muted>
                    {copy.profileCard.memberSince}: {formatDate(user.created_at, locale)}
                  </Text>
                ) : null}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Badge variant="success">{copy.profileCard.active}</Badge>
                  <Text size="sm" muted>
                    {copy.profileCard.accountStatus}
                  </Text>
                </div>
              </div>
              <Link href={`${base}/settings`} className={`${cardLinkClasses} mt-auto pt-1`}>
                {copy.profileCard.editLabel}
                <ArrowIcon />
              </Link>
            </Card>

            {/* Continue learning */}
            <Card className="flex flex-col gap-3">
              <Heading level={3}>{copy.continueLearning.title}</Heading>
              <Text size="sm" muted>
                {copy.continueLearning.description}
              </Text>
              {completedCount === 0 ? (
                <div className="flex flex-col gap-1.5 pt-1">
                  <Text size="sm" className="font-medium text-foreground">
                    {copy.continueLearning.noProgressTitle}
                  </Text>
                  <Text size="sm" muted>
                    {copy.continueLearning.noProgressDescription}
                  </Text>
                </div>
              ) : (
                <div className="flex flex-col gap-1.5 pt-1">
                  <Text size="sm" className="font-medium text-foreground">
                    {copy.progressOverview.lessonsCompleted}: {completedCount} /{" "}
                    {lessonIds.length}
                  </Text>
                  {currentLesson ? (
                    <div className="flex flex-col gap-0.5">
                      <Text size="sm" muted>
                        {copy.continueLearning.currentLesson}
                      </Text>
                      <Text size="sm" className="font-medium text-foreground">
                        {currentLesson.title}
                      </Text>
                    </div>
                  ) : null}
                  <div
                    role="progressbar"
                    aria-valuenow={progressPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={copy.progressOverview.title}
                    className="mt-1"
                  >
                    <div className="h-2 w-full overflow-hidden rounded-full bg-background-subtle">
                      <div
                        className="h-full rounded-full bg-primary-600"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <Link href={continueHref} className={`${cardLinkClasses} mt-auto pt-1`}>
                {completedCount === 0
                  ? copy.continueLearning.startLabel
                  : copy.continueLearning.continueLabel}
                <ArrowIcon />
              </Link>
            </Card>
          </div>
        </Container>
      </section>

      {/* ============ PROGRESS + PATH SNAPSHOT ============ */}
      <section aria-labelledby="dashboard-progress-heading">
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Progress overview */}
            <Card className="flex flex-col gap-3">
              <Heading level={3}>{copy.progressOverview.title}</Heading>
              <Text size="sm" muted>
                {copy.progressOverview.description}
              </Text>
              <dl className="flex flex-col gap-2 pt-1">
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-sm text-muted">{copy.progressOverview.lessonsCompleted}</dt>
                  <dd className="text-sm font-semibold text-foreground">
                    {completedCount} / {lessonIds.length}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-sm text-muted">{copy.progressOverview.currentStage}</dt>
                  <dd className="text-sm font-semibold text-foreground">Stage 0</dd>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-sm text-muted">{copy.progressOverview.overallLabel}</dt>
                  <dd className="text-sm font-semibold text-foreground">{progressPercent}%</dd>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-sm text-muted">{copy.progressOverview.lastActivity}</dt>
                  <dd className="text-sm font-medium text-foreground">
                    {completedCount === 0 ? copy.progressOverview.never : "Stage 0"}
                  </dd>
                </div>
              </dl>
            </Card>

            {/* Learning path snapshot */}
            <Card className="flex flex-col gap-3 lg:col-span-2">
              <Heading level={3}>{copy.pathSnapshot.title}</Heading>
              <Text size="sm" muted>
                {copy.pathSnapshot.description}
              </Text>
              <ul className="flex flex-col gap-2">
                {[
                  { name: "Stage 0", status: "current" as const },
                  { name: "Stage 1", status: "available" as const },
                  { name: "Stage 2", status: "locked" as const },
                  { name: "Stage 3", status: "locked" as const },
                  { name: "Stage 4", status: "locked" as const },
                ].map((stage) => (
                  <li
                    key={stage.name}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background-muted px-3 py-2"
                  >
                    <Text size="sm" className="font-medium text-foreground">
                      {stage.name}
                    </Text>
                    {stage.status === "current" ? (
                      <Badge variant="success">{copy.pathSnapshot.current}</Badge>
                    ) : stage.status === "available" ? (
                      <Badge variant="primary">{copy.pathSnapshot.available}</Badge>
                    ) : (
                      <Badge variant="neutral">{copy.pathSnapshot.locked}</Badge>
                    )}
                  </li>
                ))}
              </ul>
              <Link href={`${base}/learning-path`} className={`${cardLinkClasses} mt-auto pt-1`}>
                {copy.pathSnapshot.viewPath}
                <ArrowIcon />
              </Link>
            </Card>
          </div>
        </Container>
      </section>

      {/* ============ ACTIVITY + ASSESSMENTS + SETTINGS ============ */}
      <section aria-labelledby="dashboard-extra-heading" className="bg-background-muted">
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Recent activity */}
            <Card className="flex flex-col gap-3">
              <Heading level={3}>{copy.recentActivity.title}</Heading>
              <Text size="sm" muted>
                {copy.recentActivity.description}
              </Text>
              {completedCount === 0 ? (
                <div className="flex flex-col gap-1.5 pt-1">
                  <Text size="sm" className="font-medium text-foreground">
                    {copy.recentActivity.emptyTitle}
                  </Text>
                  <Text size="sm" muted>
                    {copy.recentActivity.emptyDescription}
                  </Text>
                </div>
              ) : (
                <ul className="flex flex-col gap-2 pt-1">
                  {completedIds
                    .slice()
                    .sort()
                    .map((lessonId) => (
                      <li key={lessonId} className="flex items-center gap-2">
                        <Badge variant="success">✓</Badge>
                        <Text size="sm" muted>
                          {copy.continueLearning.currentLesson} {lessonId}
                        </Text>
                      </li>
                    ))}
                </ul>
              )}
            </Card>

            {/* Assessment summary */}
            <Card className="flex flex-col gap-3">
              <Heading level={3}>{copy.assessmentSummary.title}</Heading>
              <Text size="sm" muted>
                {copy.assessmentSummary.description}
              </Text>
              <Alert variant="warning" title="">
                {copy.assessmentSummary.demoWarning}
              </Alert>
              <Link
                href={`${base}/learning-path/assessment/1`}
                className={`${cardLinkClasses} mt-auto pt-1`}
              >
                {copy.assessmentSummary.viewLabel}
                <ArrowIcon />
              </Link>
            </Card>

            {/* Account settings summary */}
            <Card className="flex flex-col gap-3">
              <Heading level={3}>{copy.settingsSummary.title}</Heading>
              <Text size="sm" muted>
                {copy.settingsSummary.description}
              </Text>
              <Link href={`${base}/settings`} className={`${cardLinkClasses} mt-auto pt-1`}>
                {copy.settingsSummary.manageLabel}
                <ArrowIcon />
              </Link>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  );
}
