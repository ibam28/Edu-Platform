import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Alert } from "@/components/ui/Alert";
import { Card } from "@/components/ui/Card";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const t = getDictionary(locale);
  const register = t.register;

  return (
    <div className="flex flex-col">
      <Container className="pt-8 sm:pt-12">
        <Alert variant="info" title={register.prototypeNotice.title}>
          {register.prototypeNotice.description}
        </Alert>
      </Container>

      <section aria-labelledby="register-heading">
        <Container className="flex max-w-xl flex-col items-start gap-6 py-12 sm:py-16">
          <header className="flex flex-col gap-3">
            <Heading level={1} id="register-heading">
              {register.hero.title}
            </Heading>
            <Text muted>{register.hero.description}</Text>
          </header>

          <Card className="w-full">
            <RegisterForm
              copy={register.form}
              loginHref={`/${locale}/login`}
              loginLabel={register.login.label}
              loginPrompt={register.login.prompt}
            />
          </Card>
        </Container>
      </section>
    </div>
  );
}
