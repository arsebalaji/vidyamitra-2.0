import json
from app.core.config import ROOT
def states():
    return json.loads((ROOT/'shared/curriculum/india/states.json').read_text(encoding='utf-8'))
