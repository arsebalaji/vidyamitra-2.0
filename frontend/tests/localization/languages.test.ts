import { it, expect } from "vitest";
import { languageRegistry } from "../../src/i18n/languageRegistry";
import te from "../../src/i18n/locales/te.json";
import en from "../../src/i18n/locales/en.json";
it("enables only complete MVP language packs", () => {
  expect(
    languageRegistry
      .filter((l) => l.enabled)
      .map((l) => l.code)
      .sort(),
  ).toEqual(["en", "te"]);
  expect(Object.keys(te).sort()).toEqual(Object.keys(en).sort());
});
it("declares Urdu RTL and labels its selectable preview", () => {
  expect(languageRegistry.find((l) => l.code === "ur")).toMatchObject({
    direction: "rtl",
    enabled: false,
    status: "translation_preview", selectable: true,
  });
});

it('offers twelve languages with explicit content fallbacks',()=>{expect(languageRegistry.filter(l=>l.selectable)).toHaveLength(12);expect(languageRegistry.find(l=>l.code==='hi')?.contentLanguage).toBe('hi');expect(languageRegistry.find(l=>l.code==='ta')?.contentLanguage).toBe('en');});
