export function achievements(
  completed: number,
  attempts: number,
  independentCorrect: number,
) {
  return [
    { id: "first", earned: completed >= 1 },
    { id: "curious", earned: attempts >= 5 },
    { id: "chapter", earned: completed >= 8 },
    { id: "practice", earned: independentCorrect >= 10 },
  ];
}
