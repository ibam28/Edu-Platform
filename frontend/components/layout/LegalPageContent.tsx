import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export interface LegalSectionCopy {
  heading: string;
  content: string;
}

export interface LegalPageCopy {
  prototypeNotice: { title: string; description: string };
  hero: { eyebrow: string; title: string; description: string };
  sections: LegalSectionCopy[];
  legalReview: { title: string; description: string };
}

export function LegalPageContent({ copy }: { copy: LegalPageCopy }) {
  return (
    <div className="flex flex-col">
      <Container className="pt-8 sm:pt-12">
        <Alert variant="info" title={copy.prototypeNotice.title}>
          {copy.prototypeNotice.description}
        </Alert>
      </Container>

      <section aria-labelledby="legal-hero-heading">
        <Container className="flex max-w-3xl flex-col items-start gap-5 py-12 sm:py-20">
          <Badge variant="accent">{copy.hero.eyebrow}</Badge>
          <Heading level={1} id="legal-hero-heading">
            {copy.hero.title}
          </Heading>
          <Text size="lg" muted>
            {copy.hero.description}
          </Text>
        </Container>
      </section>

      <section
        aria-labelledby="legal-sections-heading"
        className="bg-background-muted"
      >
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <ol className="flex flex-col gap-4">
            {copy.sections.map((section, index) => (
              <li key={section.heading}>
                <Card className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <Text
                      size="sm"
                      className="mt-1 font-semibold text-primary-on-tint"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </Text>
                    <div className="flex flex-col gap-2">
                      <Heading level={3}>{section.heading}</Heading>
                      <Text size="sm" muted>
                        {section.content}
                      </Text>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ol>
          <Alert variant="warning" title={copy.legalReview.title}>
            {copy.legalReview.description}
          </Alert>
        </Container>
      </section>
    </div>
  );
}
