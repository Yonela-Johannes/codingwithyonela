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
            data = request.get_json()
            print(data)
            
            is_admin: bool = False
            is_staff: bool = False
            user_title_id: str = ""
            
            if "id" in data:
                response = fetch_user(id)
                if response is None:
                    res = {"message": "Invalid user"}
                    return res, 400

                id = response['id']                            
                if "is_admin" in data:
                    is_admin = data['is_admin']
                else:
                    is_admin = False
                    
                if "is_staff" in data:
                    is_staff = data['is_staff']
                else:
                    is_staff = False
                    
                if "user_title_id" in data:
                    user_title_id = data['user_title_id']
            
                if id:
                    # response = edit_user(id, is_admin, is_staff, user_title_id)
                    # if response:
                    #     res = {"data": f"{response}",
                    #         "message": "Update successful"
                    #         }
                    # return res, 200
                    return {"message": "We are inside", "id": id}, 201
                else:
                    res = {"message": "Invalid user"}
                    return res, 400

    
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
            return res, 400
    
    # delete
    elif REQUEST == 'DELETE':
        try:
            data = request.get_json()
            id = data['id']
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
            data = request.get_json()
            
            print("DATA: ", data)
            email = data['email']
            username = data['username']
            lastname = data['lastname']
            is_admin = data['is_admin']
            is_staff = data['is_staff']
            
            user_title_id = ""
            if "user_title_id" in data:
                user_title_id = data['user_title_id']
            
            profile = ""
            if 'profile' in data:
                profile = data['profile']
                
            if email and username and lastname and user_title_id:
                response = create_user(email, username, lastname, is_admin, is_staff, profile, user_title_id)
                if response:
                        res = {"data": f"{user.json()}"}
                        return res, 201
                else:
                    res = {"message": f"{email} already exist"}
                    return res, 400 
                
            res = {"message": "Missing data"}
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