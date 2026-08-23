import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary, type StageStatus } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { HeroPreview } from "@/components/home/HeroPreview";
import {
  ArrowRightIcon,
  BookIcon,
  BriefcaseIcon,
  ChartIcon,
  CheckIcon,
  ClipboardIcon,
  LockIcon,
  ShieldIcon,
  SparkIcon,
} from "@/components/home/HomeIcons";

const primaryLinkClasses =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary-600 px-6 text-base font-medium text-white transition-all duration-fast hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const secondaryLinkClasses =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md border border-strong bg-transparent px-6 text-base font-medium text-foreground transition-all duration-fast hover:-translate-y-0.5 hover:bg-background-subtle hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const cardLinkClasses =
  "inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors duration-fast hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const stageBadgeVariant: Record<StageStatus, BadgeVariant> = {
  free: "success",
  demo: "primary",
  paid: "warning",
  comingSoon: "neutral",
};

const principleIcons = [SparkIcon, BookIcon, ClipboardIcon, ChartIcon];

const stageIllustrations = [
  "/assets/illustrations/stages/stage-0-python.svg",
  "/assets/illustrations/stages/stage-1-project.svg",
  "/assets/illustrations/stages/stage-2-assessment.svg",
  "/assets/illustrations/stages/stage-3-certification.svg",
  "/assets/illustrations/stages/stage-4-career.svg",
];

