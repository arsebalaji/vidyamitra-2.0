import { createContext, useContext } from "react";
import { useTranslation } from "react-i18next";
import type { Profile } from "../db/schema";
import type { Lang, UILang } from "../../../shared/types";
import type { Attempt } from "../features/adaptive-learning/engine";
export const AppContext = createContext<{
  profile: Profile | null;
  lang: Lang;
  uiLang: UILang;
  attempts: Attempt[];
  notify: (s: string) => void;
  switchProfile: (id: string) => void;
}>({
  profile: null,
  lang: "te",
  uiLang: "te",
  attempts: [],
  notify: () => {},
  switchProfile: () => {},
});
export const useApp = () => useContext(AppContext);
export const useWords = () => {
  const { t } = useTranslation();
  return t;
};

