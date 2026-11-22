from fastapi import APIRouter
from app.services.reward_service import reward_catalog
router=APIRouter()

@router.get('/rewards')
def catalog():
    return reward_catalog()
