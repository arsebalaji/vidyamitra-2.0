import io
from unittest.mock import AsyncMock,patch
from PIL import Image
from app.content.lesson_loader import PACK
def request(**kwargs):
    return dict(message='Explain fractions',lesson_id='addition',language='te',mode='steps',**kwargs)

def test_photo_restrictions(client):
    assert client.post('/api/v1/tutor/photo',files={'file':('q.png',b'bad','image/png')}).status_code==403
    assert client.post('/api/v1/tutor/photo',data={'consent':'true'},files={'file':('q.txt',b'bad','text/plain')}).status_code==415
    assert client.post('/api/v1/tutor/photo',data={'consent':'true'},files={'file':('q.png',b'bad','image/png')}).status_code==422
    assert client.post('/api/v1/tutor/photo',data={'consent':'true'},files={'file':('q.jpg',b'x'*4_000_001,'image/jpeg')}).status_code==413

def test_rate_limit_and_no_private_data_routes(client):
    for _ in range(20):
        assert client.post('/api/v1/tutor/explain',json=request()).status_code==200
    assert client.post('/api/v1/tutor/explain',json=request()).status_code==429
    for endpoint in ['/api/v1/progress/me','/api/v1/guardian/summary','/api/v1/progress/sync']:
        assert client.get(endpoint).status_code==404

def test_cors(client):
    r=client.options('/api/v1/tutor/chat',headers={'Origin':'https://untrusted.example','Access-Control-Request-Method':'POST'})
    assert 'access-control-allow-origin' not in r.headers