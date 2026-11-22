export function earnedBadges(completed: number, correct: number) {
  return [
    ...(completed >= 1 ? ["first-lesson"] : []),
    ...(completed >= 8 ? ["chapter-complete"] : []),
    ...(correct >= 10 ? ["ten-correct"] : []),
  ];
}
