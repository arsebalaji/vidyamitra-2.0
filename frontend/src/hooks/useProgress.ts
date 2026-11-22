import { useLiveQuery } from "dexie-react-hooks";
import { getProgress } from "../db/progress";
export const useProgress = (id: string) =>
  useLiveQuery(() => getProgress(id), [id]);
