import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Alert } from "@/components/ui/Alert";
import { AdminCourseDetailClient } from "@/components/admin/AdminCourseDetailClient";

export default async function AdminCourseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; courseId: string }>;
}) {
  const { locale, courseId } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const t = getDictionary(locale);

  return (
    <div className="flex flex-col">
      <Container className="pt-8 sm:pt-12">
        <Alert variant="info" title={t.adminCourses.prototypeNotice.title}>
          {t.adminCourses.prototypeNotice.description}
        </Alert>
      </Container>

      <AdminCourseDetailClient
        copy={t.adminCourses}
        locale={locale}
        courseId={courseId}
      />
    </div>
  );
}
