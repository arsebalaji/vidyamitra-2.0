import pytest
from app.services.progress_service import remote_progress
from app.core.exceptions import FeatureUnavailable
def test_remote_progress_is_not_exposed():
    with pytest.raises(FeatureUnavailable):remote_progress('guessed-id')
