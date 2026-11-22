from fastapi import APIRouter
router=APIRouter()
import os
def health():
    return {'status': 'ok', 'version': '4.0.0', 'ai_configured': bool(os.getenv('GEMINI_API_KEY')) and os.getenv('ENABLE_AI') == 'true'}
router.get('/health')(health)
