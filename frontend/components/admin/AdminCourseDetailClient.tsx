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
import type { AdminCoursesCopy } from "@/lib/i18n/dictionaries";

const primaryLinkClasses =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary-600 px-6 text-base font-medium text-white transition-colors duration-fast hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const cardLinkClasses =
  "inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export interface AdminCourseDetailClientProps {
  copy: AdminCoursesCopy;
  locale: string;
  courseId: string;
}

interface CourseDetail {
  id: number;
  slug: string;
  stage: string;
  title_id: string;
  title_en: string;
  description_id: string;
  description_en: string;
}

interface LessonRow {
  id: number;
  position: number;
  lesson_id: string;
  title_id: string;
  title_en: string;
  optionality: string;
}

interface LessonDetail {
  id: number;
  course_id: number;
  position: number;
  lesson_id: string;
  optionality: string;
  title_id: string;
  title_en: string;
  objective_id: string | null;
  objective_en: string | null;
  explanation_id: string | null;
  explanation_en: string | null;
  example_title_id: string | null;
  example_title_en: string | null;
  example_code: string | null;
  example_explanation_id: string | null;
  example_explanation_en: string | null;
  mistakes_id: string | null;
  mistakes_en: string | null;
  exercise_title_id: string | null;
  exercise_title_en: string | null;
  exercise_description_id: string | null;
  exercise_description_en: string | null;
  exercise_hint_id: string | null;
  exercise_hint_en: string | null;
}

type FieldKey =
  | "title"
  | "objective"
  | "explanation"
  | "exampleTitle"
  | "exampleCode"
  | "exampleExplanation"
  | "mistakes"
  | "exerciseTitle"
  | "exerciseDescription"
  | "exerciseHint";

const LESSON_FIELDS: {
  key: FieldKey;
  idField: keyof LessonDetail;
  enField: keyof LessonDetail;
  multiline: boolean;
}[] = [
  { key: "title", idField: "title_id", enField: "title_en", multiline: false },
  { key: "objective", idField: "objective_id", enField: "objective_en", multiline: true },
  { key: "explanation", idField: "explanation_id", enField: "explanation_en", multiline: true },
  { key: "exampleTitle", idField: "example_title_id", enField: "example_title_en", multiline: false },
  { key: "exampleCode", idField: "example_code", enField: "example_code", multiline: true },
  { key: "exampleExplanation", idField: "example_explanation_id", enField: "example_explanation_en", multiline: true },
  { key: "mistakes", idField: "mistakes_id", enField: "mistakes_en", multiline: true },
  { key: "exerciseTitle", idField: "exercise_title_id", enField: "exercise_title_en", multiline: false },
  { key: "exerciseDescription", idField: "exercise_description_id", enField: "exercise_description_en", multiline: true },
  { key: "exerciseHint", idField: "exercise_hint_id", enField: "exercise_hint_en", multiline: true },
];

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

