import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { AssessmentQuiz } from "@/components/assessment/AssessmentQuiz";

const secondaryLinkClasses =
  "inline-flex h-10 items-center justify-center gap-2 rounded-md border border-strong bg-transparent px-4 text-sm font-medium text-foreground transition-colors duration-fast hover:bg-background-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    [1, 2, 3, 4].map((stage) => ({ locale, stage: String(stage) })),
  );
}

export default async function DemoAssessmentPage({
  params,
}: {
  params: Promise<{ locale: string; stage: string }>;
}) {
  const { locale, stage } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const t = getDictionary(locale);
  const assessments = t.demoAssessments;
  const stageNumber = Number(stage);
  const stageData = assessments.stages.find((item) => item.stage === stageNumber);
  if (!stageData) {
    notFound();
  }

  const learningPathHref = `/${locale}/learning-path`;

  const questions = stageData.questions.map((question) => ({
    text: locale === "id" ? question.id : question.en,
    options: question.options.map((option) => (locale === "id" ? option.id : option.en)),
    correct: question.correct,
  }));

  return (
    <div className="flex flex-col">
      <Container className="pt-8 sm:pt-12">
        <Alert variant="info" title={assessments.prototypeNotice.title}>
          {assessments.prototypeNotice.description}
        </Alert>
      </Container>

      <section aria-labelledby="assessment-heading">
        <Container className="flex max-w-3xl flex-col gap-6 py-12 sm:py-16">
          <Link href={learningPathHref} className={`${secondaryLinkClasses} self-start`}>
            {assessments.backLabel}
          </Link>

          <header className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent">Stage {stageData.stage}</Badge>
              <Badge variant="warning">{assessments.demoLabel}</Badge>
            </div>
            <Heading level={1} id="assessment-heading">
              {stageData.title}
            </Heading>
            <Text size="lg" muted>
              {stageData.description}
            </Text>
          </header>

          <AssessmentQuiz
            questions={questions}
            storageKey={`bilingual-edu:demo-attempt:stage-${stageNumber}`}
            stage={`stage_${stageNumber}`}
            demoLabel={assessments.demoLabel}
            questionProgressTemplate={assessments.questionProgress}
            previousLabel={assessments.previous}
            nextLabel={assessments.next}
            submitLabel={assessments.submit}
            unanswered={assessments.unanswered}
            result={{
              title: assessments.result.title,
              scoreLabel: assessments.result.scoreLabel,
              scoreOutOfTemplate: assessments.result.scoreOutOf,
              demoNote: assessments.result.demoNote,
              retry: assessments.result.retry,
              backToLearningPath: assessments.result.backToLearningPath,
              backHref: learningPathHref,
            }}
          />
        </Container>
      </section>
    </div>
  );
}
