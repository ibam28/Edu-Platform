import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary, type PageKey } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";

export function PagePlaceholder({
  locale,
  page,
}: {
  locale: string;
  page: PageKey;
}) {
  if (!isLocale(locale)) {
    notFound();
  }
  const t = getDictionary(locale);
  const copy = t.placeholder.pages[page];

  return (
    <section className="py-16 sm:py-24">
      <h1 className="sr-only">{copy.title}</h1>
      <Container>
        <EmptyState
          icon={
            <svg
              aria-hidden="true"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="13" r="8" />
              <path d="M12 9v4l2.5 2.5" />
              <path d="M9 2h6" />
            </svg>
          }
          title={copy.title}
          description={copy.description}
          action={<Badge variant="primary">{t.placeholder.comingSoon}</Badge>}
        />
      </Container>
    </section>
  );
}
