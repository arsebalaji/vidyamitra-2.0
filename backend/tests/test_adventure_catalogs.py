def test_game_catalog_truthfully_marks_unimplemented_games(client):
    response=client.get('/api/v1/games')
    assert response.status_code==200
    games=response.json()
    assert len(games)==18
    assert next(g for g in games if g['id']=='FractionQuest')['status']=='active'
    assert all(g['route'] is None for g in games if g['status']=='planned')

def test_missions_and_revision_use_real_lessons(client):
    missions=client.get('/api/v1/missions').json()
    revision=client.get('/api/v1/revision').json()
    assert len(missions)==8
    assert {m['lesson_id'] for m in missions}=={l['id'] for l in revision['lessons']}
    assert revision['personalization']=='device-only'
    assert client.get('/api/v1/rewards').json()['storage']=='local-derived'
