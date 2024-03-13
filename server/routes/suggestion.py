import json
from flask import request
from sqlalchemy import JSON
from controllers.suggestion import ( create_suggestion, create_suggestion_response, fetch_suggestion, edit_suggestion, delete_suggestion, fetch_suggestions )
from slugify import slugify

def suggestion(id):
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch one
        try:
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
            return {"message": "Fetch failed: something went wrong."}
        
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


def all_suggestion():
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch one
        try:
            response = fetch_suggestions()
            print("RESPONSE::: ", response)
            res = {"data": response}
            return res, 200
    
        except:
            return {"message": "Fetch failed: something went wrong."}
    # Create title
    elif REQUEST == 'POST':
        try:
            account_id = json.loads(request.data)['account_id']
            post = json.loads(request.data)['post']
            status_id = json.loads(request.data)['status_id']
            suggestion_title = json.loads(request.data)['suggestion_title']
            category_id = json.loads(request.data)['category_id']
            slug = slugify(suggestion_title)
            
            if account_id and post and status_id and category_id:
                response = create_suggestion(account_id, post, status_id, category_id, slug, suggestion_title)
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

def suggestion_response():
    REQUEST = request.method 
    if REQUEST == 'GET':
        # suggestion response
        try:
            response = fetch_suggestions()
            print("RESPONSE::: ", response)
            res = {"data": response}
            return res, 200
    
        except:
            return {"message": "Fetch failed: something went wrong."}
    # Create suggestion response
    elif REQUEST == 'POST':
        try:
            account_id = json.loads(request.data)['account_id']
            res = json.loads(request.data)['response']
            suggestion_id = json.loads(request.data)['suggestion_id']
            
            print("ACCOUNT_ ID: ", account_id)
            print("RESPONSE: ", res)
            print("SUGGESTION ID: ", suggestion_id)
            
            if account_id and res and suggestion_id:
                response = create_suggestion_response(account_id, res, suggestion_id)
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