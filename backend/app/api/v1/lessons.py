from fastapi import APIRouter
router=APIRouter()
from app.services.lesson_service import get_lesson,questions
router.get('/lessons/{id}')(get_lesson)
router.get('/lessons/{id}/questions')(questions)
