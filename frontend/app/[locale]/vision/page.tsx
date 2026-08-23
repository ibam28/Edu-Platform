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

const stageBadgeVariant: Record<StageStatus, BadgeVariant> = {
  free: "success",
  demo: "primary",
  paid: "warning",
  comingSoon: "neutral",
};

export default async function VisionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const t = getDictionary(locale);
  const vision = t.vision;
  const home = t.home;

  const localizeHref = (href: string) => `/${locale}${href}`;
  const homeHref = `/${locale}`;

  return (
    <div className="flex flex-col">
      <Container className="pt-8 sm:pt-12">
        <Alert variant="info" title={vision.prototypeNotice.title}>
          {vision.prototypeNotice.description}
        </Alert>
      </Container>

      <section aria-labelledby="vision-hero-heading">
        <Container className="flex max-w-3xl flex-col items-start gap-5 py-12 sm:py-20">
          <Badge variant="accent">{vision.hero.eyebrow}</Badge>
          <Heading level={1} id="vision-hero-heading">
            {vision.hero.title}
          </Heading>
          <Text size="lg" muted>
            {vision.hero.description}
          </Text>
          <div className="flex flex-wrap gap-3">
            <Link href={localizeHref("/learning-path")} className={primaryLinkClasses}>
              {vision.hero.primaryCta}
            </Link>
            <Link href={homeHref} className={secondaryLinkClasses}>
              {vision.hero.secondaryCta}
            </Link>
          </div>
        </Container>
      </section>

      <section aria-labelledby="vision-purpose-heading" className="bg-background-muted">
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="flex max-w-3xl flex-col gap-3">
            <Heading level={2} id="vision-purpose-heading">
              {vision.purpose.title}
            </Heading>
            <Text muted>{vision.purpose.description}</Text>
          </div>
          <Card>
            <ul className="flex list-inside list-disc flex-col gap-2">
              {vision.purpose.items.map((item) => (
                <li key={item}>
                  <Text size="sm" muted>
                    {item}
                  </Text>
                </li>
              ))}
            </ul>
          </Card>
        </Container>
      </section>

      <section aria-labelledby="vision-final-heading">
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="flex max-w-3xl flex-col gap-3">
            <Heading level={2} id="vision-final-heading">
              {vision.finalVision.title}
            </Heading>
            <Text muted>{vision.finalVision.description}</Text>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {vision.finalVision.pillars.map((pillar) => (
              <li key={pillar.title}>
                <Card className="flex h-full flex-col gap-3">
                  <Badge variant="accent">{vision.finalVision.futureLabel}</Badge>
                  <Heading level={3}>{pillar.title}</Heading>
                  <Text size="sm" muted>
                    {pillar.description}
                  </Text>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="vision-stages-heading" className="bg-background-muted">
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="flex max-w-3xl flex-col gap-3">
            <Heading level={2} id="vision-stages-heading">
              {vision.stages.title}
            </Heading>
            <Text muted>{vision.stages.description}</Text>
            <Text size="sm" muted>
              {vision.stages.intro}
            </Text>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {home.stages.items.map((stage) => (
              <li key={stage.title}>
                <Card className="flex h-full flex-col gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {stage.statuses.map((status) => (
                      <Badge key={status} variant={stageBadgeVariant[status]}>
                        {home.stages.statusLabels[status]}
                      </Badge>
                    ))}
                  </div>
                  <Heading level={3}>{stage.title}</Heading>
                  <Text size="sm" muted>
                    {stage.description}
                  </Text>
                </Card>
              </li>
            ))}
          </ul>
          <Alert variant="warning" title={vision.stages.demoNoteTitle}>
            {vision.stages.demoNote}
          </Alert>
        </Container>
      </section>

      <section aria-labelledby="vision-certification-heading">
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="flex max-w-3xl flex-col gap-3">
            <Heading level={2} id="vision-certification-heading">
              {vision.certification.title}
            </Heading>
            <Text muted>{vision.certification.description}</Text>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="flex flex-col gap-3">
              <Badge variant="info">{vision.certification.todayTitle}</Badge>
              <Text size="sm" muted>
                {vision.certification.todayDescription}
              </Text>
              <ul className="flex list-inside list-disc flex-col gap-2">
                {vision.certification.todayItems.map((item) => (
                  <li key={item}>
                    <Text size="sm" muted>
                      {item}
                    </Text>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="flex flex-col gap-3">
              <Badge variant="accent">{vision.certification.futureTitle}</Badge>
              <Text size="sm" muted>
                {vision.certification.futureDescription}
              </Text>
              <ul className="flex list-inside list-disc flex-col gap-2">
                {vision.certification.futureItems.map((item) => (
                  <li key={item}>
                    <Text size="sm" muted>
                      {item}
                    </Text>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
          <Alert variant="warning" title={vision.certification.noticeTitle}>
            {vision.certification.noticeDescription}
          </Alert>
        </Container>
      </section>

      <section aria-labelledby="vision-loop-heading" className="bg-background-muted">
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="flex max-w-3xl flex-col gap-3">
            <Heading level={2} id="vision-loop-heading">
              {vision.employmentLoop.title}
            </Heading>
            <Text muted>{vision.employmentLoop.description}</Text>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {home.journey.steps.map((step, index) => (
              <li key={step.title}>
                <Card className="flex h-full flex-col gap-3">
                  <Text size="sm" className="font-semibold text-primary-on-tint">
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                  <Heading level={3}>{step.title}</Heading>
                  <Text size="sm" muted>
                    {step.description}
                  </Text>
                </Card>
              </li>
            ))}
          </ol>
          <Text size="sm" muted>
            {vision.employmentLoop.loopNote}
          </Text>
        </Container>
      </section>

      <section aria-labelledby="vision-cta-heading">
        <Container className="flex max-w-3xl flex-col items-start gap-4 py-12 sm:py-16">
          <Heading level={2} id="vision-cta-heading">
            {vision.cta.title}
          </Heading>
          <Text muted>{vision.cta.description}</Text>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link href={localizeHref("/learning-path")} className={primaryLinkClasses}>
              {vision.cta.primaryCta}
            </Link>
            <Link href={localizeHref("/register")} className={secondaryLinkClasses}>
              {vision.cta.secondaryCta}
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
