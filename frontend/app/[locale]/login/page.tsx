import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Alert } from "@/components/ui/Alert";
import { Card } from "@/components/ui/Card";
import { LoginForm } from "@/components/auth/LoginForm";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const t = getDictionary(locale);
  const login = t.login;

  return (
    <div className="flex flex-col">
      <Container className="pt-8 sm:pt-12">
        <Alert variant="info" title={login.prototypeNotice.title}>
          {login.prototypeNotice.description}
        </Alert>
      </Container>

      <section aria-labelledby="login-heading">
        <Container className="flex max-w-xl flex-col items-start gap-6 py-12 sm:py-16">
          <header className="flex flex-col gap-3">
            <Heading level={1} id="login-heading">
              {login.hero.title}
            </Heading>
            <Text muted>{login.hero.description}</Text>
          </header>

          <Card className="w-full">
            <LoginForm
              copy={login.form}
              registerHref={`/${locale}/register`}
              registerLabel={login.register.label}
              registerPrompt={login.register.prompt}
              successHref={`/${locale}/dashboard`}
            />
          </Card>
        </Container>
      </section>
    </div>
  );
}
