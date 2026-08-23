import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

const primaryLinkClasses =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary-600 px-6 text-base font-medium text-white transition-colors duration-fast hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const secondaryLinkClasses =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md border border-strong bg-transparent px-6 text-base font-medium text-foreground transition-colors duration-fast hover:bg-background-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="mt-0.5 h-5 w-5 shrink-0 text-primary-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
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

export default async function PythonStage0Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const t = getDictionary(locale);
  const stage0 = t.pythonStage0;

  const localizeHref = (href: string) => `/${locale}${href}`;

  return (
    <div className="flex flex-col">
      <Container className="pt-8 sm:pt-12">
        <Alert variant="info" title={stage0.prototypeNotice.title}>
          {stage0.prototypeNotice.description}
        </Alert>
      </Container>

      <section aria-labelledby="stage0-hero-heading">
        <Container className="flex max-w-3xl flex-col items-start gap-5 py-12 sm:py-20">
          <Badge variant="accent">{stage0.hero.eyebrow}</Badge>
          <Heading level={1} id="stage0-hero-heading">
            {stage0.hero.title}
          </Heading>
          <Text size="lg" muted>
            {stage0.hero.description}
          </Text>
          <div className="flex flex-wrap gap-3">
            <Link href={localizeHref("/register")} className={primaryLinkClasses}>
              {stage0.hero.primaryCta}
            </Link>
            <Link href={localizeHref("/learning-path")} className={secondaryLinkClasses}>
              {stage0.hero.secondaryCta}
            </Link>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="stage0-overview-heading"
        className="bg-background-muted"
      >
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="flex max-w-3xl flex-col gap-3">
            <Heading level={2} id="stage0-overview-heading">
              {stage0.overview.title}
            </Heading>
            <Text muted>{stage0.overview.description}</Text>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {stage0.overview.items.map((item) => (
              <li key={item}>
                <Card className="flex h-full items-start gap-3">
                  <CheckIcon />
                  <Text size="sm" muted>
                    {item}
                  </Text>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="stage0-lessons-heading">
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="flex max-w-3xl flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Heading level={2} id="stage0-lessons-heading">
                {stage0.lessons.title}
              </Heading>
              <Badge variant="success">{stage0.lessons.freeLabel}</Badge>
            </div>
            <Text muted>{stage0.lessons.description}</Text>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stage0.lessons.items.map((lesson, index) => (
              <li key={lesson.title}>
                <Link
                  href={`${localizeHref("/learning-path/stage-0")}/${String(index + 1).padStart(2, "0")}`}
                  className="group block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Card interactive className="flex h-full flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <Text size="sm" className="font-semibold text-primary-on-tint">
                        {String(index + 1).padStart(2, "0")}
                      </Text>
                      {lesson.optionality === "optional" ? (
                        <Badge variant="neutral">{stage0.lessons.optionalLabel}</Badge>
                      ) : null}
                    </div>
                    <Heading level={3}>{lesson.title}</Heading>
                    <Text size="sm" muted>
                      {lesson.description}
                    </Text>
                    <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-primary-600 transition-colors duration-fast group-hover:text-primary-700">
                      {stage0.lessonDetail.openLabel}
                      <ArrowIcon />
                    </span>
                  </Card>
                </Link>
              </li>
            ))}
          </ol>
          <Alert variant="warning" title={stage0.demoNote.title}>
            {stage0.demoNote.description}
          </Alert>
        </Container>
      </section>

      <section
        aria-labelledby="stage0-cta-heading"
        className="bg-background-muted"
      >
        <Container className="flex max-w-3xl flex-col items-start gap-4 py-12 sm:py-16">
          <Heading level={2} id="stage0-cta-heading">
            {stage0.cta.title}
          </Heading>
          <Text muted>{stage0.cta.description}</Text>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link href={localizeHref("/register")} className={primaryLinkClasses}>
              {stage0.cta.primaryCta}
            </Link>
            <Link href={localizeHref("/learning-path")} className={secondaryLinkClasses}>
              {stage0.cta.secondaryCta}
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
