import os
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase
from app.core import config
engine=create_engine(os.getenv('DATABASE_URL','sqlite:///./curriculum.db'),connect_args={'check_same_thread':False})
class Base(DeclarativeBase):
    pass
