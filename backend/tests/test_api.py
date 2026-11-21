import io
import os
from unittest.mock import AsyncMock, patch

os.environ['DATABASE_URL'] = 'sqlite:///./test-curriculum.db'
os.environ['ENABLE_AI'] = 'false'
from fastapi.testclient import TestClient
from PIL import Image
from app.main import app, hits, PACK
import pytest

@pytest.fixture
def client():
    hits.clear()
    with TestClient(app) as c:
        yield c

def test_health_curriculum_and_languages(client):
    assert client.get('/api/v1/health').json()['status'] == 'ok'
    assert len(client.get('/api/v1/curriculum').json()['lessons']) == 8
    langs = client.get('/api/v1/languages').json()
    assert [l['code'] for l in langs if l['enabled']] == ['te','en']
    assert next(l for l in langs if l['code']=='ur')['direction'] == 'rtl'

def test_content_and_question_integrity(client):
    for lesson in PACK['lessons']:
        assert client.get('/api/v1/lessons/'+lesson['id']).json() == lesson
        qs=client.get('/api/v1/lessons/'+lesson['id']+'/questions').json()
        assert qs
        for q in qs:
            response=client.post('/api/v1/quiz/check',json={'question_id':q['id'],'answer':q['answer']})
            assert response.json()['correct'] is True
    assert client.get('/api/v1/lessons/missing').status_code == 404

def test_exact_answers_and_validation(client):
    body={'question_id':'standard-1','answer':'4/6'}
    assert client.post('/api/v1/quiz/check',json=body).json()['correct']
    body['answer']='1/0'
    assert client.post('/api/v1/quiz/check',json=body).status_code==422
    body['answer']='__import__("os")'
    assert client.post('/api/v1/quiz/check',json=body).status_code==422
    assert client.post('/api/v1/quiz/check',json={'question_id':'missing','answer':'1'}).status_code==404

def request(**kwargs):
    return dict(message='Explain fractions',lesson_id='addition',language='te',mode='steps',**kwargs)

def test_offline_tutor_without_key(client):
    for endpoint in ['chat','explain']:
        r=client.post('/api/v1/tutor/'+endpoint,json=request())
        assert r.status_code==200
        assert r.json()['source']=='offline'
        assert '1/3 + 1/4' in r.json()['answer']

def test_online_consent_and_missing_provider(client):
    assert client.post('/api/v1/tutor/chat',json=request(online=True)).status_code==403
    assert client.post('/api/v1/tutor/chat',json=request(online=True,consent=True)).status_code==503
    with patch('app.main.generate',new=AsyncMock(return_value='A grounded response')) as generate:
        r=client.post('/api/v1/tutor/chat',json=request(online=True,consent=True))
        assert r.json()['source']=='gemini'
        assert '1/3 + 1/4' in generate.call_args.args[2]

def test_photo_restrictions(client):
    assert client.post('/api/v1/tutor/photo',files={'file':('q.png',b'bad','image/png')}).status_code==403
    assert client.post('/api/v1/tutor/photo',data={'consent':'true'},files={'file':('q.txt',b'bad','text/plain')}).status_code==415
    assert client.post('/api/v1/tutor/photo',data={'consent':'true'},files={'file':('q.png',b'bad','image/png')}).status_code==422
    assert client.post('/api/v1/tutor/photo',data={'consent':'true'},files={'file':('q.jpg',b'x'*4_000_001,'image/jpeg')}).status_code==413

def test_photo_reencoding_and_provider_contract(client):
    original=io.BytesIO()
    Image.new('RGB',(20,20),'white').save(original,format='PNG')
    with patch('app.main.generate',new=AsyncMock(return_value='Read the question')) as generate:
        r=client.post('/api/v1/tutor/photo',data={'consent':'true','language':'te'},files={'file':('q.png',original.getvalue(),'image/png')})
        assert r.status_code==200
        assert generate.call_args.args[0][1]['inlineData']['mimeType']=='image/jpeg'

def test_rate_limit_and_no_private_data_routes(client):
    for _ in range(20):
        assert client.post('/api/v1/tutor/explain',json=request()).status_code==200
    assert client.post('/api/v1/tutor/explain',json=request()).status_code==429
    for endpoint in ['/api/v1/progress/me','/api/v1/guardian/summary','/api/v1/progress/sync']:
        assert client.get(endpoint).status_code==404

def test_cors(client):
    r=client.options('/api/v1/tutor/chat',headers={'Origin':'https://untrusted.example','Access-Control-Request-Method':'POST'})
    assert 'access-control-allow-origin' not in r.headers
