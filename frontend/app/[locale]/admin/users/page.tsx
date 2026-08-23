import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Alert } from "@/components/ui/Alert";
import { AdminUsersClient } from "@/components/admin/AdminUsersClient";

export default async function AdminUsersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const t = getDictionary(locale);

  return (
    <div className="flex flex-col">
      <Container className="pt-8 sm:pt-12">
        <Alert variant="info" title={t.adminUsers.prototypeNotice.title}>
          {t.adminUsers.prototypeNotice.description}
        </Alert>
      </Container>

      <AdminUsersClient copy={t.adminUsers} locale={locale} />
    </div>
  );
}