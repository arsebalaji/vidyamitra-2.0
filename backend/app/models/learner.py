from pydantic import BaseModel
class Learner(BaseModel):
    id:str
    name:str
    color:str
    created:int
