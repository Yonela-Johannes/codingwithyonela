from flask import request, jsonify
from icecream import ic
from controllers.account import get_current_user

def valid_token():
    token = request.headers.get('token')
    res = get_current_user(token=token)
    response = None
    try: 
        ic(res)
        if res['message'] == 'You are not authorized':
            response = re
        elif res: 
            return ''
        else:
            return
    except:
        return {"message": "You are not authorized"}
    finally:
        return response
    return response