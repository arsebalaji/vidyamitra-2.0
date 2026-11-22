from app.content.lesson_loader import PACK
from app.models.mission import Mission

def missions():
    return [Mission(id='lesson-'+lesson['id'], title=lesson['title'], lesson_id=lesson['id'], order=i+1).model_dump() for i, lesson in enumerate(PACK['lessons'])]
