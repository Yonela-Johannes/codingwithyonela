import json
from flask import request
from sqlalchemy import JSON
from controllers.recommendation import ( create_recommendation, fetch_recommendation, edit_recommendation, delete_recommendation, fetch_recommendations )

def recommendation():
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch one
        try:
            data = json.loads(request.data)
        
            if data:
                id = json.loads(request.data)['id']
                print("TITLE: => ", id)
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
            
        except:   
            # Fetch All
            response = fetch_recommendations()
            res = {"data": response}
            return res, 200

    
    # Create title
    elif REQUEST == 'POST':
        try:
            account_id = json.loads(request.data)['account_id']
            name = json.loads(request.data)['name']
            status_id = json.loads(request.data)['status_id']
            second_name = json.loads(request.data)['second_name']
            lastname = json.loads(request.data)['lastname']
            image = json.loads(request.data)['image']
            title_id = json.loads(request.data)['title_id']
            quote = json.loads(request.data)['quote']
            

            if account_id and name and status_id and second_name:
                response = create_recommendation(account_id, name, second_name, lastname, image, title_id, quote, status_id)
                print("RESPONSE: ", response)
                if response:
                        res = {"data": f"{response}"}
                        return res, 201
                else:
                    res = {"message": "Something went wrong"}
                    return res, 400 
                
            res = {"message": "Title invalid: (you must enter title)"}
            return res, 400 
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return res, 400 
            
        # edit/update
    elif REQUEST == 'PUT':
        try:
            account_id = json.loads(request.data)['account_id']
            name = json.loads(request.data)['name']
            status_id = json.loads(request.data)['status_id']
            second_name = json.loads(request.data)['second_name']
            lastname = json.loads(request.data)['lastname']
            image = json.loads(request.data)['image']
            title_id = json.loads(request.data)['title_id']
            quote = json.loads(request.data)['quote']
            
            if id:
                response = edit_recommendation(account_id, name, second_name, lastname, image, title_id, quote, status_id)
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
            id = json.loads(request.data)['id']
            if id:
                response = delete_recommendation(id)
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
    