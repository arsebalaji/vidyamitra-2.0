import re
from fractions import Fraction
from fastapi import HTTPException
from app.schemas.quiz import CheckRequest
from app.content.lesson_loader import PACK
def check(req: CheckRequest):
    q = next((q for q in PACK['questions'] if q['id'] == req.question_id), None)
    if q is None:
        raise HTTPException(404, 'Question not found')
    try:
        correct = Fraction(re.sub(r'\s+', '', req.answer)) == Fraction(q['answer'])
    except (ValueError, ZeroDivisionError):
        raise HTTPException(422, 'Use an integer or fraction with a nonzero denominator.')
    return {'correct':correct,'answer':q['answer'],'explanation':q['explanation']}
