import time
from collections import defaultdict,deque
from fastapi import Request
from fastapi.responses import JSONResponse
hits:dict[str,deque]=defaultdict(deque)
async def limits(request: Request, call_next):
    # One-process demo limit. Configure a shared gateway limit before scaling.
    if '/tutor/' in request.url.path:
        now = time.monotonic()
        for k in list(hits):
            if not hits[k] or now - hits[k][-1] > 60:
                del hits[k]
        key = request.client.host if request.client else 'unknown'
        bucket = hits[key]
        while bucket and now - bucket[0] > 60:
            bucket.popleft()
        if len(bucket) >= 20:
            return JSONResponse({'detail': 'Too many requests. Please wait one minute.'}, status_code=429)
        bucket.append(now)
    # Buffer with a hard cap, including chunked requests (not just Content-Length).
    if request.method == 'POST':
        body = bytearray()
        async for chunk in request.stream():
            body.extend(chunk)
            if len(body) > 4_300_000:
                return JSONResponse({'detail': 'Upload too large (maximum 4 MB photo).'}, status_code=413)
        request._body = bytes(body)
    response = await call_next(request)
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['Cache-Control'] = 'no-store'
    return response
