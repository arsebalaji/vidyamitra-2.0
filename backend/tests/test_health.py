import io
from unittest.mock import AsyncMock,patch
from PIL import Image
from app.content.lesson_loader import PACK
def request(**kwargs):
    return dict(message='Explain fractions',lesson_id='addition',language='te',mode='steps',**kwargs)

def test_health_curriculum_and_languages(client):
    assert client.get('/api/v1/health').json()['status'] == 'ok'
    assert len(client.get('/api/v1/curriculum').json()['lessons']) == 8
    langs = client.get('/api/v1/languages').json()
    assert [l['code'] for l in langs if l['enabled']] == ['te','en']
    assert next(l for l in langs if l['code']=='ur')['direction'] == 'rtl'