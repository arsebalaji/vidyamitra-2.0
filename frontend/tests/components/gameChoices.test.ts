import { it, expect } from "vitest";
import {
  gameRound,
  equivalent,
} from "../../src/features/adaptive-learning/engine";
it("moves the answer position across rounds without duplicate correct options", () => {
  const positions = Array.from({ length: 12 }, (_, i) => {
    const q = gameRound(i);
    expect(q.options.filter((v) => equivalent(v, q.answer))).toHaveLength(1);
    return q.options.indexOf(q.answer);
  });
  expect(new Set(positions).size).toBe(3);
});
