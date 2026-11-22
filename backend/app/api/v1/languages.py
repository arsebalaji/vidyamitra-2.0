from fastapi import APIRouter
router=APIRouter()
from app.services.language_service import languages
router.get('/languages')(languages)
