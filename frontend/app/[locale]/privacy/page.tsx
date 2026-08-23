import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { LegalPageContent } from "@/components/layout/LegalPageContent";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const t = getDictionary(locale);
  return <LegalPageContent copy={t.privacy} />;
}
