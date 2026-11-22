from pydantic import BaseModel
class Subject(BaseModel):
    id:str
    title:dict[str,str]
    enabled:bool=False
