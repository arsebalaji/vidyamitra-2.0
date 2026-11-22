# Frontend

Run `npm ci`, `npm run dev`. Production: `npm run build`, `npm run preview`. See the root README for the backend.

`src/app` owns startup and routing; `pages` owns screens; `components` contains reusable UI; `services` calls the API with offline fallback; `db` owns IndexedDB; `features` contains pure logic; `i18n/locales` contains reviewed/disabled language data.

The main game is `games/FractionMatch.tsx`. Other game and visual modules are reusable English-only extensions, not linked into the verified Telugu chapter.
