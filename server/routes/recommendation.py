import json
from flask import request
from sqlalchemy import JSON
from controllers.recommendation import create_recommendation, delete_recommendation, edit_recommendation, fetch_recommendation, fetch_recommendations, edit_recommendation_status
from icecream import ic
from flask import request, jsonify
from controllers.account import get_user_by_email
from email_templates.recommendation import recommendation_email_temp, send_to_me, recommendation_email_temp_user, send_to_creator, update_user_mail
from routes.image_upload import uploadImage

def recommendation(id, mail):
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch one
        try:
            if id:
                response = fetch_recommendation(id)
                if response:
                    res = {
                        "message": "Fetch successful",
                        "data": response
                    }
                    return res, 200
                else:
                    res = {"message": "Fetch failed: something went wrong."}
                    return res, 400
            else:
                res = {"message": "Missing data"}
                return res, 400 
        except:
            return {"message": "Fetch failed: something went wrong."}
        
        # edit/update
    elif REQUEST == 'PUT':
        try:
            data = request.get_json()

            if 'status' in data:
                account_id = data['account']
                status = data['status']
                re_id = data['re_id']
                if id == re_id and account_id and status:
                    response = edit_recommendation_status(status=status, re_id=re_id)
                    if response and 'id' in response:
                        ic(response)
                        update_user_mail(
                            email=response['email'],
                            name=response['name'],
                            lastname=response['lastname'],
                            mail=mail
                        )                    
                        res = {"data": f"{response}",
                            "message": "Update successful"
                            }
                        return res, 200
                    res = {"message": response}
                    return res, 400
                res = {"message": "Missing data"}
                return res, 400
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
                    if response:
                            res = {"data": f"{response}",
                                "message": "Update successful"
                                }
                            return res, 200
                    res = {"message": response}
                    return res, 400
                res = {"message": "Missing data"}
                return res, 400
            
        except json.decoder.JSONDecodeError as err:
            ic(err)
            res = {"message": "Missing data"}
        return res, 400

def all_recommendations(mail):
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch all
        try:
            response = fetch_recommendations()
            res = {"data": response}
            return jsonify(res), 200

        except json.decoder.JSONDecodeError as error:
            ic(error)
            return {"message": "Fetch failed: something went wrong."}, 400
    # Create recommendation
    elif REQUEST == 'POST':
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
                        response = create_recommendation(account_id=account_id, 
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
                                recommendation_email_temp(email=response['email'],
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
                            res = {"message": "Profile created successful"}
                            return res, 201
                        else:
                            res = {"message": "Profile already exist"}
                            return res, 400 
                else:
                    res = {"message": "Error: Missing required data"}
                    return res, 400 
            else:
                res = {"message": "Error: Missing required user data"}
                return res, 400 
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return res, 200
    
    elif REQUEST == 'DELETE':
        try:
            data = request.get_json()
            account_id = data['account_id']
            recommendation_id = data['recommendation_id']

            if recommendation_id and account_id:
                response = delete_recommendation(recommendation_id, account_id)
                if response == id:
                    res = {"message": "Delete failed: something went wrong."}
                    return res, 400
                else:
                    res = {
                            "message": "Delete successful"
                            }
                    return res, 200
            res = {"message": "Title or is ID invalid"}
            return res, 00 
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return res, 400