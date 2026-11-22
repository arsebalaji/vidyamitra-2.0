import logging
def get_logger(name:str):
    # Never log request bodies, child details, photos or provider secrets.
    return logging.getLogger('vidyamitra.'+name)
