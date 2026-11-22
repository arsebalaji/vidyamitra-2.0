import { db } from "./database";
import type { Lesson } from "../../../shared/types";
export const saveLesson = (lesson: Lesson) =>
  db.downloads.put({ id: lesson.id, lesson, savedAt: Date.now() });
export const listDownloads = () => db.downloads.toArray();
export const removeDownload = (id: string) => db.downloads.delete(id);
