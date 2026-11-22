from fastapi import APIRouter
router=APIRouter()
from app.services.board_service import boards
router.get('/boards')(boards)
