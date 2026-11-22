import io
from unittest.mock import AsyncMock,patch
from PIL import Image
from app.content.lesson_loader import PACK
def request(**kwargs):
    return dict(message='Explain fractions',lesson_id='addition',language='te',mode='steps',**kwargs)

def test_exact_answers_and_validation(client):
    body={'question_id':'standard-1','answer':'4/6'}
    assert client.post('/api/v1/quiz/check',json=body).json()['correct']
    body['answer']='1/0'
    assert client.post('/api/v1/quiz/check',json=body).status_code==422
    body['answer']='__import__("os")'
    assert client.post('/api/v1/quiz/check',json=body).status_code==422
    assert client.post('/api/v1/quiz/check',json={'question_id':'missing','answer':'1'}).status_code==404