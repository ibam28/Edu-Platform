import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary, type StageStatus } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Alert } from "@/components/ui/Alert";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

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

export default async function LearningPathPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const t = getDictionary(locale);
  const learningPath = t.learningPath;
  const statusLabels = t.home.stages.statusLabels;
  const assessments = t.demoAssessments;

  const localizeHref = (href: string) => `/${locale}${href}`;
  const homeHref = `/${locale}`;

  return (
    <div className="flex flex-col">
      <Container className="pt-8 sm:pt-12">
        <Alert variant="info" title={learningPath.prototypeNotice.title}>
          {learningPath.prototypeNotice.description}
        </Alert>
      </Container>

      <section aria-labelledby="learning-path-hero-heading">
        <Container className="flex max-w-3xl flex-col items-start gap-5 py-12 sm:py-20">
          <Badge variant="accent">{learningPath.hero.eyebrow}</Badge>
          <Heading level={1} id="learning-path-hero-heading">
            {learningPath.hero.title}
          </Heading>
          <Text size="lg" muted>
            {learningPath.hero.description}
          </Text>
          <div className="flex flex-wrap gap-3">
            <Link href={localizeHref("/register")} className={primaryLinkClasses}>
              {learningPath.hero.primaryCta}
            </Link>
            <Link href={homeHref} className={secondaryLinkClasses}>
              {learningPath.hero.secondaryCta}
            </Link>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="learning-path-stages-heading"
        className="bg-background-muted"
      >
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="flex max-w-3xl flex-col gap-3">
            <Heading level={2} id="learning-path-stages-heading">
              {learningPath.stages.title}
            </Heading>
            <Text muted>{learningPath.stages.description}</Text>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {learningPath.stages.items.map((stage) => (
              <li key={stage.title}>
                <Card className="flex h-full flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {stage.statuses.map((status) => (
                      <Badge key={status} variant={stageBadgeVariant[status]}>
                        {statusLabels[status]}
                      </Badge>
                    ))}
                    {stage.locked ? (
                      <Badge variant="neutral">{learningPath.lockedLabel}</Badge>
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
                            : localizeHref(stage.cta.href)
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
                        {learningPath.lockedLabel}
                      </span>
                    ) : null}
                  </div>
                </Card>
              </li>
            ))}
          </ol>
          <Alert variant="warning" title={learningPath.demoNote.title}>
            {learningPath.demoNote.description}
          </Alert>
        </Container>
      </section>

      <section aria-labelledby="learning-path-demos-heading">
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="flex max-w-3xl flex-col gap-3">
            <Heading level={2} id="learning-path-demos-heading">
              {assessments.learningPathSection.title}
            </Heading>
            <Text muted>{assessments.learningPathSection.description}</Text>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {assessments.stages.map((demo) => (
              <li key={demo.stage}>
                <Card className="flex h-full flex-col gap-3">
                  <Badge variant="warning">{assessments.demoLabel}</Badge>
                  <Heading level={3}>{demo.title}</Heading>
                  <Text size="sm" muted>
                    {demo.description}
                  </Text>
                  <Link
                    href={`${localizeHref("/learning-path/assessment")}/${demo.stage}`}
                    className={`${cardLinkClasses} mt-auto pt-1`}
                  >
                    {assessments.learningPathSection.openLabel}
                  </Link>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="learning-path-availability-heading">
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="flex max-w-3xl flex-col gap-3">
            <Heading level={2} id="learning-path-availability-heading">
              {learningPath.availability.title}
            </Heading>
            <Text muted>{learningPath.availability.description}</Text>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="flex flex-col gap-3">
              <Badge variant="success">{learningPath.availability.freeLabel}</Badge>
              <ul className="flex list-inside list-disc flex-col gap-2">
                {learningPath.availability.freeItems.map((item) => (
                  <li key={item}>
                    <Text size="sm" muted>
                      {item}
                    </Text>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="flex flex-col gap-3">
              <Badge variant="warning">{learningPath.availability.futureLabel}</Badge>
              <ul className="flex list-inside list-disc flex-col gap-2">
                {learningPath.availability.futureItems.map((item) => (
                  <li key={item}>
                    <Text size="sm" muted>
                      {item}
                    </Text>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="learning-path-cta-heading"
        className="bg-background-muted"
      >
        <Container className="flex max-w-3xl flex-col items-start gap-4 py-12 sm:py-16">
          <Heading level={2} id="learning-path-cta-heading">
            {learningPath.cta.title}
          </Heading>
          <Text muted>{learningPath.cta.description}</Text>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link href={localizeHref("/register")} className={primaryLinkClasses}>
              {learningPath.cta.primaryCta}
            </Link>
            <Link href={localizeHref("/vision")} className={secondaryLinkClasses}>
              {learningPath.cta.secondaryCta}
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
