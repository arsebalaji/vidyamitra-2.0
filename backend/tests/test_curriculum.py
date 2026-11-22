import io
from unittest.mock import AsyncMock,patch
from PIL import Image
from app.content.lesson_loader import PACK
def request(**kwargs):
    return dict(message='Explain fractions',lesson_id='addition',language='te',mode='steps',**kwargs)

def test_content_and_question_integrity(client):
    for lesson in PACK['lessons']:
        assert client.get('/api/v1/lessons/'+lesson['id']).json() == lesson
        qs=client.get('/api/v1/lessons/'+lesson['id']+'/questions').json()
        assert qs
        for q in qs:
            response=client.post('/api/v1/quiz/check',json={'question_id':q['id'],'answer':q['answer']})
            assert response.json()['correct'] is True
    assert client.get('/api/v1/lessons/missing').status_code == 404