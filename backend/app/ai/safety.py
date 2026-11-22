from fastapi import HTTPException
def require_consent(consent:bool):
    if not consent:raise HTTPException(403,'Explicit consent is required before sending data to the AI provider.')
