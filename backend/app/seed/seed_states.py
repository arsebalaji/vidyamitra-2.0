from app.services.state_service import states
def seed_states():
    """Read-only catalog loader. Catalogs are version-controlled, not user data."""
    return states()
