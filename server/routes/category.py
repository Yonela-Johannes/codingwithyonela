import json
from flask import request
from controllers.category import ( create_category, fetch_categories, edit_category, delete_category, fetch_category )

def category():
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch one
        try:
            data = request.get_json()
            # Fetch All
            response = fetch_categories()
            res = {"data": response}
            return res, 200
        except json.decoder.JSONDecodeError:   
            res = {"message": "Something went wrong!"}
            return res, 400 
    
    # Create title
    elif REQUEST == 'POST':
        try:
            category = json.loads(request.data)['category']
            account_id = json.loads(request.data)['account_id']
            
            if category and account_id:
                response = create_category(category, account_id)
                if response:
                        res = {"message": "Category created successfull"}
                        return res, 201
                else:
                    res = {"message": "Category already exist"}
                    return res, 400 
                
            res = {"message": "Category invalid: (you must enter category)"}
            return res, 400 
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return res, 400 
            
        # edit/update
    elif REQUEST == 'PUT':
        try:
            title = json.loads(request.data)['title']
            id = json.loads(request.data)['id']
            if title and id:
                response = edit_category(id, title)
                if response == title:
                        res = {"title": f"{response}",
                            "message": "Update successful"
                            }
                        return res, 200
                else:
                    res = {"message": f"{title} already exist"}
                    return res, 400
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
                response = delete_category(id)
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
    