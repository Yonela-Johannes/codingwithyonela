import json
from flask import request
from sqlalchemy import JSON
from controllers.title import ( create_title, fetch_titles, edit_title, delete_title, fetch_title )

def title():
    REQUEST = request.method 
    if REQUEST == 'GET':
        try:
            response = fetch_titles()
            result = response
            res = {"data": result}
            return res, 200            
        except json.decoder.JSONDecodeError:   
            res = {"message": "Something went wrong!"}
        return res, 400 
    
    # Create title
    elif REQUEST == 'POST':
        try:
            data = json.loads(request.data)['user_title']
            if data:
                response = create_title(data)
                if response == data:
                        res = {"title": f"{response}"}
                        return res, 201
                else:
                    res = {"message": f"{data} already exist"}
                    return res, 400 
                
            res = {"message": "Title invalid: (you must enter title)"}
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
                response = edit_title(id, title)
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
                response = delete_title(id)
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
    