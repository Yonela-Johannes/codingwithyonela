import json
from flask import request, jsonify
from sqlalchemy import JSON
from controllers.recommendation import create_recommendation, delete_recommendation, edit_recommendation, fetch_recommendation, fetch_recommendations, edit_recommendation_status
from icecream import ic
from controllers.account import get_user_by_email
from email_templates.recommendation import recommendation_email_temp, send_to_me, recommendation_email_temp_user, send_to_creator, update_user_mail
from routes.image_upload import uploadImage
from utils.token_handler import valid_token

def recommendation(id, mail):
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch one
        try:
            if id:
                response = fetch_recommendation(id)
                return jsonify(response), 200 if not isinstance(response, dict) else response
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
        # edit/update
    elif REQUEST == 'PUT':
        try:
                    
            user =  valid_token() 
            if user == False: 
                return jsonify({'message': 'You are not authorized'}), 401
        
            data = request.get_json()

            if 'status' in data:
                account_id = data['account']
                status = data['status']
                re_id = data['re_id']
                if id == re_id and account_id and status:
                    response = edit_recommendation_status(status=status, re_id=re_id)
                    if response and 'id' in response:
                        
                        update_user_mail(
                            email=response['email'],
                            name=response['name'],
                            lastname=response['lastname'],
                            mail=mail
                        )                    
                        return jsonify(response), 200 if not isinstance(response, dict) else response
            else:
                account_id = data['account']
                name = data['name']
                second_name = data['second_name']
                lastname = data['lastname']
                portfolio = data['portfolio']
                github = data['github']
                linkedin = data['linkedin']
                email = data['email']
                portfolio = data['portfolio']
                quote = data['quote']
                status_id = data['status_id']
                title_id = data['title_id']
                country_id = data['country_id']

                if id and name and quote and title_id and account_id:
                    response = edit_recommendation(account_id, name, second_name, lastname, portfolio, github, linkedin, email, portfolio, quote, status_id, title_id, country_id, id)
                    return jsonify(response), 200 if not isinstance(response, dict) else response
   
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400

def all_recommendations(mail):
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch all
        try:
            response = fetch_recommendations()
            return jsonify(response), 200 if not isinstance(response, dict) else response

        except json.decoder.JSONDecodeError as error:
            ic(error)
            return {"message": "Fetch failed: something went wrong."}, 400
    # Create recommendation
    elif REQUEST == 'POST':
                
        user =  valid_token() 
        if user == False: 
            return jsonify({'message': 'You are not authorized'}), 401
        
        try:
            data = request.form
            files = request.files

            account_id = ""
            if "account_id" in data:
                account_id = data['account_id']
                
            sender_name = ""
            sender_email = ""
            sender_lastname = ""
            sender_details = False
            
            if 'sender_name' in data and 'sender_email' in data and 'sender_last_name' and "lastname" in data:
                sender_name = data['sender_name']
                sender_lastname = data['sender_lastname']
                sender_email = data['sender_email']
                sender_details = True
                
            if  account_id or sender_details:
                if "portfolio" in files and "github" in data and "linkedin" in data and "email" in data and "website" in data and "profession" in data and "country_id" in data:
                    name = data['name']
                    lastname = data['lastname']
                    get_image = files['portfolio']
                    res = uploadImage(image=get_image)
                    portfolio = ''
                    if res:
                        portfolio = res['url']
                    else:
                        return {'message': 'Error image upload'}, 4000
                    github = data['github']
                    linkedin = data['linkedin']
                    email = data['email']
                    website = data['website']
                    title_id = data['profession']
                    country_id = data['country_id']
    
                    user = {}
                    if account_id == 'undefined':
                        user = get_user_by_email(email="johannesyonela@gmail.com")
                        account_id = user['id']

                    if account_id and name:
                        response = create_recommendation(
                            account_id=account_id, 
                            name=name, 
                            lastname=lastname, 
                            portfolio=portfolio, 
                            github=github, 
                            linkedin=linkedin, 
                            email=email, 
                            country_id=country_id, 
                            title_id=title_id,
                            sender_email=sender_email,
                            sender_name=sender_name,
                            sender_lastname=sender_lastname,
                            website=website
                            )
                        if response and 'id' in response:
                            if sender_details:
                                recommendation_email_temp_user(email=response['email'],
                                        name=response['name'],
                                        lastname=response['lastname'],
                                        portfolio=response['portfolio'],
                                        github=response['github'],
                                        linkedin=response['linkedin'],
                                        mail=mail,
                                        status=response['status'],
                                        time=response['profile_created_time'],
                                        sender_name=sender_name,
                                        sender_lastname=sender_lastname,
                                        sender_email=sender_email
                                        )
                                
                            elif sender_details == False and account_id:
                                recommendation_email_temp(
                                    email=response['email'],
                                    name=response['name'],
                                    lastname=response['lastname'],
                                    portfolio=response['portfolio'],
                                    github=response['github'],
                                    linkedin=response['linkedin'],
                                    mail=mail,
                                    status=response['status']
                                )
                                
                                send_to_creator(email=response['email'],
                                        name=response['name'],
                                        lastname=response['lastname'],
                                        portfolio=response['portfolio'],
                                        github=response['github'],
                                        linkedin=response['linkedin'],
                                        mail=mail,
                                        status=response['status'],
                                        time=response['profile_created_time'],
                                        sender_name=sender_name,
                                        sender_lastname=sender_lastname,
                                        sender_email=sender_email
                                        )
                                                         
                            send_to_me(email=response['email'],
                                    name=response['name'],
                                    lastname=response['lastname'],
                                    portfolio=response['portfolio'],
                                    github=response['github'],
                                    linkedin=response['linkedin'],
                                    mail=mail,
                                    status=response['status'],
                                    time=response['profile_created_time']
                                    ) 
                                                       
                    return jsonify(response), 200 if not isinstance(response, dict) else response
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
                
    elif REQUEST == 'DELETE':
                
        user =  valid_token() 
        if user == False: 
            return jsonify({'message': 'You are not authorized'}), 401
        
        try:
            data = request.get_json()
            account_id = data['account_id']
            recommendation_id = data['recommendation_id']

            if recommendation_id and account_id:
                response = delete_recommendation(recommendation_id, account_id)
                return jsonify(response), 400
            
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400