const capabilityIllustrations = [
  "/assets/illustrations/platform/platform-learning.svg",
  "/assets/illustrations/platform/platform-code-practice.svg",
  "/assets/illustrations/platform/platform-assessment.svg",
  "/assets/illustrations/platform/platform-progress.svg",
  "/assets/illustrations/platform/platform-dashboard.svg",
  "/assets/illustrations/platform/platform-security.svg",
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const t = getDictionary(locale);
  const home = t.home;

  const localizeHref = (href: string) => `/${locale}${href}`;
  const stage0Href = localizeHref("/learning-path/stage-0");
  const learningPathHref = localizeHref("/learning-path");
  const registerHref = localizeHref("/register");

  return (
    <div className="flex flex-col">
      {/* ============ HERO ============ */}
      <section
        aria-labelledby="home-hero-heading"
        className="relative overflow-hidden"
      >
        {/* Technical grid texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]"
        />
        {/* Soft gradient wash */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-50 via-transparent to-accent-50"
        />

        <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-up flex flex-col items-start gap-5">
            <Badge variant="accent">{home.hero.eyebrow}</Badge>
            <Heading level={1} id="home-hero-heading" className="max-w-xl">
              {home.hero.title}
            </Heading>
            <Text size="lg" muted className="max-w-xl">
              {home.hero.description}
            </Text>
            <div className="flex flex-wrap gap-3">
              <Link href={stage0Href} className={primaryLinkClasses}>
                {home.hero.primaryCta}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link href={registerHref} className={secondaryLinkClasses}>
                {home.hero.secondaryCta}
              </Link>
            </div>
            <Text size="sm" subtle className="flex items-center gap-2">
              <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-warning" />
              {home.hero.prototypeNote}
            </Text>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
            <HeroPreview copy={home.heroVisual} />
          </div>
        </Container>
      </section>

      {/* ============ PROTOTYPE NOTICE (integrated) ============ */}
      <section aria-label={home.prototypeNotice.title}>
        <Container>
          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-background-muted px-4 py-3">
            <Badge variant="warning">{home.prototypeNotice.title}</Badge>
            <Text size="sm" muted>
              {home.prototypeNotice.description}
            </Text>
          </div>
        </Container>
      </section>

      {/* ============ PRINCIPLES / TRUST ============ */}
      <section aria-labelledby="home-principles-heading">
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="flex max-w-3xl flex-col gap-3">
            <Heading level={2} id="home-principles-heading">
              {home.principles.title}
            </Heading>
            <Text muted>{home.principles.description}</Text>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {home.principles.items.map((item, index) => {
              const Icon = principleIcons[index] ?? SparkIcon;
              return (
                <li key={item.title}>
                  <Card
                    interactive
                    className="h-full transition-all duration-fast hover:-translate-y-0.5"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-on-tint">
                      <Icon className="h-5 w-5" />
                    </span>
                    <Heading level={3} className="mt-3">
                      {item.title}
                    </Heading>
                    <Text size="sm" muted className="mt-1">
                      {item.description}
                    </Text>
                  </Card>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ============ LEARNING JOURNEY ============ */}
      <section
        aria-labelledby="home-journey-heading"
        className="relative overflow-hidden bg-background-muted"
      >
        {/* Decorative pathway pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-50"
          style={{ backgroundImage: "url('/assets/illustrations/decorative/pathway-pattern.svg')", backgroundSize: "200px 60px", backgroundRepeat: "repeat-x", backgroundPosition: "center 120%" }}
        />
        <Container className="flex flex-col gap-8 py-12 sm:py-16">
          <div className="flex max-w-3xl flex-col gap-3">
            <Heading level={2} id="home-journey-heading">
              {home.journey.title}
            </Heading>
            <Text muted>{home.journey.description}</Text>
          </div>

          <ol className="relative flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-0">
            {/* Connecting line: vertical on mobile, horizontal on desktop */}
            <span
              aria-hidden="true"
              className="absolute bottom-4 left-[1.375rem] top-4 w-px bg-border lg:left-4 lg:right-4 lg:top-1/2 lg:h-px lg:w-auto"
            />
            {home.journey.steps.map((step, index) => (
              <li
                key={step.title}
                className="relative flex gap-4 lg:flex-1 lg:flex-col lg:items-center lg:gap-3 lg:px-3 lg:text-center"
              >
                <span className="relative z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-primary-600 bg-surface font-semibold text-primary-600 shadow-sm transition-all duration-fast hover:-translate-y-0.5 hover:shadow-md">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1 lg:items-center">
                  <Heading level={3} className="text-base">
                    {step.title}
                  </Heading>
                  <Text size="sm" muted>
                    {step.description}
                  </Text>
                </div>
              </li>
            ))}
          </ol>

          {/* Journey illustration — decorative wide banner */}
          <img
            src="/assets/illustrations/journey/learning-journey.svg"
            alt=""
            aria-hidden="true"
            width={1100}
            height={160}
            loading="lazy"
            className="mt-2 hidden h-auto w-full max-w-full lg:block"
            draggable={false}
          />
        </Container>
      </section>

      {/* ============ STAGE 0–4 PATHWAY ============ */}
      <section aria-labelledby="home-stages-heading">
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="flex max-w-3xl flex-col gap-3">
            <Heading level={2} id="home-stages-heading">
              {home.stages.title}
            </Heading>
            <Text muted>{home.stages.description}</Text>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {home.stages.items.map((stage, index) => {
              const available = index === 0 || index === 1;
              const stageHref =
                index === 0 ? stage0Href : index === 1 ? localizeHref("/learning-path/assessment/1") : null;
              return (
                <li key={stage.title}>
                  <Card
                    interactive={available}
                    className={`flex h-full flex-col gap-3 transition-all duration-fast ${
                      available ? "hover:-translate-y-0.5" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <img
                        src={stageIllustrations[index]}
                        alt=""
                        aria-hidden="true"
                        width={96}
                        height={96}
                        loading="lazy"
                        className={`h-16 w-16 shrink-0 ${
                          available ? "" : "opacity-80"
                        }`}
                        draggable={false}
                      />
                      <div className="flex flex-wrap justify-end gap-1">
                        {stage.statuses.map((status) => (
                          <Badge key={status} variant={stageBadgeVariant[status]}>
                            {home.stages.statusLabels[status]}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Heading level={3} className="text-base">
                      {stage.title}
                    </Heading>
                    <Text size="sm" muted>
                      {stage.description}
                    </Text>
                    <div className="mt-auto pt-1">
                      {stageHref ? (
                        <Link href={stageHref} className={cardLinkClasses}>
                          {index === 0
                            ? home.hero.primaryCta
                            : home.heroVisual.assessmentValue}
                          <ArrowRightIcon className="h-4 w-4" />
                        </Link>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-subtle">
                          <LockIcon className="h-4 w-4" />
                          {home.heroVisual.lockedStage}
                        </span>
                      )}
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ============ PLATFORM CAPABILITIES ============ */}
      <section
        aria-labelledby="home-capabilities-heading"
        className="bg-background-muted"
      >
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="flex max-w-3xl flex-col gap-3">
            <Heading level={2} id="home-capabilities-heading">
              {home.capabilities.title}
            </Heading>
            <Text muted>{home.capabilities.description}</Text>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {home.capabilities.items.map((item, index) => (
              <li key={item.title}>
                <Card
                  interactive
                  className="h-full transition-all duration-fast hover:-translate-y-0.5"
                >
                  <img
                    src={capabilityIllustrations[index]}
                    alt=""
                    aria-hidden="true"
                    width={120}
                    height={120}
                    loading="lazy"
                    className="h-14 w-14"
                    draggable={false}
                  />
                  <Heading level={3} className="mt-3 text-base">
                    {item.title}
                  </Heading>
                  <Text size="sm" muted className="mt-1">
                    {item.description}
                  </Text>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ============ PROTOTYPE VS FUTURE ============ */}
      <section aria-labelledby="home-scope-heading">
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="flex max-w-3xl flex-col gap-3">
            <Heading level={2} id="home-scope-heading">
              {home.scope.title}
            </Heading>
            <Text muted>{home.scope.description}</Text>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {/* TODAY — solid panel */}
            <Card className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-success-100 text-success-700">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <Badge variant="success">{home.scope.prototypeTitle}</Badge>
              </div>
              <ul className="flex flex-col gap-2">
                {home.scope.prototypeItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <Text size="sm" muted>
                      {item}
                    </Text>
                  </li>
                ))}
              </ul>
            </Card>
            {/* FUTURE — dashed/locked panel */}
            <Card className="flex flex-col gap-3 border-dashed bg-background-muted">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-background-subtle text-subtle">
                  <LockIcon className="h-4 w-4" />
                </span>
                <Badge variant="accent">{home.scope.futureTitle}</Badge>
              </div>
              <ul className="flex flex-col gap-2">
                {home.scope.futureItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-subtle" />
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

      {/* ============ FINAL CTA ============ */}
      <section aria-labelledby="home-cta-heading" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-700 via-primary-600 to-accent-600"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-30"
          style={{ backgroundImage: "url('/assets/illustrations/decorative/code-pattern.svg')", backgroundSize: "96px 96px", backgroundRepeat: "repeat" }}
        />
        <Container className="flex max-w-3xl flex-col items-start gap-4 py-16 sm:py-20">
          <Badge variant="warning" className="bg-background/10">
            {home.prototypeNotice.title}
          </Badge>
          <Heading level={2} id="home-cta-heading" className="text-white">
            {home.cta.title}
          </Heading>
          <Text size="lg" className="text-primary-50">
            {home.cta.description}
          </Text>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href={stage0Href}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-6 text-base font-semibold text-primary-700 transition-all duration-fast hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600"
            >
              {home.cta.primaryCta}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href={learningPathHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/40 bg-transparent px-6 text-base font-medium text-white transition-all duration-fast hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600"
            >
              {home.cta.secondaryCta}
            </Link>
          </div>
        </Container>
      </section>

      {/* ============ VISION (compact) ============ */}
      <section aria-labelledby="home-vision-heading">
        <Container className="flex flex-col gap-4 py-12 sm:py-16">
          <div className="flex max-w-3xl flex-col gap-3">
            <Heading level={2} id="home-vision-heading">
              {home.vision.title}
            </Heading>
            <Text muted>{home.vision.description}</Text>
          </div>
          <Link href={localizeHref("/vision")} className={secondaryLinkClasses}>
            {home.vision.cta}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Container>
      </section>
    </div>
  );
}
