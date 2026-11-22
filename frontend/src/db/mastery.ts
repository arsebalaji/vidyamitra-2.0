import { getAttempts } from "./quizAttempts";
import { mastery } from "../features/adaptive-learning/engine";
export async function topicMastery(profileId: string, lessonId: string) {
  return mastery(
    (await getAttempts(profileId)).filter((a) => a.lessonId === lessonId),
  );
}
