export interface ScorableQuestion {
  correct: number;
}

export function calculateScore(
  answers: (number | null)[],
  questions: ScorableQuestion[],
): number {
  return answers.reduce<number>(
    (count, answer, index) => count + (answer === questions[index].correct ? 1 : 0),
    0,
  );
}

export function allAnswered(answers: (number | null)[]): boolean {
  return answers.every((answer) => answer !== null);
}
