"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { getSession } from "@/lib/auth/session";

export const STAGE0_PROGRESS_STORAGE_KEY = "bilingual-edu:stage0-progress";

const STORAGE_KEY = STAGE0_PROGRESS_STORAGE_KEY;

export function readStage0CompletedLessonIds(): string[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

function writeCompletedLessonIds(ids: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage unavailable (e.g. private mode): keep in-memory state only.
  }
}

export interface LessonProgressProps {
  lessonId: string;
  nextHref: string | null;
  allLessonsHref: string;
  markCompleteLabel: string;
  completedLabel: string;
  completedNote: string;
  undoLabel: string;
  continueLabel: string;
  allLessonsLabel: string;
}

const buttonBaseClasses =
  "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const primaryButtonClasses = `${buttonBaseClasses} bg-primary-600 text-white hover:bg-primary-700`;

const outlineButtonClasses = `${buttonBaseClasses} border border-strong bg-transparent text-foreground hover:bg-background-subtle`;

const continueLinkClasses = primaryButtonClasses;

function CheckIcon() {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function UndoIcon() {
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
      <path d="M3 7v6h6" />
      <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
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

export function LessonProgress({
  lessonId,
  nextHref,
  allLessonsHref,
  markCompleteLabel,
  completedLabel,
  completedNote,
  undoLabel,
  continueLabel,
  allLessonsLabel,
}: LessonProgressProps) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const local = readStage0CompletedLessonIds().includes(lessonId);
    const session = getSession();
    if (!session) {
      setCompleted(local);
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
          setCompleted(local || data.lesson_ids.includes(lessonId));
        } else {
          setCompleted(local);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCompleted(local);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [lessonId]);

  const syncToServer = (markComplete: boolean) => {
    const session = getSession();
    if (!session) {
      return;
    }
    const headers: Record<string, string> = {
      Authorization: `Bearer ${session.token}`,
    };
    if (markComplete) {
      headers["Content-Type"] = "application/json";
    }
    fetch(
      markComplete ? "/api/progress" : `/api/progress/${lessonId}`,
      {
        method: markComplete ? "POST" : "DELETE",
        headers,
        ...(markComplete ? { body: JSON.stringify({ lesson_id: lessonId }) } : {}),
      },
    ).catch(() => {
      // Best-effort sync: local state remains the source of truth offline.
    });
  };

  const handleToggle = () => {
    setCompleted((current) => {
      const stored = readStage0CompletedLessonIds();
      const next = current
        ? stored.filter((id) => id !== lessonId)
        : [...stored, lessonId];
      writeCompletedLessonIds(next);
      syncToServer(!current);
      return !current;
    });
  };

  const continueHref = nextHref ?? allLessonsHref;
  const continueLabelText = nextHref ? continueLabel : allLessonsLabel;

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {completed ? (
          <div className="flex flex-col gap-1" aria-live="polite">
            <Badge variant="success" className="self-start">
              <CheckIcon />
              {completedLabel}
            </Badge>
            <Text size="sm" muted>
              {completedNote}
            </Text>
          </div>
        ) : null}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleToggle}
            aria-pressed={completed}
            className={completed ? outlineButtonClasses : primaryButtonClasses}
          >
            {completed ? (
              <>
                <UndoIcon />
                {undoLabel}
              </>
            ) : (
              <>
                <CheckIcon />
                {markCompleteLabel}
              </>
            )}
          </button>
          {completed ? (
            <Link href={continueHref} className={continueLinkClasses}>
              {continueLabelText}
              <ArrowIcon />
            </Link>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
