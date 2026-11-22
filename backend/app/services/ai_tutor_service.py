import json
from fastapi import HTTPException
from app.schemas.ai import TutorRequest
from app.repositories.lesson_repository import lesson_by_id
from app.services.offline_tutor_service import offline
from app.services.gemini_service import generate
async def chat(req: TutorRequest):
    if not req.online:
        return offline(req)
    if not req.consent:
        raise HTTPException(403, 'Consent is required before sending a question online.')
    lesson = lesson_by_id(req.lesson_id)
    text = await generate([{'text':f'{req.mode}: {req.message}'}], req.language, json.dumps(lesson, ensure_ascii=False))
    return {'answer':text,'source':'gemini','lesson_id':req.lesson_id}

def explain(req: TutorRequest):
    return offline(req)
