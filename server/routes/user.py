import json
from flask import request
from sqlalchemy import JSON
from controllers.account import ( create_user, fetch_users, edit_user, delete_user, fetch_user )

def user(id):
    REQUEST = request.method 
    if REQUEST == 'GET':
        try:
            if id:
                response = fetch_user(id)
                if response:
                    res = {
                            "message": "Fetch successful",
                            "data": response
                            }
                    return res, 200
                else:
                    res = {"message": "Fetch failed: something went wrong."}
                    return res, 400
        except:
            return {"message": "Fetch failed: something went wrong."}
            
        # edit/update
    elif REQUEST == 'PUT':
        try:
            is_admin = json.loads(request.data)['is_admin']
            is_staff = json.loads(request.data)['is_staff']
            user_title_id = json.loads(request.data)['user_title_id']
            id = json.loads(request.data)['id']
            
            if id:
                response = edit_user(id, is_admin, is_staff, user_title_id)
                if response:
                        res = {"data": f"{response}",
                            "message": "Update successful"
                            }
                        return res, 200
            res = {"message": "Title or is ID invalid"}
            return res, 400
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return res, 400
    
    # delete
    elif REQUEST == 'DELETE':
        try:
            response = json.loads(response)
            id = json.loads(request.data)['id']
            if id:
                response = delete_user(id)
                if response == id:
                    res = {"message": "Delete failed: something went wrong."}
                    return res, 400
                else:
                    res = {
                            "message": "Delete successful"
                            }
                    return res, 200
            res = {"message": "Title or is ID invalid"}
            return res, 400 
        except json.decoder.JSONDecodeError:
           res = {"message": "Missing data"}
        return res, 400
    

def create_user_profile():
    REQUEST = request.method 
    if REQUEST == 'POST':
        try:
            email = json.loads(request.data)['email']
            username = json.loads(request.data)['username']
            lastname = json.loads(request.data)['lastname']
            is_admin = json.loads(request.data)['is_admin']
            is_staff = json.loads(request.data)['is_staff']
            profile = json.loads(request.data)['profile']
            user_title_id = json.loads(request.data)['user_title_id']

            if email and username and lastname and profile and user_title_id:
                response = create_user(email, username, lastname, is_admin, is_staff, profile, user_title_id)
                if response:
                        res = {"data": f"{user}"}
                        return res, 201
                else:
                    res = {"message": f"{email} already exist"}
                    return res, 400 
                
            res = {"message": "Title invalid: (you must enter title)"}
            return res, 400 
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return res, 400
    elif REQUEST == 'GET':
        try:
            response = fetch_users()
            result = response
            res = {"data": result}
            return res, 200

        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}