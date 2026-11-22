from typing import Literal
from pydantic import Field
from app.schemas.common import StrictModel
class TutorRequest(StrictModel):
    message: str = Field(default='', max_length=1500)
    lesson_id: str = Field(max_length=50)
    language: Literal['te','en','hi','ta','kn','ml','mr','bn','gu','pa','or','ur'] = 'te'
    mode: Literal['simple', 'steps', 'example', 'hint'] = 'steps'
    online: bool = False
    consent: bool = False

