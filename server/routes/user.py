import json
from flask import request, jsonify
from sqlalchemy import JSON
from email_templates.verification import verification_email
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
                    return response, 403
                if response:
                    res = {
                            "message": "Fetch successful",
                            "data": response
                            }
                    return jsonify(res), 200
                else:
                    res = {"message": "Error: something went wrong."}
                    return jsonify(res), 400
            else:
                res = {"message": "Error: missing email or password"}
                return jsonify(res), 400
        except Exception as error:
            ic(error)
            return {"message": "Fetch failed: something went wrong."}
                   
def verify_user():
    REQUEST = request.method
    if REQUEST == 'POST':
        try:
            token = request.args['token']
            if token:
                response = create_new_user_with_token(token=token)
                
                if response == None:
                    return {"error": "Something went wrong"}, 400
                elif  response['message'] == 'User created successfull':
                    response["token"] = token
                    return response, 200
                elif response['message'] == 'You are not authorized' or response['message'] == "Data missing: register again":
                    return {"message": "Token expired, try creating an account again"}, 403
                else:
                    return response, 400
            else:
                return {"error": "Error: token"}, 400
        except:
            res = {"message": "Error: something went wrong"},
            return jsonify(res), 400
     
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
                    return jsonify(res), 200
                else:
                    res = {"message": "Fetch failed: something went wrong."}
                    return jsonify(res), 400
        except:
            return {"message": "Fetch failed: something went wrong."}
            
        # edit/update
    elif REQUEST == 'PUT':
        try:
            data = request.get_json()
            
            response = fetch_user(id)
            
            return {}, 200
        
            is_admin: bool = False
            is_staff: bool = False
            username = None
            firstname = None
            lastname = None
            user_title_id = None
            github_username = None

            if 'title_id' in data:
                user_title_id = data['title_id']
            else:
                user_title_id = response['user_title_id']
            if 'is_admin' in data:      
                is_admin = data['is_admin']
            else:
                is_admin = response['is_admin']
                
            if 'is_staff' in data:
                is_staff = data['is_staff']
            else:
                is_staff = response['is_staff']
            
            if 'username' in data:
                username = data['username']
            else:
                username = response['username']
                
            if 'firstname' in data:
                firstname = data['firstname']
            else:
                firstname = response['firstname']

            if 'lastname' in data:
                lastname = data['lastname']
            else:
                lastname = response['lastname']
                
            if 'github_username' in data:
                github_username = data['github_username']
            else:
                github_username = response['github_username']

  
            response = edit_user(id=id, 
                                 is_admin=is_admin, 
                                 is_staff=is_staff, 
                                 user_title_id=user_title_id,
                                 username=username,
                                 firstname=firstname,
                                 lastname=lastname,
                                 github_username=github_username
                                 )
            if response:
                res = {"data": response,
                    "message": "Update successful"
                    }
                return jsonify(res), 200
            else:
                res = {"message": "Invalid user"}
                return jsonify(res), 400

        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
            return jsonify(res), 400
    
    # delete
    elif REQUEST == 'DELETE':
        try:
            data = request.get_json()
            id = data['id']
            if id:
                response = delete_user(id)
                if response == id:
                    res = {"message": "Delete failed: something went wrong."}
                    return jsonify(res), 400
                else:
                    res = {
                            "message": "Delete successful"
                            }
                    return jsonify(res), 200
            res = {"message": "Title or is ID invalid"}
            return jsonify(res), 400
        except json.decoder.JSONDecodeError:
           res = {"message": "Missing data"}
        return jsonify(res), 400
    
def create_user_profile(mail):
    REQUEST = request.method 
    if REQUEST == 'POST':
        try:
            email_validate_pattern = r"^\S+@\S+\.\S+$"
            email = request.form['email']
            password = request.form['password']
            username = request.form['username']
            firstname = request.form['firstname']
            lastname = request.form['lastname']
            profile = request.files['profile']
            
            valid_email_format: str = ''
        
            if email:
                if re.match(email_validate_pattern, email):
                    valid_email_format = email
                else:
                    return {"message": "Error: email format. Check you email."}, 404
            
            db_user = get_user_by_email(email=valid_email_format)
            
            if db_user:
                res = {"message": f"Error: user {valid_email_format} already exists. Try signin in."}
                return jsonify(res), 400
            else:
                res = uploadImage(image=profile)
                if res:
                    user_data = {
                        "email": valid_email_format,
                        "username": username,
                        "firstname": firstname,
                        "lastname": lastname,
                        "password": password,
                        "profile": res['url'],
                        "profile_id": res['asset_id']
                    }
                    token = {}
                    
                    token = create_access_token(data=user_data)
                    if token:
                        # Send email
                        verification_email(
                            username=username,
                            lastname=lastname,
                            email=email,
                            token=token,
                            mail=mail
                            )
                        return {"message": "verification sent check you emails"}, 200
                    else:
                        return {"message": "Error invalid token or token expired"}, 404
                else:
                    res = {"message": "Error: something went wrong - image upload."}
                    return jsonify(res), 400
        except Exception as e:
            ic(e)
            res = {"message": "Missing data"}
            return jsonify(res), 400
        
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
                return jsonify(res), 200
            else:
                res = {"message":  "Fetch successful",
                       "users": []}
                return res, 00
        except:
            return {"message": "Fetch failed: something went wrong."}
            