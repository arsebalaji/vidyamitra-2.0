import { describe, it, expect } from "vitest";
import {
  equivalent,
  fraction,
  mastery,
  nextQuestion,
  offlineReply,
  gameRound,
  type Attempt,
} from "./engine";
import { pack } from "./api";
const attempt = (correct: boolean, hint = false): Attempt => ({
  profileId: "one",
  questionId: "addition-1",
  lessonId: "addition",
  correct,
  hint,
  at: 1,
});
describe("exact rational arithmetic", () => {
  it("accepts equivalent and negative fractions without rounding", () => {
    expect(equivalent("2/4", "1/2")).toBe(true);
    expect(equivalent("3/-6", "-1/2")).toBe(true);
    expect(equivalent("999999998/999999999", "1")).toBe(false);
  });
  it("rejects invalid input and zero denominators", () => {
    for (const s of [
      "1/0",
      "1.5",
      "1/2/3",
      "Infinity",
      "alert(1)",
      "1234567890",
    ])
      expect(fraction(s)).toBeNull();
  });
  it("validates every authored answer", () => {
    expect(pack.questions.length).toBe(32);
    for (const q of pack.questions) expect(fraction(q.answer)).not.toBeNull();
  });
});
describe("adaptive practice", () => {
  it("gives every game round three unique choices with exactly one match", () => {
    for (let r = 0; r < 24; r++) {
      const q = gameRound(r);
      expect(new Set(q.options).size).toBe(3);
      expect(q.options.filter((o) => equivalent(o, q.answer))).toHaveLength(1);
    }
  });
  it("discounts hints and uses only ten recent attempts", () => {
    expect(mastery([attempt(true), attempt(true, true), attempt(false)])).toBe(
      50,
    );
    expect(
      mastery([
        attempt(false),
        ...Array.from({ length: 10 }, () => attempt(true)),
      ]),
    ).toBe(100);
  });
  it("reduces difficulty after repeated mistakes", () => {
    const q = nextQuestion(
      pack.questions.filter((q) => q.lessonId === "addition"),
      [attempt(true), attempt(false), attempt(false)],
    );
    expect(q.level).toBe(1);
  });
  it("increases difficulty after independent success", () => {
    expect(
      nextQuestion(
        pack.questions.filter((q) => q.lessonId === "addition"),
        [attempt(true), attempt(true), attempt(true)],
      ).level,
    ).toBe(3);
  });
  it("honestly labels deterministic guidance", () => {
    const r = offlineReply(pack.lessons[0], "te", "steps");
    expect(r.source).toBe("offline");
    expect(r.answer).toContain(pack.lessons[0].steps[0].body.te);
  });
});
