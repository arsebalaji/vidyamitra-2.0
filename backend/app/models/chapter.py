from pydantic import BaseModel
class Chapter(BaseModel):
    id:str
    title:dict[str,str]
    available:bool=False
