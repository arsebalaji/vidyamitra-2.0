from pydantic import BaseModel
class State(BaseModel):
    id:str
    name:str
    nameTe:str
    enabled:bool=True
