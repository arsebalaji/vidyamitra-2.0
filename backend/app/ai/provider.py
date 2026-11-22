from typing import Protocol
class Provider(Protocol):
    async def generate(self,parts:list,language:str,context:str)->str:...
from app.services.gemini_service import generate
