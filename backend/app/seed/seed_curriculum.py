from sqlalchemy.orm import Session
from app.core.database import Base,engine
from app.models.lesson import Content
from app.content.lesson_loader import PACK
def seed_curriculum():
    Base.metadata.create_all(engine)
    with Session(engine) as session:
        for lesson in PACK['lessons']:
            session.merge(Content(id=lesson['id'],payload=lesson))
        session.commit()
if __name__=='__main__':
    seed_curriculum()
