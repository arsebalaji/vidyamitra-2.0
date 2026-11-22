from app.core.exceptions import FeatureUnavailable
def remote_progress(*args,**kwargs):
    raise FeatureUnavailable('Progress is stored privately in the browser; no remote progress service is enabled.')
