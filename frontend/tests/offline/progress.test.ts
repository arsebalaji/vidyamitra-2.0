import { it, expect } from "vitest";
import { learningStreak, weeklyCounts } from "../../src/features/progress";
it("counts calendar days without requiring a server", () => {
  const today = +new Date(2026, 10, 21, 12);
  const yesterday = +new Date(2026, 10, 20, 12);
  expect(learningStreak([today, yesterday], today)).toBe(2);
  expect(
    weeklyCounts([today, today, yesterday], today).map((x) => x.count),
  ).toEqual([0, 0, 0, 0, 0, 1, 2]);
});
it("does not invent a streak from no activity", () =>
  expect(learningStreak([])).toBe(0));
