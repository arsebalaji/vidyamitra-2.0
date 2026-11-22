from app.services.language_service import languages
def seed_languages():
    """Read-only catalog loader. Catalogs are version-controlled, not user data."""
    return languages()
