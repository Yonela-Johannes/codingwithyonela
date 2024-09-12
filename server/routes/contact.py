import json
from flask import request, jsonify
from icecream import ic
from controllers.account import get_user_by_email
from routes.image_upload import uploadImage

from controllers.contact_controller import create_contact_us, fetch_contacts, fetch_contact, fetch_newsletters, create_newsletter
from email_templates.contact_us_template import contact_us_send_to_creator, contact_send_to_me, newsletter_send_to_me, newsletter_us_send_to_creator

def contact(id, mail):
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch one
        try:
            if id:
                response = fetch_contact(id)
                return jsonify(response), 200 if not isinstance(response, dict) else response
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400


def contact_us(mail):
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch all mails
        try:
            response = fetch_contacts()
            return jsonify(response), 200 if not isinstance(response, dict) else response

        except json.decoder.JSONDecodeError as error:
            ic(error)
            return {"message": "Fetch failed: something went wrong."}, 400
    # Create send email
    elif REQUEST == 'POST':
        
        try:
            data = request.form
            files = request.files
            account_id = ""
            if "account_id" in data:
                account_id = data['account_id']

            if account_id == 'undefined':
                user = get_user_by_email(email="johannesyonela@gmail.com")
                account_id = user['id']
                
            if  account_id and "email" in data and 'message' in data or 'image' in files or 'image' in data:
                name = data['name']
                lastname = data['lastname']
                email = data['email']
                message = data['message']
                new_image = ''
                if 'image' in data:
                    new_image = data['image']
                elif 'image' in files:
                    get_image = files['image']
                    res = uploadImage(image=get_image)
                    if res:
                        new_image = res['url']
                    else:
                        return {'message': 'Error image upload'}, 400
                ic(account_id)
                if account_id and email:
                    response = create_contact_us(
                        name=name, 
                        lastname=lastname, 
                        image=new_image,  
                        email=email, 
                        message=message
                        )
                    if response and 'id' in response:
                        contact_us_send_to_creator(
                            email=response['email'],
                            name=response['name'],
                            image=response['image'],
                            lastname=response['lastname'],
                            time=response['time'],
                            message=response['message'],
                            mail=mail
                        )
                                                        
                        contact_send_to_me(
                            email=response['email'],
                            name=response['name'],
                            image=response['image'],
                            lastname=response['lastname'],
                            time=response['time'],
                            message=response['message'],
                            mail=mail
                        )
                if "error" in response:
                    return jsonify(response), 500
                return jsonify(response), 200 if not isinstance(response, dict) else response
    
        except json.decoder.JSONDecodeError as error:
            ic(error)
            return jsonify(error), 400
        
        

def newsletter(mail):
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch all mails
        try:
            response = fetch_newsletters()()
            return jsonify(response), 200 if not isinstance(response, dict) else response

        except json.decoder.JSONDecodeError as error:
            ic(error)
            return {"message": "Fetch failed: something went wrong."}, 400
    # Create send newsletter
    elif REQUEST == 'POST':
        
        try:
            data = request.form
            if  "email" in data:
                email = data['email']
                ic(email)
                if email:
                    response = create_newsletter( 
                        email=email
                        )
                    if response and 'id' in response:
                        newsletter_us_send_to_creator(
                            email=response['email'],
                            mail=mail,
                        )
                                                        
                        newsletter_send_to_me(
                            email=response['email'],
                            time=response['time'],
                            mail=mail
                        )
                if "error" in response:
                    return jsonify(response), 500
                return jsonify(response), 200 if not isinstance(response, dict) else response
    
        except json.decoder.JSONDecodeError as error:
            ic(error)
            return jsonify(error), 400