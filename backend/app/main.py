from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import CORS_ORIGINS
from app.core.security import limits,hits
from app.content.lesson_loader import PACK
from app.seed.seed_curriculum import seed_curriculum
from app.api.router import router

@asynccontextmanager
async def lifespan(app):
    seed_curriculum()
    yield

app=FastAPI(title='VidyaMitra AI',version='4.0.0',lifespan=lifespan)
app.add_middleware(CORSMiddleware,allow_origins=CORS_ORIGINS,allow_methods=['GET','POST'],allow_headers=['Content-Type'])
app.middleware('http')(limits)
app.include_router(router)

