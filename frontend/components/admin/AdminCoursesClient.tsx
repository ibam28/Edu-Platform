"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { Text } from "@/components/ui/Text";
import { getSession } from "@/lib/auth/session";
import { useAdminAuth } from "@/components/admin/useAdminAuth";
import type { AdminCoursesCopy } from "@/lib/i18n/dictionaries";

const primaryLinkClasses =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary-600 px-6 text-base font-medium text-white transition-colors duration-fast hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const cardLinkClasses =
  "inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export interface AdminCoursesClientProps {
  copy: AdminCoursesCopy;
  locale: string;
}

interface CourseRow {
  id: number;
  slug: string;
  stage: string;
  title_id: string;
  title_en: string;
  updated_at: string;
}

export function AdminCoursesClient({
  copy,
  locale,
}: AdminCoursesClientProps) {
  const authStatus = useAdminAuth();
  const [courses, setCourses] = useState<CourseRow[] | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [form, setForm] = useState({
    slug: "",
    stage: "stage_0",
    title_id: "",
    title_en: "",
    description_id: "",
    description_en: "",
  });

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
    fetch("/api/admin/courses", {
      headers: { Authorization: `Bearer ${session.token}` },
    })
      .then(async (response) => {
        if (cancelled) {
          return;
        }
        if (response.ok) {
          const data = (await response.json()) as { courses: CourseRow[] };
          setCourses(data.courses);
        } else {
          setCourses([]);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCourses([]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [authStatus]);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCreating(true);
    setCreateError(null);
    const session = getSession();
    if (!session) {
      setCreateError(copy.create.serverError);
      setCreating(false);
      return;
    }
    try {
      const response = await fetch("/api/admin/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setCreateOpen(false);
        setForm({
          slug: "",
          stage: "stage_0",
          title_id: "",
          title_en: "",
          description_id: "",
          description_en: "",
        });
        const data = (await response.json()) as { id: number };
        window.location.assign(`${base}/admin/courses/${data.id}`);
      } else if (response.status === 409) {
        setCreateError(copy.create.slugExists);
      } else if (response.status === 422) {
        setCreateError(copy.create.validationError);
      } else {
        setCreateError(copy.create.serverError);
      }
    } catch {
      setCreateError(copy.create.serverError);
    } finally {
      setCreating(false);
    }
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString(locale === "en" ? "en-US" : "id-ID");
    } catch {
      return iso;
    }
  };

  return (
    <div className="flex flex-col">
      <section aria-labelledby="admin-courses-hero-heading">
        <Container className="flex max-w-3xl flex-col items-start gap-5 py-12 sm:py-20">
          <Badge variant="accent">{copy.hero.eyebrow}</Badge>
          <Heading level={1} id="admin-courses-hero-heading">
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
        aria-labelledby="admin-courses-list-heading"
        className="bg-background-muted"
      >
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex max-w-3xl flex-col gap-3">
              <Heading level={2} id="admin-courses-list-heading">
                {copy.list.title}
              </Heading>
              <Text muted>{copy.list.description}</Text>
            </div>
            {authStatus === "authenticated" ? (
              <Button
                type="button"
                onClick={() => setCreateOpen((open) => !open)}
                aria-expanded={createOpen}
              >
                {copy.create.title}
              </Button>
            ) : null}
          </div>

          {createOpen && authStatus === "authenticated" ? (
            <Card className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Heading level={3}>{copy.create.title}</Heading>
                <Text size="sm" muted>
                  {copy.create.description}
                </Text>
              </div>
              <form onSubmit={handleCreate} noValidate className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label={copy.create.labels.slug}
                    placeholder="my-course"
                    required
                    value={form.slug}
                    onChange={(event) => handleChange("slug", event.target.value)}
                    disabled={creating}
                  />
                  <Input
                    label={copy.create.labels.stage}
                    placeholder="stage_0"
                    required
                    value={form.stage}
                    onChange={(event) => handleChange("stage", event.target.value)}
                    disabled={creating}
                  />
                  <Input
                    label={copy.create.labels.titleId}
                    required
                    value={form.title_id}
                    onChange={(event) => handleChange("title_id", event.target.value)}
                    disabled={creating}
                  />
                  <Input
                    label={copy.create.labels.titleEn}
                    required
                    value={form.title_en}
                    onChange={(event) => handleChange("title_en", event.target.value)}
                    disabled={creating}
                  />
                  <Input
                    label={copy.create.labels.descriptionId}
                    required
                    value={form.description_id}
                    onChange={(event) =>
                      handleChange("description_id", event.target.value)
                    }
                    disabled={creating}
                  />
                  <Input
                    label={copy.create.labels.descriptionEn}
                    required
                    value={form.description_en}
                    onChange={(event) =>
                      handleChange("description_en", event.target.value)
                    }
                    disabled={creating}
                  />
                </div>
                {createError ? <Alert variant="error">{createError}</Alert> : null}
                <div className="flex flex-wrap gap-3">
                  <Button type="submit" loading={creating}>
                    {creating ? copy.create.creating : copy.create.submit}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCreateOpen(false)}
                    disabled={creating}
                  >
                    {copy.cancel}
                  </Button>
                </div>
              </form>
            </Card>
          ) : null}

          {authStatus === "loading" || (authStatus === "authenticated" && courses === null) ? (
            <div className="flex items-center gap-3" role="status">
              <Spinner className="h-5 w-5 text-primary-600" />
              <Text muted>{copy.loading}</Text>
            </div>
          ) : null}

          {authStatus === "authenticated" && courses !== null ? (
            courses.length === 0 ? (
              <EmptyState
                title={copy.list.emptyTitle}
                description={copy.list.emptyDescription}
              />
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <li key={course.id}>
                    <Card className="flex h-full flex-col gap-3">
                      <Badge variant="primary" className="self-start">
                        {course.stage}
                      </Badge>
                      <Heading level={3}>{course.title_id}</Heading>
                      <Text size="sm" muted>
                        {course.title_en}
                      </Text>
                      <Text size="sm" subtle>
                        {copy.table.updated}: {formatDate(course.updated_at)}
                      </Text>
                      <Link
                        href={`${base}/admin/courses/${course.id}`}
                        className={`${cardLinkClasses} mt-auto pt-1`}
                      >
                        {copy.list.title}
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
