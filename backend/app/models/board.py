from pydantic import BaseModel
class Board(BaseModel):
    id:str
    stateId:str
    name:str
    enabled:bool=True
