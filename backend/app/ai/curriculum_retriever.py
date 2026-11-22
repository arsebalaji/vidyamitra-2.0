from app.repositories.lesson_repository import lesson_by_id
def retrieve(lesson_id:str):
    return lesson_by_id(lesson_id)
