# Architecture and data contracts

The canonical pack is under `shared/curriculum/telangana/class-8/mathematics/te/`: `manifest.json`, `lessons.json` and `questions.json`. Vite bundles these into the offline application. FastAPI loads the same files and seeds the lesson objects into SQLite on startup. `shared/content.json` is retained as a compatibility export. Exercise checking uses the same authored answers. Frontend API calls have a 20-second deadline; deterministic learning falls back to the bundled pack. Optional online AI never silently becomes a purported generated response.

The frontend entry is `src/app/App.tsx`, routes are in `src/app/router.tsx`, and each screen has a `src/pages` module. Reusable components, services, local database repositories, hooks, stores and locales follow the supplied tree. FastAPI's `app/main.py` assembles `api/router.py`, security middleware and lifecycle; business logic lives under services and repositories. Only public lesson content is SQL-persisted. Other domain models are typed records, not hidden learner tables.

React Router provides all 18 requested screen areas. The dashboard is the default route, with onboarding at `/welcome`. All learning pages use the active learner context. UI and instructional strings are Telugu/English; other language options stay disabled. New chapters can be added to the pack without redesigning the reader, quiz or progress views.

## IndexedDB schema (Dexie `vidyamitra-v1`)

| Store | Key / indexes | Contents |
|---|---|---|
| profiles | id | Local random ID, nickname, color, creation time |
| attempts | incrementing id; profileId, lessonId | Question, correctness, hint use, timestamp |
| completions | profileId:lessonId; profileId | Last step and completion flag |
| downloads | lesson id | Lesson JSON, saved timestamp |

Profile IDs are not authorization tokens and never leave the browser. The guardian screen uses the same local store. These are convenience profiles on a shared device, not isolated accounts. Personal names are not required. Chat and photos remain transient and are not written to IndexedDB. Only selected online questions/photos reach the backend/provider. No analytics are included.

## SQLite schema

`lessons(id TEXT PRIMARY KEY, payload JSON NOT NULL)`. This database contains public learning content only, no learner progress. Environment setting `DATABASE_URL` changes the SQLite location. Startup merges the canonical pack to keep content aligned. Avoid changing provider configuration without restarting the backend.

## Adaptation

Mastery is the mean of the last ten attempts for a topic: independent correct = 1, correct with hint = 0.5, incorrect = 0. Two mistakes in the last three attempts select level 1. At least three attempts and 80% mastery select level 3; 50% selects level 2. Otherwise select level 1. Prefer the least-used question near the target difficulty and avoid immediate repetition when another suitable question exists. This is an explainable MVP heuristic, not a calibrated psychometric model. Progress recommends the weakest topic (unattempted topics first).

## API

All endpoints use `/api/v1`:

| Method | Path | Behavior |
|---|---|---|
| GET | /health | Status and AI configured flag |
| GET | /languages | Enabled packs and direction metadata |
| GET | /curriculum | MVP scope, chapter, lesson metadata |
| GET | /lessons/{id} | Seeded lesson or 404 |
| GET | /lessons/{id}/questions | Topic's exercises |
| POST | /quiz/check | Exact fraction answer checking |
| POST | /tutor/explain | Always deterministic lesson guidance |
| POST | /tutor/chat | Deterministic or consented optional Gemini |
| POST | /tutor/photo | Consented optional Gemini image explanation |

Quiz body: `{"question_id":"standard-1","answer":"4/6"}`. Returns `correct`, `answer`, and bilingual `explanation`.

Tutor body: `{"message":"Explain addition","lesson_id":"addition","language":"te","mode":"steps","online":false,"consent":false}`. Modes: `simple`, `steps`, `example`, `hint`. Returns `answer`, `source` (`offline` or `gemini`) and `lesson_id`. Offline replies are selected-lesson templates; they do not solve arbitrary typed questions.

Photo is multipart: `file` (JPEG/PNG/WebP), `consent=true`, `language=te|en`. Maximum file 4,000,000 bytes; request body 4,300,000 bytes; decoded image 12 megapixels; forwarded image maximum dimension 1600. Server re-encodes to JPEG in memory. Nothing is persisted. The exercise answer key is deliberately included offline: this is practice software, not a secure examination system.

No sync or remote guardian endpoints are implemented. Unknown routes return 404. No guessed ID can expose a remote learner record because the server stores none. Authentication and conflict-aware synchronization must be designed together before introducing cloud progress.
