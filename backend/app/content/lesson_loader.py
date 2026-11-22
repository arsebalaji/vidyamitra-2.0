import json
from app.core.config import ROOT
def load_pack():
    folder=ROOT/'shared/curriculum/telangana/class-8/mathematics/te'
    read=lambda name:json.loads((folder/name).read_text(encoding='utf-8'))
    manifest=read('manifest.json')
    return {'version':manifest['version'],'chapter':manifest['chapter'],'lessons':read('lessons.json'),'questions':read('questions.json')}
PACK=load_pack()
