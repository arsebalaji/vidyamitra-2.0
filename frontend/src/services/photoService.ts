export { photo } from "./api";
export const validatePhoto = (file: File) =>
  ["image/jpeg", "image/png", "image/webp"].includes(file.type) &&
  file.size <= 4_000_000;
