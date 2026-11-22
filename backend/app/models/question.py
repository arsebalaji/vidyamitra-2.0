from pydantic import BaseModel
class Question(BaseModel):
    id:str
    lessonId:str
    level:int
    prompt:dict[str,str]
    answer:str
    hint:dict[str,str]
    explanation:dict[str,str]
