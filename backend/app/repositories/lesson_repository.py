from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.core.database import engine
from app.models.lesson import Content
def lesson_by_id(id: str):
    with Session(engine) as session:
        row = session.get(Content, id)
        if row is None:
            raise HTTPException(404, 'Lesson not found')
        return row.payload
