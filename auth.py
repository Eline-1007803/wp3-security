from flask import request, abort
from models.organisatie_model import Organisatie

def require_api_key(f):
    def decorated_function(*args, **kwargs):
        api_key = request.headers.get('x-api-key')
        organisatie = Organisatie.query.filter_by(api_key=api_key).first()
        if organisatie:
            return f(*args, **kwargs)
        else:
            abort(401, description="Unauthorized: Invalid or missing API key")
    return decorated_function