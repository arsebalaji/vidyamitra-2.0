from pydantic import BaseModel
class Progress(BaseModel):
    profileId:str
    questionId:str
    lessonId:str
    correct:bool
    hint:bool=False
    at:int
