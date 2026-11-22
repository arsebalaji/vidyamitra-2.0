from fastapi import APIRouter
router=APIRouter()
from app.services.quiz_service import check
router.post('/quiz/check')(check)
