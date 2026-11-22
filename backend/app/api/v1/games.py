from fastapi import APIRouter
from app.services.game_service import games
router=APIRouter()

@router.get('/games')
def catalog():
    return games()
