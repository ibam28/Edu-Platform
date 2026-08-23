import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Alert } from "@/components/ui/Alert";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";

export default async function AdminPage({
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
        <Alert variant="info" title={t.adminDashboard.prototypeNotice.title}>
          {t.adminDashboard.prototypeNotice.description}
        </Alert>
      </Container>

      <AdminDashboardClient copy={t.adminDashboard} locale={locale} />
    </div>
  );
}
