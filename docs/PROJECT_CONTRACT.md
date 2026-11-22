# Project contract

One repository contains the React/Vite PWA, FastAPI backend, shared curriculum and contracts, tests, setup scripts and documentation. The folder tree supplied by the user is the organizing contract. Existing learning behavior and private local data must be preserved when extending it.

The enabled curriculum is Telangana State Board, Class 8, Mathematics, Rational Numbers. Telugu and English are enabled. The app does not claim that the other locale files contain reviewed translations. Additional state, board, class and subject screens expose only the supported selection.

`shared/curriculum/telangana/class-8/mathematics/te/{manifest,lessons,questions}.json` now supplies the frontend and backend. These lesson objects include Telugu and English fields. `shared/content.json` remains a compatibility snapshot; edit the structured pack, not the snapshot. `explanations.json` is an export for content tooling, not a second editable source. JSON schemas and OpenAPI describe contracts.

The primary application routes consume the modules under `src/pages`; reusable building blocks live under `src/components`. Some additional components are intended for future composition and are not displayed in every screen. Compatibility entry points at `src/App.tsx`, `api.ts`, `db.ts`, `engine.ts` and `i18n.ts` re-export the canonical modules.

Learner progress never goes to a backend endpoint. Reserved cloud routers and services must remain disabled until authentication, ownership, consent and conflict-resolution rules are designed and tested.
