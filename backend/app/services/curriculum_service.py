from app.content.lesson_loader import PACK
def curriculum():
    return {'country':'India','state':'Telangana','board':'Telangana State Board','class':8,'subject':'Mathematics','chapter':PACK['chapter'],'version':PACK['version'],'lessons':[{'id':x['id'],'title':x['title'],'minutes':x['minutes']} for x in PACK['lessons']]}
