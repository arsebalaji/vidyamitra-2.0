# Implemented, optional and planned

## Implemented

One connected project with frontend/backend integration; eight Rational Numbers lesson units and 32 practice questions; responsive Telugu/English screens; shared-device profiles; local progress, resume, mastery, recommendations, guardian summary, export/deletion and earned badges; offline service-worker application shell and lesson content; visual fractions and an equivalence game. One fictional demonstration profile starts with zero progress. There are no invented streaks, success statistics or AI responses.

## Optional / device-dependent

- Gemini text and photo adapters require backend configuration and explicit in-app consent. Live provider accuracy, availability and billing were not tested with a key.
- Browser speech recognition and Telugu speech synthesis depend on installed voices and browser support. Recognition may transmit speech to the browser's provider. There is no promise of offline speech or handwriting recognition.
- PWA installation depends on browser, HTTPS (or localhost), and browser installation criteria. First-load caching must complete. Clearing browser data, private browsing and storage eviction may remove progress. Export important progress.
- Parent view is local and not password protected. Anyone with the phone/browser may change profiles or read the local summary.

## Planned / not shipped

- Remaining fourteen chapters, other classes/subjects, and ten additional reviewed language packs.
- Local OCR, fully offline voice recognition, authenticated cloud sync and remote guardian accounts.
- Educator review of Telugu content, independent WCAG audit, and performance testing on physical entry-level Android hardware.
- Calibrated mastery assessment, spaced repetition and a larger varied question bank. Current adaptive decisions are explicit heuristics on a small question bank.
- Production perimeter protection and distributed rate limiting. The server's current per-IP limit is in-process for a single-worker MVP; CORS is not authentication. Do not expose an unrestricted paid AI backend publicly without authenticated sessions and spending controls.

The full Python backend cannot run on the Sites Cloudflare Worker runtime. A static web deployment can run all local learning features; optional online AI requires a separately hosted Python backend and same-origin reverse proxy. See DEPLOYMENT.md.
