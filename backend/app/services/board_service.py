import json
from app.core.config import ROOT
def boards(state_id:str='telangana'):
    return [b for b in json.loads((ROOT/'shared/curriculum/india/boards.json').read_text(encoding='utf-8')) if b['stateId']==state_id]
