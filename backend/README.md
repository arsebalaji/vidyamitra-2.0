# Backend

Python 3.12+: create `.venv`, install `requirements.txt`, then run `python -m uvicorn app.main:app`. Run `python -m pytest -q` for tests.

`api/v1` defines route registration, `services` implements behavior, `repositories` reads SQLite, `schemas` validates requests, `models` defines domain records, and `core` holds configuration and security. `shared/curriculum` is the source of content. Progress, sync and remote guardian routers are deliberately unmounted.

Alembic support is included for managed deployments; install the `alembic` requirement before using it. Local demos also initialize the content table at startup.
