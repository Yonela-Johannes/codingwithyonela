import json
from flask import request, jsonify
from sqlalchemy import JSON
from email_templates.feedback import feedback_email, site_feedback_email, update_user_feedback_email
from controllers.feedback_controller import create_feedback, edit_feedback, fetch_feedback, fetch_all_feedback, edit_feedback_status
from icecream import ic
from controllers.account import get_user_by_email
from email_templates.recommendation import recommendation_email_temp, send_to_me, recommendation_email_temp_user, send_to_creator, update_user_mail
from routes.image_upload import uploadImage
from utils.token_handler import valid_token

def feedback(id, mail):
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch one
        try:
            if id:
                response = fetch_feedback(id)
                return jsonify(response), 200
        except json.decoder.JSONDecodeError as error:
                return jsonify(error), 400
            
        # edit/update
    elif REQUEST == 'PUT':
        try:
            data = request.get_json()

            if 'status' in data != "undefined":
                status = data['status']
                feedback_id = data['feedback_id']
                if id == feedback_id and status:
                    ic(status)
                    response = edit_feedback_status(status=status, feedback_id=feedback_id)
                    if response and 'id' in response:
                        update_user_feedback_email(
                            email=response['email'],
                            name=response['name'],
                            lastname=response['lastname'],
                            mail=mail
                        )
                        return jsonify(response), 200 if not isinstance(response, dict) else response

        except json.decoder.JSONDecodeError as error:
                return jsonify(error), 400

def all_feedback(mail):
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch all
        try:
            response = fetch_all_feedback()
            return jsonify(response), 200 if not isinstance(response, dict) else response

        except json.decoder.JSONDecodeError as error:
                return jsonify(error), 400
        
    # Create recommendation
    elif REQUEST == 'POST':
        try:
            data = request.form
            files = request.files
   
            account_id = data['account']
            name = data['name']
            lastname = data['lastname']
            message = data['feedback']
            email = data['email']
            company = data['company']
            rating = data['rating']
            
            image = ""
            if 'image' in files:
                image = files['image']
                res = uploadImage(image=image)
                if res:
                    image = res['url']
                else:
                    return jsonify({'message': 'Error image upload'}), 400
            elif account_id and account_id != "undefined" and 'image' != files:
                image = data['image']

            response = create_feedback(
                name=name, 
                lastname=lastname, 
                email=email,
                company=company,
                image=image, 
                message=message, 
                rating=rating, 
            )
            if response and 'id' in response:
                feedback_email(
                    name=response['name'],
                    lastname=response['lastname'],
                    email=response['email'],
                    company=response['company'],
                    image=response['image'],
                    message=response['message'],
                    status=response['status'],
                    rating=response['rating'],
                    mail=mail
                )
                
                site_feedback_email(
                    name=response['name'],
                    lastname=response['lastname'],
                    email=response['email'],
                    company=response['company'],
                    image=response['image'],
                    message=response['message'],
                    status=response['status'],
                    rating=response['rating'],
                    mail=mail,
                )
    
                return jsonify(response), 200 if not isinstance(response, dict) else response   
                        
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400