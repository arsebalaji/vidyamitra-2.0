import os
from pathlib import Path
from dotenv import load_dotenv
load_dotenv()
ROOT=Path(__file__).resolve().parents[3]
CORS_ORIGINS=os.getenv('CORS_ORIGINS','http://127.0.0.1:5173,http://localhost:5173,http://127.0.0.1:4173').split(',')
