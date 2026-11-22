from fastapi import APIRouter
router=APIRouter()
from app.services.ai_tutor_service import chat,explain
router.post('/tutor/chat')(chat)
router.post('/tutor/explain')(explain)
