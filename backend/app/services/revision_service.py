from app.content.lesson_loader import PACK

def revision_catalog():
    # Learner-specific incorrect answers stay on the device.
    return {'personalization':'device-only', 'lessons':[{'id':lesson['id'],'title':lesson['title']} for lesson in PACK['lessons']]}
