# Testing

From the repository root on Windows:

```powershell
.\scripts\setup.ps1
.\scripts\test.ps1
.\scripts\build.ps1
```

Frontend tests run with Vitest. They cover exact fraction comparison, invalid input, question-bank integrity, adaptive levels, hint discounts, unique game choices, local progress calculations, and language enablement. API tests use FastAPI TestClient, a separate SQLite test database, and mocked provider boundaries. No test requires a Gemini key.

Backend tests are split across `test_health.py`, `test_curriculum.py`, `test_ai.py`, `test_quiz.py`, `test_progress.py`, `test_security.py`, and `test_sync.py`. Disabled remote data features are tested for refusal rather than fake success.

CI workflows install dependencies, run tests and compile the frontend. A local successful run does not prove that a remote GitHub workflow has run. No automated test certifies physical Android performance, voice availability, live Gemini responses or independent accessibility conformance.

Manual checks: use the demo in DEMO.md; inspect desktop and 360px layouts; switch between learners; complete a lesson and refresh; submit equivalent fractions; download content and wait for app-cache readiness before testing without network.
