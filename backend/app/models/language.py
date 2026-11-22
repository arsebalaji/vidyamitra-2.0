from pydantic import BaseModel
class Language(BaseModel):
    code:str
    enabled:bool=False
    direction:str='ltr'
    status:str='review_required'
