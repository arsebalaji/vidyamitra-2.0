def mastery(attempts:list[dict])->int:
    recent=attempts[-10:]
    return round(sum((0.5 if x.get('hint') else 1) if x['correct'] else 0 for x in recent)/len(recent)*100) if recent else 0
def difficulty(attempts:list[dict])->int:
    if sum(not x['correct'] for x in attempts[-3:])>=2:return 1
    score=mastery(attempts)
    return 3 if score>=80 and len(attempts)>=3 else 2 if score>=50 else 1
