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
                if "user" in response:
                    return jsonify(response), 200
                
                return jsonify(response), 200 if not isinstance(response, dict) else response

        except Exception as error:
            # Generic exception handling
            ic(error)
            return jsonify({"error": str(error)}), 500
                   
def verify_user():
    REQUEST = request.method
    if REQUEST == 'POST':
        try:
            token = request.args.get('token')
            ic(token)
            
            if not token:
                return jsonify({"error": "No token provided"}), 400
            
            response = create_new_user_with_token(token=token)
            ic(response)
            
            if response.get('error'):
                return jsonify(response), 400
            
            if response['message'] == 'User created successfully':
                response["token"] = token
                return jsonify(response), 200
            else:
                return jsonify(response), 201
    
        except Exception as error:
            # Generic exception handling
            ic(str(error))
            return jsonify({"error": "An unexpected error occurred", "details": str(error)}), 500
                
                
def user(id):
    REQUEST = request.method 
    if REQUEST == 'GET':
        try:
            response = fetch_user(id)
            return jsonify(response), 200 if not isinstance(response, dict) else response[1]

        except Exception as error:
            # Generic exception handling
            return jsonify({"error": str(error)}), 500

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

  
            response = edit_user(
                id=id, 
                is_admin=is_admin, 
                is_staff=is_staff, 
                user_title_id=user_title_id,
                username=username,
                firstname=firstname,
                lastname=lastname,
                github_username=github_username
                )
            return jsonify(response), 200 if not isinstance(response, dict) else response[1]

        except Exception as error:
            # Generic exception handling
            return jsonify({"error": str(error)}), 500
    
    # delete
    elif REQUEST == 'DELETE':
        try:
            data = request.get_json()
            id = data['id']

            response = delete_user(id)
            return jsonify(response), 200 if not isinstance(response, dict) else response[1]

        except Exception as error:
            # Generic exception handling
            return jsonify({"error": str(error)}), 500
    
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
                    return jsonify({"message": "Error: email format. Check you email."}), 404
            
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
                    return jsonify(res), 200
        except Exception as e:
            return jsonify(e), 400
        
def users():
    REQUEST = request.method 
    if REQUEST == 'GET':
        try:
            response = fetch_users()
            return jsonify(response), 200 if not isinstance(response, dict) else response[1]

        except Exception as error:
            # Generic exception handling
            return jsonify({"error": str(error)}), 500
