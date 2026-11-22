from fastapi import APIRouter
router=APIRouter()
from app.services.photo_service import photo
router.post('/tutor/photo')(photo)
