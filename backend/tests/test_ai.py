import io
from unittest.mock import AsyncMock,patch
from PIL import Image
from app.content.lesson_loader import PACK
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
    with patch('app.services.ai_tutor_service.generate',new=AsyncMock(return_value='A grounded response')) as generate:
        r=client.post('/api/v1/tutor/chat',json=request(online=True,consent=True))
        assert r.json()['source']=='gemini'
        assert '1/3 + 1/4' in generate.call_args.args[2]

def test_photo_reencoding_and_provider_contract(client):
    original=io.BytesIO()
    Image.new('RGB',(20,20),'white').save(original,format='PNG')
    with patch('app.services.photo_service.generate',new=AsyncMock(return_value='Read the question')) as generate:
        r=client.post('/api/v1/tutor/photo',data={'consent':'true','language':'te'},files={'file':('q.png',original.getvalue(),'image/png')})
        assert r.status_code==200
        assert generate.call_args.args[0][1]['inlineData']['mimeType']=='image/jpeg'