export function AdminCourseDetailClient({
  copy,
  locale,
  courseId,
}: AdminCourseDetailClientProps) {
  const authStatus = useAdminAuth();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [lessons, setLessons] = useState<LessonRow[] | null>(null);
  const [metaForm, setMetaForm] = useState({
    title_id: "",
    title_en: "",
    description_id: "",
    description_en: "",
  });
  const [metaSaving, setMetaSaving] = useState(false);
  const [metaStatus, setMetaStatus] = useState<
    "idle" | "saved" | "error"
  >("idle");
  const [editingLessonId, setEditingLessonId] = useState<number | null>(null);

  const base = `/${locale}`;
  const loginHref = `${base}/login`;
  const coursesHref = `${base}/admin/courses`;

  useEffect(() => {
    if (authStatus !== "authenticated") {
      return;
    }
    const session = getSession();
    if (!session) {
      return;
    }
    let cancelled = false;
    fetch(`/api/admin/courses/${courseId}`, {
      headers: { Authorization: `Bearer ${session.token}` },
    })
      .then(async (response) => {
        if (cancelled || !response.ok) {
          return;
        }
        const data = (await response.json()) as {
          course: CourseDetail;
          lessons: LessonRow[];
        };
        setCourse(data.course);
        setLessons(data.lessons);
        setMetaForm({
          title_id: data.course.title_id,
          title_en: data.course.title_en,
          description_id: data.course.description_id,
          description_en: data.course.description_en,
        });
      })
      .catch(() => {
        // Load errors surface as an empty page with the loading spinner gone.
      });
    return () => {
      cancelled = true;
    };
  }, [authStatus, courseId]);

  const handleMetaSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMetaSaving(true);
    setMetaStatus("idle");
    const session = getSession();
    if (!session) {
      setMetaStatus("error");
      setMetaSaving(false);
      return;
    }
    try {
      const response = await fetch(`/api/admin/courses/${courseId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify(metaForm),
      });
      setMetaStatus(response.ok ? "saved" : "error");
    } catch {
      setMetaStatus("error");
    } finally {
      setMetaSaving(false);
    }
  };

  return (
    <div className="flex flex-col">
      <section aria-labelledby="admin-course-detail-heading">
        <Container className="flex max-w-3xl flex-col items-start gap-5 py-12 sm:py-20">
          <Link href={coursesHref} className={cardLinkClasses}>
            {copy.backLabel}
          </Link>
          <Badge variant="accent">{copy.hero.eyebrow}</Badge>
          <Heading level={1} id="admin-course-detail-heading">
            {course ? course.title_id : copy.hero.title}
          </Heading>
          {course ? (
            <Text size="lg" muted>
              {course.title_en}
            </Text>
          ) : null}
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

      {authStatus === "loading" || (authStatus === "authenticated" && !course) ? (
        <Container className="flex items-center gap-3 py-8" role="status">
          <Spinner className="h-5 w-5 text-primary-600" />
          <Text muted>{copy.loading}</Text>
        </Container>
      ) : null}

      {authStatus === "authenticated" && course ? (
        <>
          <section
            aria-labelledby="admin-course-meta-heading"
            className="bg-background-muted"
          >
            <Container className="flex flex-col gap-6 py-12 sm:py-16">
              <div className="flex max-w-3xl flex-col gap-3">
                <Heading level={2} id="admin-course-meta-heading">
                  {copy.courseMetaTitle}
                </Heading>
                <Text muted>{copy.courseMetaDescription}</Text>
              </div>
              <Card>
                <form
                  onSubmit={handleMetaSubmit}
                  noValidate
                  className="flex flex-col gap-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label={`${copy.fieldLabels.title} — ${copy.languageLabels.id}`}
                      required
                      value={metaForm.title_id}
                      onChange={(event) =>
                        setMetaForm((current) => ({
                          ...current,
                          title_id: event.target.value,
                        }))
                      }
                      disabled={metaSaving}
                    />
                    <Input
                      label={`${copy.fieldLabels.title} — ${copy.languageLabels.en}`}
                      required
                      value={metaForm.title_en}
                      onChange={(event) =>
                        setMetaForm((current) => ({
                          ...current,
                          title_en: event.target.value,
                        }))
                      }
                      disabled={metaSaving}
                    />
                    <Textarea
                      label={`${copy.fieldLabels.description} — ${copy.languageLabels.id}`}
                      required
                      value={metaForm.description_id}
                      onChange={(event) =>
                        setMetaForm((current) => ({
                          ...current,
                          description_id: event.target.value,
                        }))
                      }
                      disabled={metaSaving}
                    />
                    <Textarea
                      label={`${copy.fieldLabels.description} — ${copy.languageLabels.en}`}
                      required
                      value={metaForm.description_en}
                      onChange={(event) =>
                        setMetaForm((current) => ({
                          ...current,
                          description_en: event.target.value,
                        }))
                      }
                      disabled={metaSaving}
                    />
                  </div>
                  {metaStatus === "saved" ? (
                    <Alert variant="success">{copy.saved}</Alert>
                  ) : null}
                  {metaStatus === "error" ? (
                    <Alert variant="error">{copy.saveError}</Alert>
                  ) : null}
                  <div className="flex flex-wrap gap-3">
                    <Button type="submit" loading={metaSaving}>
                      {metaSaving ? copy.saving : copy.save}
                    </Button>
                  </div>
                </form>
              </Card>
            </Container>
          </section>

          <section aria-labelledby="admin-lessons-heading">
            <Container className="flex flex-col gap-6 py-12 sm:py-16">
              <div className="flex max-w-3xl flex-col gap-3">
                <Heading level={2} id="admin-lessons-heading">
                  {copy.lessonsTitle}
                </Heading>
                <Text muted>{copy.lessonsDescription}</Text>
              </div>
              <ol className="flex flex-col gap-4">
                {lessons?.map((lesson) => (
                  <li key={lesson.id}>
                    <Card className="flex flex-col gap-3">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="primary">
                            {copy.lessonLabel} {lesson.position}
                          </Badge>
                          <Badge variant="neutral">{lesson.lesson_id}</Badge>
                          {lesson.optionality === "optional" ? (
                            <Badge variant="warning">{lesson.optionality}</Badge>
                          ) : null}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          aria-expanded={editingLessonId === lesson.id}
                          onClick={() =>
                            setEditingLessonId((current) =>
                              current === lesson.id ? null : lesson.id,
                            )
                          }
                        >
                          {editingLessonId === lesson.id
                            ? copy.cancel
                            : copy.editLesson}
                        </Button>
                      </div>
                      <Heading level={3}>{lesson.title_id}</Heading>
                      <Text size="sm" muted>
                        {lesson.title_en}
                      </Text>
                      {editingLessonId === lesson.id ? (
                        <LessonEditForm
                          copy={copy}
                          lessonId={lesson.id}
                        />
                      ) : null}
                    </Card>
                  </li>
                ))}
              </ol>
            </Container>
          </section>
        </>
      ) : null}
    </div>
  );
}

function LessonEditForm({
  copy,
  lessonId,
}: {
  copy: AdminCoursesCopy;
  lessonId: number;
}) {
  const [lesson, setLesson] = useState<LessonDetail | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  useEffect(() => {
    const session = getSession();
    if (!session) {
      return;
    }
    let cancelled = false;
    fetch(`/api/admin/lessons/${lessonId}`, {
      headers: { Authorization: `Bearer ${session.token}` },
    })
      .then(async (response) => {
        if (!cancelled && response.ok) {
          setLesson((await response.json()) as LessonDetail);
        }
      })
      .catch(() => {
        // Load errors surface as the form staying empty.
      });
    return () => {
      cancelled = true;
    };
  }, [lessonId]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!lesson) {
      return;
    }
    setSaving(true);
    setStatus("idle");
    const session = getSession();
    if (!session) {
      setStatus("error");
      setSaving(false);
      return;
    }
    const payload: Record<string, string | null> = {};
    for (const field of LESSON_FIELDS) {
      const idValue = lesson[field.idField];
      const enValue = lesson[field.enField];
      if (field.key === "exampleCode") {
        payload.example_code = typeof enValue === "string" ? enValue : null;
      } else {
        payload[field.idField as string] = typeof idValue === "string" ? idValue : null;
        payload[field.enField as string] = typeof enValue === "string" ? enValue : null;
      }
    }
    try {
      const response = await fetch(`/api/admin/lessons/${lessonId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify(payload),
      });
      setStatus(response.ok ? "saved" : "error");
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  if (!lesson) {
    return (
      <div className="flex items-center gap-3 py-2" role="status">
        <Spinner className="h-4 w-4 text-primary-600" />
        <Text size="sm" muted>
          {copy.loading}
        </Text>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 border-t border-border pt-4"
    >
      {LESSON_FIELDS.map((field) => {
        const label = copy.fieldLabels[field.key];
        const idValue = lesson[field.idField];
        const enValue = lesson[field.enField];
        const Control = field.multiline ? Textarea : Input;
        if (field.key === "exampleCode") {
          return (
            <div
              key={field.key}
              className="flex flex-col gap-1.5 rounded-lg border border-border bg-background-muted p-4"
            >
              <Control
                label={label}
                className="font-mono"
                value={typeof idValue === "string" ? idValue : ""}
                onChange={(event) => {
                  const value = event.target.value;
                  setLesson((current) => {
                    if (!current) {
                      return current;
                    }
                    return { ...current, example_code: value };
                  });
                }}
                disabled={saving}
              />
            </div>
          );
        }
        return (
          <div
            key={field.key}
            className="grid gap-4 rounded-lg border border-border bg-background-muted p-4 sm:grid-cols-2"
          >
            <Control
              label={`${label} — ${copy.languageLabels.id}`}
              value={typeof idValue === "string" ? idValue : ""}
              onChange={(event) => {
                const value = event.target.value;
                setLesson((current) => {
                  if (!current) {
                    return current;
                  }
                  const next: LessonDetail = { ...current };
                  (next as unknown as Record<string, string | null>)[field.idField] = value;
                  return next;
                });
              }}
              disabled={saving}
            />
            <Control
              label={`${label} — ${copy.languageLabels.en}`}
              value={typeof enValue === "string" ? enValue : ""}
              onChange={(event) => {
                const value = event.target.value;
                setLesson((current) => {
                  if (!current) {
                    return current;
                  }
                  const next: LessonDetail = { ...current };
                  (next as unknown as Record<string, string | null>)[field.enField] = value;
                  return next;
                });
              }}
              disabled={saving}
            />
          </div>
        );
      })}
      {status === "saved" ? <Alert variant="success">{copy.saved}</Alert> : null}
      {status === "error" ? <Alert variant="error">{copy.saveError}</Alert> : null}
      <div className="flex flex-wrap gap-3">
        <Button type="submit" loading={saving}>
          {saving ? copy.saving : copy.save}
        </Button>
      </div>
    </form>
  );
}
