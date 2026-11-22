from app.schemas.lesson import Lesson
from app.models.question import Question
from app.ai.math_validator import equivalent
def validate_pack(pack:dict):
    lessons=[Lesson.model_validate(l) for l in pack['lessons']]
    ids={l.id for l in lessons}
    if len(ids)!=len(lessons):raise ValueError('Duplicate lesson IDs')
    question_ids=set()
    for raw in pack['questions']:
        q=Question.model_validate(raw)
        if q.id in question_ids or q.lessonId not in ids or not equivalent(q.answer,q.answer):raise ValueError('Invalid question or answer')
        question_ids.add(q.id)
    return pack
