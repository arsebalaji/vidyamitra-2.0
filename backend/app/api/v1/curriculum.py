from fastapi import APIRouter
router=APIRouter()
from app.services.curriculum_service import curriculum
router.get('/curriculum')(curriculum)
