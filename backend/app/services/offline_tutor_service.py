from app.schemas.ai import TutorRequest
from app.repositories.lesson_repository import lesson_by_id
def offline(req: TutorRequest):
    lesson = lesson_by_id(req.lesson_id)
    lang = req.language if req.language in lesson['summary'] else 'en'
    if req.mode == 'hint':
        text = lesson['summary'][lang]
    elif req.mode == 'simple':
        text = lesson['steps'][0]['body'][lang]
    elif req.mode == 'example':
        text = '\n\n'.join(s['example'] for s in lesson['steps'])
    else:
        text = '\n\n'.join(f"{i+1}. {s['title'][lang]}\n{s['body'][lang]}\n{s['example']}" for i,s in enumerate(lesson['steps']))
    return {'answer':text,'source':'offline','lesson_id':req.lesson_id}

