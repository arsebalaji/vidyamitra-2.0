from pydantic import Field
from app.schemas.common import StrictModel
class CheckRequest(StrictModel):
    question_id: str = Field(max_length=60)
    answer: str = Field(min_length=1, max_length=32, pattern=r'^\s*[+-]?\d{1,9}(?:\s*/\s*[+-]?\d{1,9})?\s*$')
