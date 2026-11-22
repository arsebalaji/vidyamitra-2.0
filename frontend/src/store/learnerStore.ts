export const getActiveLearner = () =>
  localStorage.getItem("profile") || "demo-mitra";
export const setActiveLearner = (id: string) =>
  localStorage.setItem("profile", id);
