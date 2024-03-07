import json
from flask import request
from sqlalchemy import JSON
from controllers.suggestion import ( create_suggestion, fetch_suggestion, edit_suggestion, delete_suggestion, fetch_suggestions )

def suggestion():
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch one
        try:
            data = json.loads(request.data)
        
            if data:
                id = json.loads(request.data)['id']
                print("TITLE: => ", id)
                if id:
                    response = fetch_suggestion(id)
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
            response = fetch_suggestions()
            result = response
            res = {"data": result}
            return res, 200
    
    # Create title
    elif REQUEST == 'POST':
        try:
            account_id = json.loads(request.data)['account_id']
            post = json.loads(request.data)['post']
            status_id = json.loads(request.data)['status_id']
            category_id = json.loads(request.data)['category_id']

            if account_id and post and status_id and category_id:
                response = create_suggestion(account_id, post, status_id, category_id)
                print("RESPONSE: ", response)
                if response:
                        res = {"data": f"{response}"}
                        return res, 201
                else:
                    res = {"message": "Blog already exist"}
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
            post = json.loads(request.data)['post']
            status_id = json.loads(request.data)['status_id']
            category_id = json.loads(request.data)['category_id']
            
            if id:
                response = edit_suggestion(id, post, status_id, category_id)
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
                response = delete_suggestion(id)
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
    