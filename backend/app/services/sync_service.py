from app.core.exceptions import FeatureUnavailable
def sync(*args,**kwargs):
    raise FeatureUnavailable('Cloud synchronization requires an authentication design and is not enabled.')
