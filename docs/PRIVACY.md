# Privacy and data handling

Profiles use a nickname and a random local ID. IndexedDB stores profiles, exercise attempts, lesson completion positions and downloaded lesson copies. Anyone using the same browser can switch profiles; this is not password-protected account isolation.

No tracking or analytics are included. The backend stores curriculum content only. It has no learner progress database or remote lookup by learner ID. Settings can export the active learner's records and delete that learner's data. Clearing browser storage deletes local records; there is no cloud restore.

Offline tutor text is deterministic. Only an explicit online-mode selection and consent send a question to Gemini. Photo selection stays local until separate upload consent. The backend validates type and size, re-encodes the image, and sends it to the configured provider in memory. Avoid children's names, faces, school details and other personal information in questions or photos. Browser speech recognition may use a browser vendor's online service after the user starts it.

Before deploying for children, obtain appropriate educator/privacy review and configure authentication, quotas and spending controls for any public paid AI endpoint. No claim of jurisdiction-specific legal certification is made.
