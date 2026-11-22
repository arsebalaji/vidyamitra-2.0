export function setSetting(key: "large" | "motion", value: boolean) {
  localStorage.setItem(key, String(value));
  document.documentElement.classList.toggle(
    key === "large" ? "large" : "reduced",
    value,
  );
}
export const getSetting = (key: "large" | "motion") =>
  localStorage.getItem(key) === "true";
