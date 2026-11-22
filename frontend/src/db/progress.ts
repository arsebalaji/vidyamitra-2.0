import { db } from "./database";
export async function getProgress(profileId: string) {
  return {
    attempts: await db.attempts.where("profileId").equals(profileId).toArray(),
    completions: await db.completions
      .where("profileId")
      .equals(profileId)
      .toArray(),
  };
}
export async function exportProgress(profileId: string) {
  return {
    version: 1,
    profile: await db.profiles.get(profileId),
    ...(await getProgress(profileId)),
  };
}
export async function deleteLearnerData(profileId: string) {
  await db.transaction(
    "rw",
    db.profiles,
    db.attempts,
    db.completions,
    async () => {
      await db.attempts.where("profileId").equals(profileId).delete();
      await db.completions.where("profileId").equals(profileId).delete();
      await db.profiles.delete(profileId);
    },
  );
}
