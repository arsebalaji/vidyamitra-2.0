from typing import Literal
from pydantic import BaseModel
class Game(BaseModel):
    id: str
    category: str
    title: str
    status: Literal['active', 'practice-preview', 'planned']
    route: str | None = None
