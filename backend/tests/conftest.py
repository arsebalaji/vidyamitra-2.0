import os
os.environ['DATABASE_URL']='sqlite:///./test-curriculum.db'
os.environ['ENABLE_AI']='false'
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.security import hits
@pytest.fixture
def client():
    hits.clear()
    with TestClient(app) as c:
        yield c
