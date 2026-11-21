# VidyaMitra AI 4.0

A connected, offline-first Telugu mathematics learning MVP: React + Vite + TypeScript frontend and Python/FastAPI + SQLite backend in this repository. No student account or API key is needed for the core learning experience.

## Run on Windows

Prerequisites: Node.js 22 LTS or later, Python 3.12 or later, and internet for the initial dependency installation. Open PowerShell in this repository.

Backend, terminal 1:

```powershell
cd backend
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
Copy-Item .env.example .env
.\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Frontend, terminal 2:

```powershell
cd frontend
npm.cmd ci
npm.cmd run dev
```

Open http://127.0.0.1:5173. Vite proxies `/api` to FastAPI. API documentation: http://127.0.0.1:8000/docs. The fictional initial profile is “మిత్ర”. Start at `/welcome` for onboarding, or use the dashboard immediately.

For the offline/PWA demonstration, build and preview (the service worker is intentionally disabled in Vite development):

```powershell
cd frontend
npm.cmd run build
npm.cmd run preview
```

Open http://127.0.0.1:4173, wait for **Offline app ready** in Offline library, then reopen or refresh without internet. Keep the same browser and origin: localhost, 127.0.0.1, and different ports have separate storage. A first visit without internet cannot install the app.

## Included

- Responsive dashboard, onboarding, language selection and shared-phone profiles.
- Eight original bilingual lessons covering the Rational Numbers chapter, with 32 graded exercises.
- Step-by-step reader, resume position, completion tracking, exact fraction checking and adaptive practice.
- Named offline lesson copies, app-shell caching, local progress, local guardian view, earned achievements, JSON export and per-learner deletion.
- Deterministic lesson tutor (clearly labeled), optional server-side Gemini text/photo adapter, consent controls, browser-dependent speech input and playback.
- Fraction number-line visualizer and fraction equivalence game, both independent of a server.
- Curriculum catalog with the other chapters explicitly unavailable; ten additional language packs disabled pending review. Urdu direction metadata and RTL language-card display are included; a full Urdu interface is not claimed.

## Optional Gemini

Set `GEMINI_API_KEY`, `ENABLE_AI=true`, and an available `GEMINI_MODEL` in `backend/.env`, then restart the backend. Never put a key in frontend files or a `VITE_` variable. Text requires an explicit online-mode opt-in and consent; photos require separate consent for each selection. Provider calls are not made by default. Missing credentials produce a clear unavailable response, not a fabricated AI answer. Provider availability, cost and model access depend on your account.

Voice recognition may use the browser vendor's online service. It is not guaranteed offline. Telugu playback requires a Telugu voice installed on the device. Photos are validated, resized and re-encoded server-side; metadata is not forwarded. No local OCR is shipped. Generated responses need human checking, especially in Telugu.

## Tests

```powershell
cd frontend
npm.cmd test
npm.cmd run build
cd ../backend
.\.venv\Scripts\python.exe -m pytest -q
```

The frontend tests cover exact arithmetic, invalid inputs, adaptive difficulty, hint discounts and truthful tutor labeling. API tests cover seeded content, every exercise answer, validation, consent, disabled-provider behavior, mocked provider wiring, upload limits, CORS and rate limiting. Tests do not call a live AI provider.

## Project map

```text
frontend/src/       React screens, styles, i18next, Dexie, API adapter, adaptive engine
frontend/public/    Original Mitra mascot and PWA icons
backend/app/        FastAPI contracts, SQLAlchemy content, optional Gemini adapter
backend/tests/      API and security behavior tests
shared/content.json  One canonical bilingual lesson and question bank
shared/types.ts      Frontend content and API TypeScript types
shared/openapi.json  Backend-generated API contract (after validation)
docs/              Curriculum provenance, architecture, deployment and demo
```

See [architecture](docs/ARCHITECTURE.md), [curriculum references](docs/CURRICULUM.md), [deployment](docs/DEPLOYMENT.md), [demo walkthrough](docs/DEMO.md), and [limitations](docs/LIMITATIONS.md).
