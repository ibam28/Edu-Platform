import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/contact/ContactForm";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const t = getDictionary(locale);
  const contact = t.contact;

  return (
    <div className="flex flex-col">
      <Container className="pt-8 sm:pt-12">
        <Alert variant="info" title={contact.prototypeNotice.title}>
          {contact.prototypeNotice.description}
        </Alert>
      </Container>

      <section aria-labelledby="contact-hero-heading">
        <Container className="flex max-w-3xl flex-col items-start gap-5 py-12 sm:py-20">
          <Badge variant="accent">{contact.hero.eyebrow}</Badge>
          <Heading level={1} id="contact-hero-heading">
            {contact.hero.title}
          </Heading>
          <Text size="lg" muted>
            {contact.hero.description}
          </Text>
        </Container>
      </section>

      <section
        aria-labelledby="contact-content-heading"
        className="bg-background-muted"
      >
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="flex flex-col gap-3">
              <Heading level={2} id="contact-content-heading">
                {contact.info.title}
              </Heading>
              <Text size="sm" muted>
                {contact.info.description}
              </Text>
              <dl className="flex flex-col gap-1.5 pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  <dt className="text-sm font-medium text-foreground">
                    {contact.info.emailLabel}:
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${contact.info.emailValue}`}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                    >
                      {contact.info.emailValue}
                    </a>
                  </dd>
                </div>
              </dl>
              <Alert variant="warning">{contact.info.responseNote}</Alert>
            </Card>

            <Card className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Heading level={2}>{contact.form.title}</Heading>
                <Text size="sm" muted>
                  {contact.form.description}
                </Text>
              </div>
              <ContactForm copy={contact.form} />
            </Card>
          </div>
        </Container>
      </section>
    </div>
  );
}