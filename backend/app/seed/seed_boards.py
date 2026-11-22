from app.services.board_service import boards
def seed_boards():
    """Read-only catalog loader. Catalogs are version-controlled, not user data."""
    return boards()
