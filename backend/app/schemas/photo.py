from typing import Literal
from app.schemas.common import StrictModel
class PhotoConsent(StrictModel):
    consent:bool=False
    language:Literal['te','en','hi','ta','kn','ml','mr','bn','gu','pa','or','ur']='te'

