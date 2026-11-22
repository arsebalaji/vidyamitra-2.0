from sqlalchemy import JSON,String
from sqlalchemy.orm import Mapped,mapped_column
from app.core.database import Base
class Content(Base):
    __tablename__ = 'lessons'
    id: Mapped[str] = mapped_column(String, primary_key=True)
    payload: Mapped[dict] = mapped_column(JSON)
