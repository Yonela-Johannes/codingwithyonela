import json
from flask import request
from sqlalchemy import JSON
from controllers.suggestion import ( create_suggestion, create_suggestion_comment, create_suggestion_response, fetch_suggestion, edit_suggestion, delete_suggestion, fetch_suggestion_comments, fetch_suggestion_response, fetch_suggestions )
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
            data = request.get_json()
            account_id = data['account_id']
            title = data['suggestion_title']
            post = data['post']
            category_id = data['category_id']
            suggestion_id = data['suggestion_id']
            

            if id and title and suggestion_id and post and category_id and account_id and id == account_id:
                response = edit_suggestion(title, post, category_id, account_id, suggestion_id)
                print('RESPONSE: :', response)
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
    elif REQUEST == 'DELETE':
        try:
            data = request.get_json()
            account_id = data['account_id']
            suggestion_id = data['suggestion_id']
    
            if id and suggestion_id and account_id and id == account_id:
                response = delete_suggestion(suggestion_id, account_id)
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


def all_suggestion():
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch one
        try:
            response = fetch_suggestions()
            res = {"data": response}
            return res, 200
    
        except:
            return {"message": "Fetch failed: something went wrong."}
    # Create title
    elif REQUEST == 'POST':
        try:

            data = request.get_json()

            account_id = data['account_id']
            post = data['post']
            status_id = data['status_id']
            suggestion_title = data['suggestion_title']
            category_id = data['category_id']
            slug = slugify(suggestion_title)
            
            if account_id and post and category_id and slug and suggestion_title:
                response = create_suggestion(account_id, post, status_id, category_id, slug, suggestion_title)
                if response:
                        print(response)
                        res = {"data": f"{response}"}
                        return res, 201
                else:
                    res = {"message": "Blog already exist"}
                    return res, 400 
                
            res = {"message": "Title invalid: (you must enter title)"}
            return res, 200 
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
            print(res)
        return res, 200 

def suggestion_response():
    REQUEST = request.method 
    if REQUEST == 'POST':
        try:            
            data = request.get_json()
            account_id = data['account_id']
            res = data['response']
            suggestion_id = data['suggestion_id']
            
            print("ACCOUNT_ ID: ", account_id)
            print("SUGGESTION ID: ", suggestion_id)
            
            if account_id and res and suggestion_id:
                response = create_suggestion_response(account_id, res, suggestion_id)
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
    

def get_suggestion_response(id):
    REQUEST = request.method 
    if REQUEST == 'GET':
        try:
            response = fetch_suggestion_response(id)
            res = {"data": response}
            return res, 200
    
        except:
            return {"message": "Fetch failed: something went wrong."}
      
def get_suggestion_comments(id):
    REQUEST = request.method 
    if REQUEST == 'GET':
        try:
            response = fetch_suggestion_comments(id)
            res = {"data": response}
            return res, 200
    
        except:
            return {"message": "Fetch failed: something went wrong."}
        
def suggestion_comment():
    REQUEST = request.method 
    if REQUEST == 'POST':
        try:
            data = request.get_json()
            account_id = data['account_id']
            comment = data['comment']
            suggestion_id = data['suggestion_id']
                    
            if account_id and comment and suggestion_id:
                response = create_suggestion_comment(account_id, comment, suggestion_id)
                print("THIS IS THE COMMENT: ", response)
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