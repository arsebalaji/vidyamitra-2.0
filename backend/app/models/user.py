from pydantic import BaseModel
class User(BaseModel):
    id:str
    authenticated:bool=False
