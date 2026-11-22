from app.repositories.lesson_repository import lesson_by_id
from app.content.lesson_loader import PACK
def get_lesson(id: str):
    return lesson_by_id(id)

def questions(id: str):
    lesson_by_id(id)
    return [q for q in PACK['questions'] if q['lessonId'] == id]
