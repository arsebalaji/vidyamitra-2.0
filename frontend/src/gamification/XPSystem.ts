/** Pure proposal for future XP UI; does not award persistent points. */ export function calculateXP(
  completedLessons: number,
  correctAnswers: number,
) {
  return Math.max(0, completedLessons) * 20 + Math.max(0, correctAnswers) * 5;
}
