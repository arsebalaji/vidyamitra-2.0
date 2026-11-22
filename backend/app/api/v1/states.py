from fastapi import APIRouter
router=APIRouter()
from app.services.state_service import states
router.get('/states')(states)
