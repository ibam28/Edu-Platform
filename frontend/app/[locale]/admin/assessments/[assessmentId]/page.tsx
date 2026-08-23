import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Alert } from "@/components/ui/Alert";
import { AdminAssessmentDetailClient } from "@/components/admin/AdminAssessmentDetailClient";

export default async function AdminAssessmentDetailPage({
  params,
}: {
  params: Promise<{ locale: string; assessmentId: string }>;
}) {
  const { locale, assessmentId } = await params;
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

      <AdminAssessmentDetailClient
        copy={t.adminAssessments}
        locale={locale}
        assessmentId={assessmentId}
      />
    </div>
  );
}
