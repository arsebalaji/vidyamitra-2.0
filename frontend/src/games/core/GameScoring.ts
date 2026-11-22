export function gameAccuracy(correct: number, attempts: number) {
  return attempts > 0
    ? Math.round((Math.max(0, Math.min(correct, attempts)) / attempts) * 100)
    : 0;
}
