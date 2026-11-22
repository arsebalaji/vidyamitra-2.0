from pydantic import BaseModel
class Step(BaseModel):
    title:dict[str,str]
    body:dict[str,str]
    example:str
class Lesson(BaseModel):
    id:str
    title:dict[str,str]
    minutes:int
    steps:list[Step]
    summary:dict[str,str]
