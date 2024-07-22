import json
from flask import request, jsonify
from sqlalchemy import JSON
from controllers.account import ( create_user, fetch_users, edit_user, delete_user, fetch_user, login, get_user_by_email, create_access_token, get_current_user, create_new_user_with_token )
from flask_mail import Mail, Message
import re
from icecream import ic
from routes.image_upload import uploadImage

def login_user():
    REQUEST = request.method 
    if REQUEST == 'GET':
        try:
            email = request.args.get('email')
            password = request.args.get('password')
            if email and password:
                response = login(email=email, password=password)

                if "message" in response:
                    return response, 404
                if response:
                    res = {
                            "message": "Fetch successful",
                            "data": response
                            }
                    return res, 200
                else:
                    res = {"message": "Error: something went wrong."}
                    return res, 400 
            else:
                res = {"message": "Error: missing email or password"}
                return res, 400 
        except:
            return {"message": "Fetch failed: something went wrong."}
                   
def verify_user():
    REQUEST = request.method
    if REQUEST == 'GET':
        try:
            token = request.args['token']
            if token:
                
                response = create_new_user_with_token(token=token)
                ic(response)
                print(response)
                if response == None:
                    return {"error": "Something went wrong"}, 400
                elif  response['message'] == 'User created successfull':
                    return response, 200
                elif response['message'] == 'You are not authorized' or response['message'] == "Data missing: register again":
                    return {"message": "Token expired, try creating an account again"}, 400
                else:
                    return response, 400
            else:
                return {"error": "Error: token"}, 400
        except:
            res = {"message": "Error: something went wrong"},
            return res, 400
              
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
            token = data['token']
            is_admin: bool = False
            is_staff: bool = False
            user_title_id: str = ""
            
            response = fetch_user(id)
            
            if response is None:
                res = {"message": "Invalid user"}
                return res, 400
            
            if response is None:
                res = {"message": "Invalid user"}
                return res, 400
            
            if token is None:
                res = {"message": "Invalid token"}
                return res, 400

            id = response['id']                            
            is_admin = data['is_admin']
            is_staff = data['is_staff']
            user_title_id = data['user_title_id']
        
            response = edit_user(id, is_admin, is_staff, user_title_id, token=token)
            ic(response)
            if response:
                res = {"data": f"{response}",
                    "message": "Update successful"
                    }
                return res, 200
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
    
def create_user_profile(mail):
    REQUEST = request.method 
    if REQUEST == 'POST':
        try:
            email_validate_pattern = r"^\S+@\S+\.\S+$"
            email = request.form['email']
            password = request.form['password']
            username = request.form['username']
            lastname = request.form['lastname']
            profile = request.files['profile']
            
            valid_email_format: str = ''
   
            if email:
                if re.match(email_validate_pattern, email):
                    valid_email_format = email
                else:
                    return {"message": "Error: email not found"}, 404
            
            db_user = get_user_by_email(email=valid_email_format)
            
            if db_user:
                res = {"message": f"Error: user {valid_email_format} already exists"}
                return res, 400 
            else:
                res = uploadImage(image=profile)
                if res:
                    user_data = {
                        "email": valid_email_format,
                        "password": password,
                        "username": username,
                        "lastname": lastname,
                        "profile": res['url'],
                        "profile_id": res['asset_id']
                    }
                    token = {}

                    token = create_access_token(data=user_data)
                    if token:
                        msg = Message(subject="CodingWithYonela", sender='noreplay@email.com', recipients=[valid_email_format]) 
                        msg.body = f"Hey {username} {lastname} \n click here to verify you account: http://localhost:3000/verify_account/{token}"   
                        response = mail.send(message=msg)
                        return {"message": "verification sent"}, 200
                    else:
                        return {"message": "Error invalid token or token expired"}, 404
                else:
                    res = {"message": "Error: something went wrong - image upload."}
                    return res, 400
        except Exception as e:
            ic(e)
            res = {"message": "Missing data"}
            return res, 400
        
def users():
    REQUEST = request.method 
    if REQUEST == 'GET':
        try:
            response = fetch_users()
            if response:
                res = {
                        "message": "Fetch successful",
                        "data": response
                        }
                return res, 200
            else:
                res = {"message":  "Fetch successful",
                       "users": []}
                return res, 200
        except:
            return {"message": "Fetch failed: something went wrong."}
            