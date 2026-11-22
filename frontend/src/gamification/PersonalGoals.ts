export function goalProgress(completed: number, target: number) {
  return target > 0
    ? Math.min(100, Math.max(0, (completed / target) * 100))
    : 0;
}
