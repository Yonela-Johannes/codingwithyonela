import json
from flask import request
from controllers.status import ( create_status, fetch_statuses, edit_status, delete_category, fetch_status )

def status():
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch one
        try:
            data = json.loads(request.data)
        
            if data:
                id = json.loads(request.data)['id']
                if id:
                    response = fetch_status(id)
                    if response:
                        res = {
                                "message": "Fetch successful",
                                "data": response
                                }
                        return res, 200
                    else:
                        res = {"message": "Fetch failed: something went wrong."}
                    return res, 400
            
        except json.decoder.JSONDecodeError:   
            # Fetch All
            response = fetch_statuses()
            print("RESPONSE: ", response)
            result = response
            res = {"data": result}
            return res, 200
    
    # Create title
    elif REQUEST == 'POST':
        try:
            status = json.loads(request.data)['status']
            account_id = json.loads(request.data)['account_id']
            
            if status and account_id:
                response = create_status(status, account_id)
                if response:
                        res = {"data": f"{response}"}
                        return res, 201
                else:
                    res = {"message": f"Category already exist"}
                    return res, 400 
                
            res = {"message": "Category invalid: (you must enter status)"}
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
                response = edit_status(id, title)
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
    