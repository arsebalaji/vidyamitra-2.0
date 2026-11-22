import json
from app.core.config import ROOT
def languages():
    return json.loads((ROOT/'shared/curriculum/india/languages.json').read_text(encoding='utf-8'))
