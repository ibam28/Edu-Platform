import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Alert } from "@/components/ui/Alert";
import { DashboardClient } from "@/components/dashboard/DashboardClient";

export default async function DashboardPage({
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
        <Alert variant="info" title={t.dashboard.prototypeNotice.title}>
          {t.dashboard.prototypeNotice.description}
        </Alert>
      </Container>

      <DashboardClient
        copy={t.dashboard}
        stageStatusLabels={t.home.stages.statusLabels}
        stageItems={t.learningPath.stages.items}
        lockedLabel={t.learningPath.lockedLabel}
        lessonItems={t.pythonStage0.lessons.items}
        locale={locale}
      />
    </div>
  );
}
