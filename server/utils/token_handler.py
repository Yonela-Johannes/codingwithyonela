import json
from flask import request, jsonify
from icecream import ic
from controllers.account import get_current_user

def valid_token():
    token = request.headers.get('token')
    res = get_current_user(token=token)
    
    response = None
    try: 
        if res['message'] == 'You are not authorized':
            return False
        return True
    except json.decoder.JSONDecodeError as error:
        return jsonify(error), 400

    return response