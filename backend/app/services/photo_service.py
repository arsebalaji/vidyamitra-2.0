import base64,io,json
from typing import Literal
from PIL import Image,UnidentifiedImageError
from fastapi import File,Form,UploadFile,HTTPException
from app.content.lesson_loader import PACK
from app.services.gemini_service import generate
async def photo(file: UploadFile = File(...), consent: bool = Form(False), language: Literal['te','en','hi','ta','kn','ml','mr','bn','gu','pa','or','ur'] = Form('te')):
    if not consent:
        raise HTTPException(403, 'Photo upload consent is required.')
    if file.content_type not in ('image/jpeg','image/png','image/webp'):
        raise HTTPException(415, 'Use JPEG, PNG or WebP.')
    data = await file.read(4_000_001)
    if len(data) > 4_000_000:
        raise HTTPException(413, 'Maximum image size is 4 MB.')
    try:
        Image.MAX_IMAGE_PIXELS = 12_000_000
        with Image.open(io.BytesIO(data)) as image:
            if image.width * image.height > 12_000_000:
                raise ValueError('Too many pixels')
            image.load()
            image.thumbnail((1600,1600))
            clean = io.BytesIO()
            image.convert('RGB').save(clean, format='JPEG', quality=85)
    except (UnidentifiedImageError, OSError, ValueError, Image.DecompressionBombError):
        raise HTTPException(422, 'Invalid image or image dimensions too large.')
    text = await generate([{'text':'Read this rational-number question and explain the solution. If unclear, ask for a clearer photo; never guess illegible text.'},{'inlineData':{'mimeType':'image/jpeg','data':base64.b64encode(clean.getvalue()).decode()}}], language, json.dumps(PACK['lessons'],ensure_ascii=False))
    return {'answer':text,'source':'gemini','lesson_id':'meaning'}

