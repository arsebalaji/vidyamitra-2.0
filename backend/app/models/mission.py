from pydantic import BaseModel
class Mission(BaseModel):
    id: str
    title: dict[str, str]
    lesson_id: str
    order: int
