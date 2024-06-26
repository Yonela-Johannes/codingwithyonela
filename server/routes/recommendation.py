import json
from flask import request
from sqlalchemy import JSON
from controllers.recommendation import create_recommendation, delete_recommendation, edit_recommendation, fetch_recommendation, fetch_recommendations

def recommendation(id):
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

            account_id = data['account_id']
            name = data['name']
            second_name = data['second_name']
            lastname = data['lastname']
            re_image = data['re_image']
            github = data['github']
            linkedin = data['linkedin']
            email = data['email']
            portfolio = data['portfolio']
            quote = data['quote']
            status_id = data['status_id']
            title_id = data['title_id']
            country_id = data['country_id']

            if id and name and quote and title_id and account_id:
                response = edit_recommendation(account_id, name, second_name, lastname, re_image, github, linkedin, email, portfolio, quote, status_id, title_id, country_id, id)
                if response:
                        res = {"data": f"{response}",
                            "message": "Update successful"
                            }
                        return res, 200
                res = {"message": response}
                return res, 400
            res = {"message": "Missing data"}
            return res, 400
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return res, 400



def all_recommendations():
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch all
        try:
            response = fetch_recommendations()
            if response:
                res = {
                    "message": "Fetch successful",
                    "data": response
                    }
                return res, 200
            else:
                res = {data: []}
                return res, 400
        except err:
            print(err)
            return {"message": "Fetch failed: something went wrong."}
        
    # Create recommendation
    elif REQUEST == 'POST':
        try:

            data = request.get_json()

            if "account_id" in data and "name" in data and "lastname" in data and "re_image" in data and "github" in data and "linkedin" in data and "email" in data and "portfolio" in data and "quote" in data and "status_id" in data and "title_id" in data and "country_id" in data:
                account_id = data['account_id']
                name = data['name']
                second_name = data['second_name']
                lastname = data['lastname']
                re_image = data['re_image']
                github = data['github']
                linkedin = data['linkedin']
                email = data['email']
                portfolio = data['portfolio']
                quote = data['quote']
                status_id = data['status_id']
                title_id = data['title_id']
                country_id = data['country_id']
            
                if account_id and name:
                    response = create_recommendation(account_id, name, second_name, lastname, re_image, github, linkedin, email, portfolio, quote, status_id, country_id, title_id)
                    if response:
                            res = {"message": "Profile created successful"}
                            return res, 201
                    else:
                        res = {"message": "Profile already exist"}
                        return res, 400 
            else:
                res = {"message": "Error: Missing required data"}
                return res, 400 
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
            print(res)
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