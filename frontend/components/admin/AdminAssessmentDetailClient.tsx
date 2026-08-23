"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { Text } from "@/components/ui/Text";
import { Textarea } from "@/components/ui/Textarea";
import { getSession } from "@/lib/auth/session";
import { useAdminAuth } from "@/components/admin/useAdminAuth";
import type { AdminAssessmentsCopy } from "@/lib/i18n/dictionaries";

const primaryLinkClasses =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary-600 px-6 text-base font-medium text-white transition-colors duration-fast hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const cardLinkClasses =
  "inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export interface AdminAssessmentDetailClientProps {
  copy: AdminAssessmentsCopy;
  locale: string;
  assessmentId: string;
}

interface AssessmentDetail {
  id: number;
  stage: string;
  is_demo: boolean;
  demo_label: string;
}

interface Question {
  id: number;
  assessment_id: number;
  position: number;
  question_id: string;
  question_en: string;
  options: { position: number; id: string; en: string }[];
  correct_option: number;
}

const emptyOption = () => ({ id: "", en: "" });

function QuestionForm({
  copy,
  initial,
  submitLabel,
  submittingLabel,
  onSubmit,
  onCancel,
}: {
  copy: AdminAssessmentsCopy["detail"];
  initial: Question | null;
  submitLabel: string;
  submittingLabel: string;
  onSubmit: (payload: Record<string, string | number>) => Promise<boolean>;
  onCancel?: () => void;
}) {
  const [questionId, setQuestionId] = useState(initial?.question_id ?? "");
  const [questionEn, setQuestionEn] = useState(initial?.question_en ?? "");
  const [options, setOptions] = useState(
    initial
      ? initial.options.map((option) => ({ id: option.id, en: option.en }))
      : [emptyOption(), emptyOption(), emptyOption(), emptyOption()],
  );
  const [correctOption, setCorrectOption] = useState(
    initial?.correct_option ?? 0,
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(false);
    const payload: Record<string, string | number> = {
      question_id: questionId.trim(),
      question_en: questionEn.trim(),
      correct_option: correctOption,
    };
    options.forEach((option, index) => {
      payload[`option_${index + 1}_id`] = option.id.trim();
      payload[`option_${index + 1}_en`] = option.en.trim();
    });
    const ok = await onSubmit(payload);
    setSubmitting(false);
    setError(!ok);
  };

  const updateOption = (index: number, field: "id" | "en", value: string) => {
    setOptions((current) =>
      current.map((option, optionIndex) =>
        optionIndex === index ? { ...option, [field]: value } : option,
      ),
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-lg border border-border bg-background-muted p-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Textarea
          label={copy.labels.questionId}
          required
          value={questionId}
          onChange={(event) => setQuestionId(event.target.value)}
          disabled={submitting}
        />
        <Textarea
          label={copy.labels.questionEn}
          required
          value={questionEn}
          onChange={(event) => setQuestionEn(event.target.value)}
          disabled={submitting}
        />
      </div>
      <div className="flex flex-col gap-3">
        {options.map((option, index) => (
          <fieldset
            key={index}
            className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4"
          >
            <legend className="px-1 text-sm font-medium text-foreground">
              {copy.labels.optionTemplate.replace("{n}", String(index + 1))}
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                label={copy.labels.optionId}
                required
                value={option.id}
                onChange={(event) => updateOption(index, "id", event.target.value)}
                disabled={submitting}
              />
              <Input
                label={copy.labels.optionEn}
                required
                value={option.en}
                onChange={(event) => updateOption(index, "en", event.target.value)}
                disabled={submitting}
              />
            </div>
          </fieldset>
        ))}
      </div>
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex w-40 flex-col gap-1.5">
          <label
            htmlFor="correct-option"
            className="text-sm font-medium text-foreground"
          >
            {copy.labels.correctOption}
          </label>
          <select
            id="correct-option"
            value={correctOption}
            onChange={(event) => setCorrectOption(Number(event.target.value))}
            disabled={submitting}
            className="flex h-10 w-full rounded-md border border-strong bg-surface px-3 py-2 text-sm text-foreground transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {options.map((_, index) => (
              <option key={index} value={index}>
                {copy.labels.optionTemplate.replace("{n}", String(index + 1))}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button type="submit" loading={submitting}>
            {submitting ? submittingLabel : submitLabel}
          </Button>
          {onCancel ? (
            <Button type="button" variant="outline" onClick={onCancel}>
              {copy.cancel}
            </Button>
          ) : null}
        </div>
      </div>
      {error ? <Alert variant="error">{copy.saveError}</Alert> : null}
    </form>
  );
}

export function AdminAssessmentDetailClient({
  copy,
  locale,
  assessmentId,
}: AdminAssessmentDetailClientProps) {
  const authStatus = useAdminAuth();
  const [assessment, setAssessment] = useState<AssessmentDetail | null>(null);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);

  const base = `/${locale}`;
  const loginHref = `${base}/login`;
  const assessmentsHref = `${base}/admin/assessments`;

  const loadDetail = () => {
    const session = getSession();
    if (!session) {
      return;
    }
    fetch(`/api/admin/assessments/${assessmentId}`, {
      headers: { Authorization: `Bearer ${session.token}` },
    })
      .then(async (response) => {
        if (!response.ok) {
          return;
        }
        const data = (await response.json()) as {
          assessment: AssessmentDetail;
          questions: Question[];
        };
        setAssessment(data.assessment);
        setQuestions(data.questions);
      })
      .catch(() => {
        // Load errors keep the previous state; spinner disappears.
      });
  };

  useEffect(() => {
    if (authStatus === "authenticated") {
      loadDetail();
    }
  }, [authStatus, assessmentId]);

  const handleUpdate = (questionId: number) => async (
    payload: Record<string, string | number>,
  ) => {
    const session = getSession();
    if (!session) {
      return false;
    }
    try {
      const response = await fetch(`/api/admin/questions/${questionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setEditingId(null);
        loadDetail();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleCreate = async (payload: Record<string, string | number>) => {
    const session = getSession();
    if (!session) {
      return false;
    }
    try {
      const response = await fetch(
        `/api/admin/assessments/${assessmentId}/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.token}`,
          },
          body: JSON.stringify(payload),
        },
      );
      if (response.ok) {
        setCreating(false);
        loadDetail();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <div className="flex flex-col">
      <section aria-labelledby="admin-assessment-detail-heading">
        <Container className="flex max-w-3xl flex-col items-start gap-5 py-12 sm:py-20">
          <Link href={assessmentsHref} className={cardLinkClasses}>
            {copy.detail.backLabel}
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent">
              {assessment ? assessment.stage : copy.hero.title}
            </Badge>
            <Badge variant="warning">{copy.detail.demoLabel}</Badge>
          </div>
          <Heading level={1} id="admin-assessment-detail-heading">
            {assessment ? assessment.stage : copy.hero.title}
          </Heading>
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
        </Container>
      </section>

      <section
        aria-labelledby="admin-assessment-questions-heading"
        className="bg-background-muted"
      >
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex max-w-3xl flex-col gap-3">
              <Heading level={2} id="admin-assessment-questions-heading">
                {copy.detail.questionsTitle}
              </Heading>
              <Text muted>{copy.detail.questionsDescription}</Text>
            </div>
            {authStatus === "authenticated" ? (
              <Button
                type="button"
                onClick={() => setCreating((current) => !current)}
                aria-expanded={creating}
              >
                {copy.detail.createTitle}
              </Button>
            ) : null}
          </div>

          {creating && authStatus === "authenticated" ? (
            <Card className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Heading level={3}>{copy.detail.createTitle}</Heading>
                <Text size="sm" muted>
                  {copy.detail.createDescription}
                </Text>
              </div>
              <QuestionForm
                copy={copy.detail}
                initial={null}
                submitLabel={copy.detail.createSubmit}
                submittingLabel={copy.detail.creating}
                onSubmit={handleCreate}
              />
            </Card>
          ) : null}

          {authStatus === "loading" ||
          (authStatus === "authenticated" && questions === null) ? (
            <div className="flex items-center gap-3" role="status">
              <Spinner className="h-5 w-5 text-primary-600" />
              <Text muted>{copy.loading}</Text>
            </div>
          ) : null}

          {authStatus === "authenticated" && questions !== null ? (
            <ol className="flex flex-col gap-4">
              {questions.map((question) => (
                <li key={question.id}>
                  <Card className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="primary">
                          {copy.detail.questionLabel} {question.position}
                        </Badge>
                        <Badge variant="warning">{copy.detail.demoLabel}</Badge>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        aria-expanded={editingId === question.id}
                        onClick={() =>
                          setEditingId((current) =>
                            current === question.id ? null : question.id,
                          )
                        }
                      >
                        {editingId === question.id
                          ? copy.detail.cancel
                          : copy.detail.editQuestion}
                      </Button>
                    </div>
                    <Heading level={3}>{question.question_id}</Heading>
                    <Text size="sm" muted>
                      {question.question_en}
                    </Text>
                    <ul className="flex flex-col gap-1.5">
                      {question.options.map((option, index) => (
                        <li key={option.position}>
                          <Text
                            size="sm"
                            muted
                            className={
                              index === question.correct_option
                                ? "font-medium text-success-700"
                                : undefined
                            }
                          >
                            {index + 1}. {option.id} / {option.en}
                          </Text>
                        </li>
                      ))}
                    </ul>
                    {editingId === question.id ? (
                      <QuestionForm
                        copy={copy.detail}
                        initial={question}
                        submitLabel={copy.detail.save}
                        submittingLabel={copy.detail.saving}
                        onSubmit={handleUpdate(question.id)}
                        onCancel={() => setEditingId(null)}
                      />
                    ) : null}
                  </Card>
                </li>
              ))}
            </ol>
          ) : null}
        </Container>
      </section>
    </div>
  );
}
