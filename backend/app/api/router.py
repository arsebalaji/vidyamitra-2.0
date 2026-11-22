from fastapi import APIRouter
from app.api.v1 import health
from app.api.v1 import states
from app.api.v1 import boards
from app.api.v1 import languages
from app.api.v1 import curriculum
from app.api.v1 import lessons
from app.api.v1 import quiz
from app.api.v1 import ai
from app.api.v1 import photo
router=APIRouter(prefix='/api/v1')
router.include_router(health.router)
router.include_router(states.router)
router.include_router(boards.router)
router.include_router(languages.router)
router.include_router(curriculum.router)
router.include_router(lessons.router)
router.include_router(quiz.router)
router.include_router(ai.router)
router.include_router(photo.router)

from app.api.v1 import games, missions, rewards, revision
for module in (games, missions, rewards, revision):
    router.include_router(module.router)
