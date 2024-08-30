import json
from flask import request, jsonify
from icecream import ic
from controllers.account import get_current_user

def valid_token():
    get_token = request.headers.get('Autherization')
    token = get_token.split(" ")[1]
    res = get_current_user(token=token)
    try: 
        if 'id' not in res:
            return False
        return res
    except json.decoder.JSONDecodeError as error:
        return jsonify(error), 400