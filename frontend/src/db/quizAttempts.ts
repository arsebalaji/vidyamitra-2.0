import { db } from "./database";
import type { Attempt } from "../features/adaptive-learning/engine";
export const saveAttempt = (attempt: Attempt) => db.attempts.add(attempt);
export const getAttempts = (profileId: string) =>
  db.attempts.where("profileId").equals(profileId).toArray();
