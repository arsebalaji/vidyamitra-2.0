import { pack } from "./api";
export const getCurriculum = async () => ({
  state: "telangana",
  board: "ts-scert",
  class: 8,
  subject: "mathematics",
  chapter: pack.chapter,
  lessons: pack.lessons,
});
