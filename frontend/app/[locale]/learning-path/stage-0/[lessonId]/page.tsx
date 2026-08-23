import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n";
import { dictionaries, getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { LessonProgress } from "@/components/lesson/LessonProgress";

const primaryLinkClasses =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary-600 px-6 text-base font-medium text-white transition-colors duration-fast hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const secondaryLinkClasses =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md border border-strong bg-transparent px-6 text-base font-medium text-foreground transition-colors duration-fast hover:bg-background-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
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
      {direction === "left" ? (
        <path d="m15 18-6-6 6-6" />
      ) : (
        <path d="m9 18 6-6-6-6" />
      )}
    </svg>
  );
}

function lessonIdOf(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function generateStaticParams() {
  const lessonCount = dictionaries.id.pythonStage0.lessons.items.length;
  return locales.flatMap((locale) =>
    Array.from({ length: lessonCount }, (_, index) => ({
      locale,
      lessonId: lessonIdOf(index),
    })),
  );
}

export default async function LessonDetailPage({
  params,
}: {
  params: Promise<{ locale: string; lessonId: string }>;
}) {
  const { locale, lessonId } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const t = getDictionary(locale);
  const stage0 = t.pythonStage0;
  const detail = stage0.lessonDetail;

  const localizeHref = (href: string) => `/${locale}${href}`;

  const numericId = Number(lessonId);
  const index = Number.isInteger(numericId) ? numericId - 1 : -1;
  const idIsValid = lessonId === lessonIdOf(index);
  if (!idIsValid || index < 0 || index >= stage0.lessons.items.length) {
    notFound();
  }

  const lesson = stage0.lessons.items[index];
  const content = stage0.seedLessons.items[index];
  const stage0Href = localizeHref("/learning-path/stage-0");
  const lessonHref = (lessonIndex: number) =>
    `${stage0Href}/${lessonIdOf(lessonIndex)}`;
  const hasPrevious = index > 0;
  const hasNext = index < stage0.lessons.items.length - 1;

  return (
    <div className="flex flex-col">
      <Container className="pt-8 sm:pt-12">
        <Alert variant="info" title={detail.prototypeNotice.title}>
          {detail.prototypeNotice.description}
        </Alert>
      </Container>

      <article aria-labelledby="lesson-heading">
        <Container className="flex max-w-3xl flex-col gap-6 py-12 sm:py-16">
          <Link href={stage0Href} className={`${secondaryLinkClasses} self-start`}>
            <ArrowIcon direction="left" />
            {detail.backToStage0}
          </Link>

          <header className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary">
                {detail.labels.lesson} {lessonIdOf(index)}
              </Badge>
              {lesson.optionality === "optional" ? (
                <Badge variant="neutral">{stage0.lessons.optionalLabel}</Badge>
              ) : null}
            </div>
            <Heading level={1} id="lesson-heading">
              {lesson.title}
            </Heading>
            <Text size="lg" muted>
              {lesson.description}
            </Text>
          </header>

          {content ? (
            <div className="flex flex-col gap-10">
              <section aria-labelledby="lesson-objective-heading">
                <Heading level={2} id="lesson-objective-heading">
                  {detail.labels.objective}
                </Heading>
                <Text muted>{content.objective}</Text>
              </section>

              <section aria-labelledby="lesson-explanation-heading">
                <Heading level={2} id="lesson-explanation-heading">
                  {detail.labels.explanation}
                </Heading>
                <div className="flex flex-col gap-3">
                  {content.explanation.map((paragraph) => (
                    <Text key={paragraph} muted>
                      {paragraph}
                    </Text>
                  ))}
                </div>
              </section>

              <section aria-labelledby="lesson-example-heading">
                <Heading level={2} id="lesson-example-heading">
                  {detail.labels.example}
                </Heading>
                <div className="flex flex-col gap-3">
                  <CodeBlock title={content.example.title} code={content.example.code} />
                  <Text muted>{content.example.explanation}</Text>
                </div>
              </section>

              <section aria-labelledby="lesson-mistakes-heading">
                <Heading level={2} id="lesson-mistakes-heading">
                  {detail.labels.commonMistakes}
                </Heading>
                <ul className="flex list-inside list-disc flex-col gap-2">
                  {content.mistakes.map((mistake) => (
                    <li key={mistake}>
                      <Text size="sm" muted>
                        {mistake}
                      </Text>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="lesson-exercise-heading">
                <Heading level={2} id="lesson-exercise-heading">
                  {detail.labels.exercise}
                </Heading>
                <Card className="flex flex-col gap-4">
                  <Heading level={3}>{content.exercise.title}</Heading>
                  <Text muted>{content.exercise.description}</Text>
                  <div className="rounded-md border border-border bg-background-muted p-4">
                    <Text size="sm" className="font-semibold">
                      {detail.labels.hint}
                    </Text>
                    <Text size="sm" muted>
                      {content.exercise.hint}
                    </Text>
                  </div>
                  <Text size="sm" subtle>
                    {detail.exerciseNote}
                  </Text>
                  <div className="pt-1">
                    {hasNext ? (
                      <Link href={lessonHref(index + 1)} className={primaryLinkClasses}>
                        {detail.exerciseCta}
                        <ArrowIcon direction="right" />
                      </Link>
                    ) : (
                      <Link href={stage0Href} className={primaryLinkClasses}>
                        {detail.navigation.allLessons}
                      </Link>
                    )}
                  </div>
                </Card>
              </section>
            </div>
          ) : (
            <EmptyState title={detail.empty.title} description={detail.empty.description} />
          )}

          <LessonProgress
            lessonId={lessonIdOf(index)}
            nextHref={hasNext ? lessonHref(index + 1) : null}
            allLessonsHref={stage0Href}
            markCompleteLabel={detail.progress.markComplete}
            completedLabel={detail.progress.completed}
            completedNote={detail.progress.completedNote}
            undoLabel={detail.progress.undo}
            continueLabel={detail.exerciseCta}
            allLessonsLabel={detail.navigation.allLessons}
          />

          <nav
            aria-label={detail.labels.navigation}
            className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6"
          >
            {hasPrevious ? (
              <Link href={lessonHref(index - 1)} className={secondaryLinkClasses}>
                <ArrowIcon direction="left" />
                {detail.navigation.previous}
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
            <Link href={stage0Href} className={secondaryLinkClasses}>
              {detail.navigation.allLessons}
            </Link>
            {hasNext ? (
              <Link href={lessonHref(index + 1)} className={primaryLinkClasses}>
                {detail.navigation.next}
                <ArrowIcon direction="right" />
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
          </nav>
        </Container>
      </article>
    </div>
  );
}
