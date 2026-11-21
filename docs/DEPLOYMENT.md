# Deployment

## Recommended full-stack deployment

Deploy the frontend build and Python API behind one HTTPS origin. Build `frontend/dist` with `npm ci && npm run build`. Run Python 3.12 with `pip install -r requirements.txt` and `uvicorn app.main:app --host 0.0.0.0 --port 8000` from `backend/`. The backend expects the sibling `shared/content.json`; deploy the repository, not only `backend/app`.

Example reverse proxy configuration (adjust paths and hostname):

```nginx
server {
    listen 443 ssl;
    server_name learning.example.org;
    # Configure your real TLS certificate and key here.
    root /srv/vidyamitra-ai/frontend/dist;
    client_max_body_size 4300k;
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_read_timeout 40s;
    }
    location / {
        try_files $uri $uri/ /index.html;
    }
    location = /sw.js {
        add_header Cache-Control "no-cache";
    }
}
```

Use an unprivileged process, persist the SQLite content database in a writable data directory, and store backend secrets with your host's secret manager. `CORS_ORIGINS` should list only trusted development/production origins. Keep AI disabled unless appropriate access and spending limits exist. TLS is required for service workers and microphone access outside localhost.

For one-process local demos, the included per-IP rate limiter is sufficient to demonstrate bounded usage. Production deployments need an authenticated gateway or invitation sessions, per-user quotas, provider spending limits, and a shared rate-limit store. Do not use a frontend environment variable for the Gemini key.

## Static/offline deployment

Upload `frontend/dist` to a static HTTPS host with SPA fallback to `index.html`. All bundled lessons, practice, visualizer, game and local progress work without a running API after the initial cache. Requests for deterministic operations fall back locally. Online AI/photo solving needs `/api/*` forwarded to the Python host; a static host alone cannot provide it.

## Updates

The service worker precaches content-hashed assets and updates on subsequent visits. Increase the content pack version when editing lessons. Preserve IndexedDB store migrations when changing local schemas. App origin changes create separate local databases, so export before migrating. There is no cloud sync to restore local profiles automatically.
