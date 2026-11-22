import json
from pathlib import Path
from app.models.game import Game

def games():
    file = Path(__file__).resolve().parents[3] / 'shared/curriculum/telangana/class-8/mathematics/te/games.json'
    return [Game.model_validate(row).model_dump() for row in json.loads(file.read_text(encoding='utf-8'))]
