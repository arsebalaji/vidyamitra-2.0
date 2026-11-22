from pydantic import BaseModel
class Curriculum(BaseModel):
    country:str='India'
    state:str='Telangana'
    board:str='Telangana State Board'
    grade:int=8
    subject:str='Mathematics'
