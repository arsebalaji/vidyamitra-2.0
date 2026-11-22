from sqlalchemy.orm import Session
from app.core.database import engine
def get_db():
    with Session(engine) as session:
        yield session
