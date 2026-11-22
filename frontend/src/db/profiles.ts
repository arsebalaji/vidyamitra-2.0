import { db } from "./database";
export const listProfiles = () => db.profiles.toArray();
export async function createProfile(name: string) {
  const nickname = name.trim();
  if (!nickname || nickname.length > 24)
    throw new Error("Use a nickname of 1–24 characters.");
  const profile = {
    id: crypto.randomUUID(),
    name: nickname,
    color: "#5B5FEF",
    created: Date.now(),
  };
  await db.profiles.add(profile);
  return profile;
}
