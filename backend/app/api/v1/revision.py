from fastapi import APIRouter
from app.services.revision_service import revision_catalog
router=APIRouter()

@router.get('/revision')
def catalog():
    return revision_catalog()
