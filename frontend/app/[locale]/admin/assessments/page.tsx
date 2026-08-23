import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Alert } from "@/components/ui/Alert";
import { AdminAssessmentsClient } from "@/components/admin/AdminAssessmentsClient";

export default async function AdminAssessmentsPage({
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
        <Alert variant="info" title={t.adminAssessments.prototypeNotice.title}>
          {t.adminAssessments.prototypeNotice.description}
        </Alert>
      </Container>

      <AdminAssessmentsClient copy={t.adminAssessments} locale={locale} />
    </div>
  );
}
