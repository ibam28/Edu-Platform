"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { allAnswered, calculateScore } from "@/components/assessment/scoring";
import { getSession } from "@/lib/auth/session";

export interface LocalizedQuizQuestion {
  text: string;
  options: string[];
  correct: number;
}

export interface AssessmentQuizProps {
  questions: LocalizedQuizQuestion[];
  storageKey: string;
  stage?: string;
  demoLabel: string;
  questionProgressTemplate: string;
  previousLabel: string;
  nextLabel: string;
  submitLabel: string;
  unanswered: {
    title: string;
    message: string;
  };
  result: {
    title: string;
    scoreLabel: string;
    scoreOutOfTemplate: string;
    demoNote: string;
    retry: string;
    backToLearningPath: string;
    backHref: string;
  };
}

const optionLetters = ["A", "B", "C", "D"];

interface StoredAttempt {
  submitted: boolean;
  answers: (number | null)[];
}

function readStoredAttempt(storageKey: string): StoredAttempt | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return null;
    }
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("submitted" in parsed) ||
      !("answers" in parsed)
    ) {
      return null;
    }
    const attempt = parsed as StoredAttempt;
    return typeof attempt.submitted === "boolean" &&
      Array.isArray(attempt.answers) &&
      attempt.answers.every((value) => value === null || typeof value === "number")
      ? attempt
      : null;
  } catch {
    return null;
  }
}

function writeStoredAttempt(storageKey: string, attempt: StoredAttempt) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(attempt));
  } catch {
    // Storage unavailable (e.g. private mode): keep in-memory state only.
  }
}

function clearStoredAttempt(storageKey: string) {
  try {
    window.localStorage.removeItem(storageKey);
  } catch {
    // Storage unavailable: nothing to clear.
  }
}

function formatTemplate(template: string, values: Record<string, number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in values ? String(values[key]) : `{${key}}`,
  );
}

const primaryButtonClasses =
  "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary-600 px-4 text-sm font-medium text-white transition-colors duration-fast hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50";

const outlineButtonClasses =
  "inline-flex h-10 items-center justify-center gap-2 rounded-md border border-strong bg-transparent px-4 text-sm font-medium text-foreground transition-colors duration-fast hover:bg-background-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50";

export function AssessmentQuiz({
  questions,
  storageKey,
  stage,
  demoLabel,
  questionProgressTemplate,
  previousLabel,
  nextLabel,
  submitLabel,
  unanswered,
  result,
}: AssessmentQuizProps) {
  const total = questions.length;
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array.from({ length: total }, () => null),
  );
  const [submitted, setSubmitted] = useState(false);
  const [showUnanswered, setShowUnanswered] = useState(false);

  useEffect(() => {
    const stored = readStoredAttempt(storageKey);
    if (stored && stored.submitted && stored.answers.length === total) {
      setAnswers(stored.answers);
      setSubmitted(true);
    }
  }, [storageKey, total]);

  const score = useMemo(
    () => calculateScore(answers, questions),
    [answers, questions],
  );

  const answeredCount = answers.filter((answer) => answer !== null).length;

  const handleSelect = (optionIndex: number) => {
    if (submitted) {
      return;
    }
    setAnswers((currentAnswers) => {
      const next = [...currentAnswers];
      next[current] = optionIndex;
      return next;
    });
    setShowUnanswered(false);
  };

  const handleSubmit = () => {
    if (!allAnswered(answers)) {
      setShowUnanswered(true);
      return;
    }
    writeStoredAttempt(storageKey, { submitted: true, answers });
    setSubmitted(true);
    setShowUnanswered(false);
    if (stage) {
      const session = getSession();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (session) {
        headers.Authorization = `Bearer ${session.token}`;
      }
      fetch("/api/assessments/attempts", {
        method: "POST",
        headers,
        body: JSON.stringify({ stage, score, total }),
      }).catch(() => {
        // Best-effort recording: local result remains visible offline.
      });
    }
  };

  const handleRetry = () => {
    clearStoredAttempt(storageKey);
    setAnswers(Array.from({ length: total }, () => null));
    setCurrent(0);
    setSubmitted(false);
    setShowUnanswered(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col gap-4">
        <Card className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="warning">{demoLabel}</Badge>
          </div>
          <Heading level={2}>{result.title}</Heading>
          <div className="flex flex-col gap-1">
            <Text size="sm" muted>
              {result.scoreLabel}
            </Text>
            <Text className="text-3xl font-bold text-primary-600">
              {score} / {total}
            </Text>
            <Text size="sm" muted>
              {formatTemplate(result.scoreOutOfTemplate, { total })}
            </Text>
          </div>
        </Card>
        <Alert variant="warning" title={result.demoNote} />
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={handleRetry} className={primaryButtonClasses}>
            {result.retry}
          </button>
          <Link href={result.backHref} className={outlineButtonClasses}>
            {result.backToLearningPath}
          </Link>
        </div>
      </div>
    );
  }

  const question = questions[current];
  const progressPercent = ((current + 1) / total) * 100;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Text size="sm" muted>
          {formatTemplate(questionProgressTemplate, { current: current + 1, total })}
        </Text>
        <Badge variant="success">
          {answeredCount} / {total}
        </Badge>
      </div>
      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current + 1}
        aria-label={formatTemplate(questionProgressTemplate, {
          current: current + 1,
          total,
        })}
        className="h-1.5 w-full overflow-hidden rounded-full bg-background-subtle"
      >
        <div
          className="h-full rounded-full bg-primary-600 transition-[width] duration-base"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <Card className="flex flex-col gap-4">
        <Badge variant="warning" className="self-start">
          {demoLabel}
        </Badge>
        <Heading level={2} id="assessment-question-heading">
          {question.text}
        </Heading>
        <div role="radiogroup" aria-labelledby="assessment-question-heading" className="flex flex-col gap-2">
          {question.options.map((option, optionIndex) => {
            const selected = answers[current] === optionIndex;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => handleSelect(optionIndex)}
                className={`flex w-full items-start gap-3 rounded-md border p-4 text-left transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  selected
                    ? "border-primary-600 bg-primary-50 text-foreground"
                    : "border-strong bg-background-muted text-foreground hover:bg-background-subtle"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    selected ? "bg-primary-600 text-white" : "bg-background-subtle text-muted"
                  }`}
                >
                  {optionLetters[optionIndex]}
                </span>
                <span className="text-sm">{option}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {showUnanswered ? (
        <Alert variant="error" title={unanswered.title}>
          {unanswered.message}
        </Alert>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setCurrent((value) => Math.max(0, value - 1))}
          disabled={current === 0}
          className={outlineButtonClasses}
        >
          {previousLabel}
        </button>
        {current < total - 1 ? (
          <button
            type="button"
            onClick={() => setCurrent((value) => Math.min(total - 1, value + 1))}
            className={primaryButtonClasses}
          >
            {nextLabel}
          </button>
        ) : (
          <button type="button" onClick={handleSubmit} className={primaryButtonClasses}>
            {submitLabel}
          </button>
        )}
      </div>
    </div>
  );
}
