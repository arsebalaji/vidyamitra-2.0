import pytest
from app.services.sync_service import sync
from app.core.exceptions import FeatureUnavailable
def test_sync_is_explicitly_unavailable():
    with pytest.raises(FeatureUnavailable):sync()
