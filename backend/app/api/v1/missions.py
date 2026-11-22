from fastapi import APIRouter
from app.services.mission_service import missions
router=APIRouter()

@router.get('/missions')
def catalog():
    return missions()
